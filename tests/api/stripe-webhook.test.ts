import { describe, it, expect, beforeEach, vi } from 'vitest'
import type Stripe from 'stripe'

const mockConstructEvent = vi.hoisted(() => vi.fn())
vi.mock('@/lib/stripe', () => ({
  stripe: {
    webhooks: {
      constructEvent: mockConstructEvent,
    },
  },
}))

const fromMock = vi.hoisted(() => vi.fn())
vi.mock('@/lib/supabase-server', () => ({
  supabaseAdmin: {
    from: fromMock,
  },
}))

import { POST } from '@/app/api/stripe/webhook/route'

const createUsersQueryBuilder = (options?: { user?: { id: string } | null }) => {
  const updateEq = vi.fn().mockResolvedValue({ data: null, error: null })
  const selectSingle = vi
    .fn()
    .mockResolvedValue({ data: options?.user ?? { id: 'user-123' } })

  return {
    update: vi.fn(() => ({
      eq: updateEq,
    })),
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        single: selectSingle,
      })),
    })),
  }
}

const buildRequest = (body: any, signature?: string) =>
  ({
    text: async () => JSON.stringify(body),
    headers: new Headers(
      signature ? [['stripe-signature', signature]] : undefined
    ),
  } as unknown as Request)

describe('/api/stripe/webhook POST', () => {
  beforeEach(() => {
    fromMock.mockReset()
    mockConstructEvent.mockReset()
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test'
  })

  it('rejects requests without stripe signature', async () => {
    const request = buildRequest({})
    const response = await POST(request as any)
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body).toEqual({ error: 'Missing stripe signature' })
  })

  it('rejects invalid signatures', async () => {
    mockConstructEvent.mockImplementation(() => {
      throw new Error('bad signature')
    })

    const request = buildRequest({}, 'sig_header')
    const response = await POST(request as any)
    const body = await response.json()

    expect(mockConstructEvent).toHaveBeenCalled()
    expect(response.status).toBe(400)
    expect(body).toEqual({ error: 'Invalid signature' })
  })

  it('handles checkout.session.completed events', async () => {
    const updateBuilder = createUsersQueryBuilder()
    fromMock.mockReturnValue(updateBuilder)

    const event = {
      type: 'checkout.session.completed',
      data: {
        object: {
          metadata: { user_id: 'user-123' },
          customer: 'cus_123',
        },
      },
    } as unknown as Stripe.Event

    mockConstructEvent.mockReturnValue(event)

    const request = buildRequest(event, 'sig_header')
    const response = await POST(request as any)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ received: true })
    expect(updateBuilder.update).toHaveBeenCalledWith({
      stripe_customer_id: 'cus_123',
      subscription_status: 'active',
    })
  })

  it('updates subscription info when customer exists', async () => {
    const builder = createUsersQueryBuilder({ user: { id: 'user-321' } })
    fromMock.mockReturnValue(builder)

    const event = {
      type: 'customer.subscription.updated',
      data: {
        object: {
          customer: 'cus_111',
          status: 'active',
          items: {
            data: [
              {
                price: { id: 'price_123' },
              },
            ],
          },
        },
      },
    } as unknown as Stripe.Event

    mockConstructEvent.mockReturnValue(event)

    const request = buildRequest(event, 'sig_header')
    const response = await POST(request as any)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ received: true })
    expect(builder.update).toHaveBeenLastCalledWith({
      subscription_status: 'active',
      subscription_tier: 'price_123',
    })
  })

  it('skips update when session metadata missing', async () => {
    const builder = createUsersQueryBuilder()
    fromMock.mockReturnValue(builder)

    const event = {
      type: 'checkout.session.completed',
      data: {
        object: {
          metadata: null,
          customer: null,
        },
      },
    } as unknown as Stripe.Event

    mockConstructEvent.mockReturnValue(event)

    const request = buildRequest(event, 'sig_header')
    const response = await POST(request as any)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ received: true })
    expect(builder.update).not.toHaveBeenCalled()
  })
})

