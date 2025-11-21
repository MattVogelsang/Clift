import { NextRequest, NextResponse } from 'next/server'
import { autoApplyToJob, generateCoverLetter } from '@/lib/auto-apply'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { userId, jobId } = await request.json()

    if (!userId || !jobId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get job details
    const { data: job } = await supabaseAdmin
      .from('job_listings')
      .select('*')
      .eq('id', jobId)
      .single()

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    // Get user profile
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (!profile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      )
    }

    // Generate cover letter
    const coverLetter = await generateCoverLetter(
      {
        id: job.external_id,
        title: job.title,
        company: job.company,
        location: job.location || '',
        salary: job.salary || '',
        description: job.description || '',
        requirements: job.requirements || [],
        source: job.source,
        url: job.url,
        postedDate: job.posted_date ? new Date(job.posted_date) : new Date(),
      },
      {
        name: profile.full_name || '',
        experience: profile.experience_summary || '',
        skills: profile.skills || [],
      }
    )

    // Submit application
    const result = await autoApplyToJob(
      {
        id: job.external_id,
        title: job.title,
        company: job.company,
        location: job.location || '',
        salary: job.salary || '',
        description: job.description || '',
        requirements: job.requirements || [],
        source: job.source,
        url: job.url,
        postedDate: job.posted_date ? new Date(job.posted_date) : new Date(),
      },
      {
        userId,
        resumeUrl: profile.resume_url || '',
        coverLetter,
        email: profile.email,
        phone: profile.phone || '',
        linkedin: profile.linkedin_url || '',
      }
    )

    // Record application in database
    if (result.success) {
      await supabaseAdmin.from('applications').insert({
        user_id: userId,
        job_id: jobId,
        cover_letter: coverLetter,
        status: 'applied',
        applied_at: result.appliedAt ? result.appliedAt.toISOString() : new Date().toISOString(),
      })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Auto-apply error:', error)
    return NextResponse.json(
      { error: 'Failed to apply to job' },
      { status: 500 }
    )
  }
}


