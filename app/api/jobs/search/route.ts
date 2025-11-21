import { NextRequest, NextResponse } from 'next/server'
import { searchJobs, calculateMatchScore } from '@/lib/job-scraper'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { userId, criteria } = await request.json()

    if (!userId || !criteria) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Search for jobs across platforms
    const jobs = await searchJobs(criteria)

    // Get user profile for match scoring
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('skills, experience_years, industries')
      .eq('user_id', userId)
      .single()

    // Calculate match scores
    const jobsWithScores = jobs.map(job => ({
      ...job,
      matchScore: profile ? calculateMatchScore({
        skills: profile.skills || [],
        experience: profile.experience_years || 0,
        industries: profile.industries || []
      }, job) : 85
    }))

    // Filter jobs with match score >= 80%
    const relevantJobs = jobsWithScores.filter(job => 
      (job.matchScore ?? 0) >= 80
    )

    // Store jobs in database
    if (relevantJobs.length > 0) {
      await supabaseAdmin.from('job_listings').insert(
        relevantJobs.map(job => ({
          user_id: userId,
          external_id: job.id,
          title: job.title,
          company: job.company,
          location: job.location || null,
          salary: job.salary || null,
          description: job.description || null,
          source: job.source,
          url: job.url,
          match_score: job.matchScore || null,
          posted_date: job.postedDate ? job.postedDate.toISOString() : null,
        }))
      )
    }

    return NextResponse.json({
      jobs: relevantJobs,
      totalFound: jobs.length,
      relevantCount: relevantJobs.length,
    })
  } catch (error) {
    console.error('Job search error:', error)
    return NextResponse.json(
      { error: 'Failed to search jobs' },
      { status: 500 }
    )
  }
}


