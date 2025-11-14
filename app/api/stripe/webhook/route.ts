import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase-server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  console.log('Active webhook secret on server:', process.env.STRIPE_WEBHOOK_SECRET)
  console.log('Stripe signature header:', signature)

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
          await supabaseAdmin
            .from('users')
            .update({
              stripe_customer_id: session.customer as string,
              subscription_status: 'active',
            })
            .eq('id', userId)
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        
        const { data: user } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('stripe_customer_id', subscription.customer as string)
          .single()

        if (user) {
          await supabaseAdmin
            .from('users')
            .update({
              subscription_status: subscription.status,
              subscription_tier: subscription.items.data[0]?.price.id,
            })
            .eq('id', user.id)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        const { data: user } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('stripe_customer_id', subscription.customer as string)
          .single()

        if (user) {
          await supabaseAdmin
            .from('users')
            .update({
              subscription_status: 'canceled',
              subscription_tier: null,
            })
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


