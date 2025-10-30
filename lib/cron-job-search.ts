// Automated Job Search Cron Service
// This should run periodically (e.g., every hour) to search for new jobs

import { supabaseAdmin } from './supabase-server'
import { searchJobs, calculateMatchScore } from './job-scraper'
import { autoApplyToJob, generateCoverLetter } from './auto-apply'

/**
 * Main cron function to search and apply to jobs for all active users
 * Should be triggered by:
 * - Vercel Cron Jobs
 * - GitHub Actions
 * - External cron service (cron-job.org)
 */
export async function runAutomatedJobSearch() {
  console.log('Starting automated job search...')
  
  try {
    // Get all active users with preferences set
    const { data: profiles } = await supabaseAdmin
      .from('user_profiles')
      .select('*, users!inner(subscription_status)')
      .not('job_title_target', 'is', null)
      .eq('users.subscription_status', 'active')

    if (!profiles || profiles.length === 0) {
      console.log('No active users found')
      return
    }

    console.log(`Found ${profiles.length} active users`)

    // Process each user
    for (const profile of profiles) {
      await processUserJobSearch(profile)
      
      // Wait between users to avoid rate limiting
      await sleep(2000)
    }

    console.log('Automated job search completed')
  } catch (error) {
    console.error('Cron job error:', error)
    throw error
  }
}

/**
 * Process job search for a single user
 */
async function processUserJobSearch(profile: any) {
  try {
    console.log(`Processing user: ${profile.email}`)

    // Build search criteria from user profile
    const criteria = {
      jobTitle: profile.job_title_target,
      location: profile.location_preference,
      remote: profile.remote_preference === 'remote',
      salaryMin: profile.salary_min,
      salaryMax: profile.salary_max,
      industries: profile.industries || [],
      experienceLevel: profile.experience_level || 'mid'
    }

    // Search for jobs
    const jobs = await searchJobs(criteria)
    console.log(`Found ${jobs.length} jobs for ${profile.email}`)

    if (jobs.length === 0) {
      return
    }

    // Calculate match scores
    const jobsWithScores = jobs.map(job => ({
      ...job,
      matchScore: calculateMatchScore({
        skills: profile.skills || [],
        experience: profile.experience_years || 0,
        industries: profile.industries || []
      }, job)
    }))

    // Filter high-match jobs (85%+)
    const relevantJobs = jobsWithScores.filter(job => 
      (job.matchScore ?? 0) >= 85
    )

    console.log(`${relevantJobs.length} high-match jobs found`)

    // Check user's application limit based on subscription
    const applicationLimit = getApplicationLimit(profile.users.subscription_status)
    const { data: applicationCount } = await supabaseAdmin
      .from('applications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', profile.user_id)
      .gte('applied_at', new Date(new Date().setDate(1)).toISOString()) // This month

    const remainingApplications = applicationLimit - (applicationCount?.length || 0)

    if (remainingApplications <= 0) {
      console.log(`User ${profile.email} has reached application limit`)
      return
    }

    // Auto-apply to top matches (up to limit)
    const jobsToApply = relevantJobs.slice(0, Math.min(remainingApplications, 10))

    for (const job of jobsToApply) {
      await applyToJobForUser(job, profile)
      await sleep(10000) // Wait 10 seconds between applications
    }

    console.log(`Applied to ${jobsToApply.length} jobs for ${profile.email}`)

  } catch (error) {
    console.error(`Error processing user ${profile.email}:`, error)
  }
}

/**
 * Apply to a job on behalf of a user
 */
async function applyToJobForUser(job: any, profile: any) {
  try {
    // Generate cover letter
    const coverLetter = await generateCoverLetter(job, {
      name: profile.full_name || profile.email,
      experience: profile.experience_summary || '',
      skills: profile.skills || []
    })

    // Submit application
    const result = await autoApplyToJob(job, {
      userId: profile.user_id,
      resumeUrl: profile.resume_url || '',
      coverLetter,
      email: profile.email,
      phone: profile.phone,
      linkedin: profile.linkedin_url
    })

    // Record in database
    if (result.success) {
      await supabaseAdmin.from('applications').insert({
        user_id: profile.user_id,
        job_id: job.id,
        cover_letter: coverLetter,
        status: 'applied',
        applied_at: result.appliedAt
      })

      // Mark job as applied
      await supabaseAdmin
        .from('job_listings')
        .update({ is_applied: true })
        .eq('external_id', job.id)
        .eq('user_id', profile.user_id)

      console.log(`Successfully applied to ${job.title} at ${job.company}`)
    }
  } catch (error) {
    console.error(`Failed to apply to ${job.title}:`, error)
  }
}

/**
 * Get application limit based on subscription tier
 */
function getApplicationLimit(tier: string): number {
  const limits: Record<string, number> = {
    'price_starter': 50,
    'price_professional': 150,
    'price_enterprise': 999999, // Unlimited
  }
  
  return limits[tier] || 50
}

/**
 * Sleep helper
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Send notification email to user about new applications
 */
async function sendApplicationNotification(
  userEmail: string,
  applications: number
) {
  // Integrate with email service (SendGrid, Resend, etc.)
  // For now, just log
  console.log(`Would send email to ${userEmail}: ${applications} new applications sent`)
}


