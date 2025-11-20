import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase-server'
import type { Database } from '@/lib/supabase'
import Stripe from 'stripe'

type UserUpdate = Database['public']['Tables']['users']['Update']
const usersTable = () => supabaseAdmin.from('users') as any

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.user_id

        if (userId && session.customer) {
          // Fetch the subscription to get the price ID
          let subscriptionTier: string | null = null
          if (session.subscription) {
            try {
              const subscription = await stripe.subscriptions.retrieve(
                typeof session.subscription === 'string'
                  ? session.subscription
                  : session.subscription.id
              )
              const priceId =
                typeof subscription.items.data[0]?.price === 'string'
                  ? subscription.items.data[0]?.price
                  : subscription.items.data[0]?.price?.id
              subscriptionTier = priceId || null
            } catch (error) {
              console.error('[Webhook] Error fetching subscription:', error)
            }
          } else {
            console.warn('[Webhook] No subscription ID in checkout session')
          }

          const updatePayload: UserUpdate = {
            stripe_customer_id: session.customer as string,
            subscription_status: 'active',
            subscription_tier: subscriptionTier,
          }

          const { error: updateError } = await usersTable()
            .update(updatePayload)
            .eq('id', userId)

          if (updateError) {
            console.error('[Webhook] Failed to update user:', updateError)
          }
        } else {
          console.warn('[Webhook] Missing userId or customer in checkout session')
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription

        const { data: user } = (await usersTable()
          .select('id')
          .eq('stripe_customer_id', subscription.customer as string)
          .single()) as { data: { id: string } | null }

        if (user) {
          const tierId =
            (typeof subscription.items.data[0]?.price === 'string'
              ? subscription.items.data[0]?.price
              : subscription.items.data[0]?.price?.id) ?? null

          const updatePayload: UserUpdate = {
            subscription_status: subscription.status,
            subscription_tier: tierId,
          }

          await usersTable()
            .update(updatePayload)
            .eq('id', user.id)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        const { data: user } = (await usersTable()
          .select('id')
          .eq('stripe_customer_id', subscription.customer as string)
          .single()) as { data: { id: string } | null }

        if (user) {
          const updatePayload: UserUpdate = {
            subscription_status: 'canceled',
            subscription_tier: null,
          }

          await usersTable()
            .update(updatePayload)
            .eq('id', user.id)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}


