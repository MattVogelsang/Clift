import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    // Try to get access token from cookie (set by client)
    const accessToken = cookieStore.get('sb-access-token')?.value
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          // Not used in server-side, but required by interface
        },
        remove(name: string, options: any) {
          // Not used in server-side, but required by interface
        },
      },
      global: {
        headers: accessToken ? {
          Authorization: `Bearer ${accessToken}`,
        } : {},
      },
    })

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('[Profile API] Auth error:', {
        error: authError,
        hasUser: !!user,
        cookies: Array.from(cookieStore.getAll()).map(c => c.name),
      })
      return NextResponse.json(
        { error: 'Unauthorized', details: authError?.message },
        { status: 401 }
      )
    }

    // Fetch user profile from database
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('users')
      .select('subscription_status, subscription_tier, stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('[Profile API] Error fetching profile:', profileError)
      return NextResponse.json(
        { error: 'Failed to fetch profile' },
        { status: 500 }
      )
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


