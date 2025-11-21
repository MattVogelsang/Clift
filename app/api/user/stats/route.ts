import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    // Create Supabase client with cookies for server-side auth
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    
    // Try to get access token from cookie (set by client)
    const accessToken = cookieStore.get('sb-access-token')?.value
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: accessToken ? {
          Authorization: `Bearer ${accessToken}`,
        } : {},
      },
    })

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get time range from query params (default to 30d)
    const searchParams = request.nextUrl.searchParams
    const timeRange = searchParams.get('range') || '30d'
    
    // Calculate date range
    const now = new Date()
    const daysAgo = timeRange === '7d' ? 7 : timeRange === '90d' ? 90 : 30
    const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)

    // Fetch application statistics using the view
    const { data: stats } = await supabase
      .from('user_application_stats')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // Fetch applications for time range
    const { data: applications, error: appsError } = await supabase
      .from('applications')
      .select(`
        *,
        job_listings (
          company,
          title,
          match_score
        )
      `)
      .eq('user_id', user.id)
      .gte('applied_at', startDate.toISOString())
      .order('applied_at', { ascending: false })

    if (appsError) {
      console.error('Error fetching applications:', appsError)
    }

    // Calculate weekly data
    const weeklyData: { week: string; applications: number; responses: number }[] = []
    const weeks = Math.ceil(daysAgo / 7)
    
    for (let i = 0; i < weeks; i++) {
      const weekStart = new Date(now.getTime() - (i + 1) * 7 * 24 * 60 * 60 * 1000)
      const weekEnd = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000)
      
      const weekApps = applications?.filter(app => {
        const appliedDate = new Date(app.applied_at)
        return appliedDate >= weekStart && appliedDate < weekEnd
      }) || []

      weeklyData.push({
        week: `Week ${weeks - i}`,
        applications: weekApps.length,
        responses: weekApps.filter(app => app.status === 'response' || app.status === 'viewed').length,
      })
    }

    // Get top companies
    const companyMap = new Map<string, { count: number; status: string }>()
    applications?.forEach(app => {
      const company = app.job_listings?.company || 'Unknown'
      const existing = companyMap.get(company) || { count: 0, status: app.status }
      companyMap.set(company, {
        count: existing.count + 1,
        status: app.status === 'response' || app.status === 'viewed' ? app.status : existing.status,
      })
    })

    const topCompanies = Array.from(companyMap.entries())
      .map(([name, data]) => ({
        name,
        applications: data.count,
        status: data.status === 'response' ? 'Response received' : 
                data.status === 'viewed' ? 'Profile viewed' : 
                data.status === 'applied' ? 'Applied' : 'Under review',
      }))
      .sort((a, b) => b.applications - a.applications)
      .slice(0, 4)

    // Calculate average match score
    const matchScores = applications
      ?.map(app => app.job_listings?.match_score)
      .filter((score): score is number => typeof score === 'number') || []
    
    const averageMatchScore = matchScores.length > 0
      ? Math.round(matchScores.reduce((a, b) => a + b, 0) / matchScores.length)
      : 0

    // Return formatted stats
    return NextResponse.json({
      totalApplications: stats?.total_applications || 0,
      profileViews: stats?.profile_views || 0,
      responses: stats?.responses || 0,
      offers: stats?.offers || 0,
      responseRate: stats?.response_rate || 0,
      averageMatchScore,
      weeklyData: weeklyData.reverse(), // Reverse to show oldest first
      topCompanies,
      applications: applications || [],
    })
  } catch (error) {
    console.error('Stats fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

