import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/supabase'

type UserUpdate = Database['public']['Tables']['users']['Update']
const usersTable = () => supabaseAdmin.from('users') as any

/**
 * Manual sync endpoint to fetch subscription from Stripe and update database
 * Call this after completing a checkout if webhooks aren't working
 */
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's Stripe customer ID
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (userError || !userData?.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No Stripe customer ID found. Please complete a checkout first.' },
        { status: 400 }
      )
    }

    // Fetch active subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: userData.stripe_customer_id,
      status: 'all',
      limit: 1,
    })

    if (subscriptions.data.length === 0) {
      return NextResponse.json(
        { error: 'No subscriptions found for this customer' },
        { status: 404 }
      )
    }

    const subscription = subscriptions.data[0]
    const priceId =
      typeof subscription.items.data[0]?.price === 'string'
        ? subscription.items.data[0]?.price
        : subscription.items.data[0]?.price?.id

    const updatePayload: UserUpdate = {
      subscription_status: subscription.status,
      subscription_tier: priceId || null,
    }

    console.log('[Sync] Updating user subscription:', {
      userId: user.id,
      status: subscription.status,
      tier: priceId,
    })

    const { error: updateError } = await usersTable()
      .update(updatePayload)
      .eq('id', user.id)

    if (updateError) {
      console.error('[Sync] Failed to update user:', updateError)
      return NextResponse.json(
        { error: 'Failed to update subscription' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      subscription_status: subscription.status,
      subscription_tier: priceId,
    })
  } catch (error: any) {
    console.error('[Sync] Error:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

