import { NextRequest, NextResponse } from 'next/server'
import { runAutomatedJobSearch } from '@/lib/cron-job-search'

// This endpoint should be called by a cron service
// Security: Add authorization header check in production

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (add this to your .env)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET || 'your-secret-key'
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Run the automated job search
    await runAutomatedJobSearch()

    return NextResponse.json({
      success: true,
      message: 'Automated job search completed',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      { error: 'Cron job failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Vercel Cron Jobs configuration
// Add this to vercel.json:
/*
{
  "crons": [{
    "path": "/api/cron/job-search",
    "schedule": "0 * * * *"
  }]
}
*/


