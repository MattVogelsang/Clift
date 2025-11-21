import { describe, it, expect, beforeEach, vi } from 'vitest'
import type Stripe from 'stripe'

const mockConstructEvent = vi.hoisted(() => vi.fn())
const mockSubscriptionsRetrieve = vi.hoisted(() => vi.fn())
vi.mock('@/lib/stripe', () => ({
  stripe: {
    webhooks: {
      constructEvent: mockConstructEvent,
    },
    subscriptions: {
      retrieve: mockSubscriptionsRetrieve,
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

// Helper to create properly typed mock Stripe events
// We need to create minimal valid Stripe.Event objects for testing
function createMockEvent<T extends Stripe.Event.Type>(
  type: T,
  data: Partial<Stripe.Event.Data>
): Stripe.Event {
  return {
    id: `evt_test_${Math.random().toString(36).substring(7)}`,
    object: 'event',
    api_version: '2023-10-16',
    created: Math.floor(Date.now() / 1000),
    livemode: false,
    pending_webhooks: 1,
    request: { id: 'req_test', idempotency_key: null },
    type,
    data: data as Stripe.Event.Data,
  } as Stripe.Event
}

describe('/api/stripe/webhook POST', () => {
  beforeEach(() => {
    fromMock.mockReset()
    mockConstructEvent.mockReset()
    mockSubscriptionsRetrieve.mockReset()
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

    const sessionObject = {
      id: 'cs_test',
      object: 'checkout.session',
      metadata: { user_id: 'user-123' },
      customer: 'cus_123',
      subscription: 'sub_test',
      mode: 'subscription',
      payment_status: 'paid',
      status: 'complete',
    } as unknown as Stripe.Checkout.Session

    const event = createMockEvent('checkout.session.completed', {
      object: sessionObject,
    })

    mockConstructEvent.mockReturnValue(event)

    // Mock the subscription retrieval
    mockSubscriptionsRetrieve.mockResolvedValue({
      id: 'sub_test',
      object: 'subscription',
      items: {
        object: 'list',
        data: [
          {
            id: 'si_test',
            object: 'subscription_item',
            price: { id: 'price_123', object: 'price' },
            quantity: 1,
          },
        ],
        has_more: false,
        url: '',
      },
    } as unknown as Stripe.Subscription)

    const request = buildRequest(event, 'sig_header')
    const response = await POST(request as any)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ received: true })
    expect(updateBuilder.update).toHaveBeenCalledWith({
      stripe_customer_id: 'cus_123',
      subscription_status: 'active',
      subscription_tier: 'price_123',
    })
  })

  it('updates subscription info when customer exists', async () => {
    const builder = createUsersQueryBuilder({ user: { id: 'user-321' } })
    fromMock.mockReturnValue(builder)

    const subscriptionObject = {
      id: 'sub_test',
      object: 'subscription',
      customer: 'cus_111',
      status: 'active',
      items: {
        object: 'list',
        data: [
          {
            id: 'si_test',
            object: 'subscription_item',
            price: { id: 'price_123', object: 'price' },
            quantity: 1,
          },
        ],
        has_more: false,
        url: '',
      },
    } as unknown as Stripe.Subscription

    const event = createMockEvent('customer.subscription.updated', {
      object: subscriptionObject,
    })

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

    const sessionObject = {
      id: 'cs_test',
      object: 'checkout.session',
      metadata: null,
      customer: null,
      subscription: null,
      mode: 'subscription',
      payment_status: 'unpaid',
      status: 'open',
    } as unknown as Stripe.Checkout.Session

    const event = createMockEvent('checkout.session.completed', {
      object: sessionObject,
    })

    mockConstructEvent.mockReturnValue(event)

    const request = buildRequest(event, 'sig_header')
    const response = await POST(request as any)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ received: true })
    expect(builder.update).not.toHaveBeenCalled()
  })
})

