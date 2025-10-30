'use client'

import { useState } from 'react'

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  matchScore: number
  postedDate: string
  source: string
  applied: boolean
}

export function JobMatches() {
  const [jobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA (Remote)',
      salary: '$120k - $180k',
      matchScore: 95,
      postedDate: '2 hours ago',
      source: 'LinkedIn',
      applied: true
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      salary: '$100k - $150k',
      matchScore: 92,
      postedDate: '5 hours ago',
      source: 'Indeed',
      applied: true
    },
    {
      id: '3',
      title: 'Software Developer',
      company: 'MegaCorp',
      location: 'Austin, TX (Hybrid)',
      salary: '$90k - $130k',
      matchScore: 88,
      postedDate: '1 day ago',
      source: 'Glassdoor',
      applied: false
    },
    {
      id: '4',
      title: 'Backend Engineer',
      company: 'DataFlow Solutions',
      location: 'Remote',
      salary: '$110k - $160k',
      matchScore: 85,
      postedDate: '1 day ago',
      source: 'LinkedIn',
      applied: false
    },
  ])

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50'
    if (score >= 80) return 'text-blue-600 bg-blue-50'
    return 'text-yellow-600 bg-yellow-50'
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">🎯 Your Job Matches</h2>
            <p className="text-gray-600">AI-matched jobs based on your profile and preferences</p>
          </div>
          <button className="btn-primary">
            Refresh Matches
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-primary-600">{jobs.length}</div>
            <div className="text-sm text-gray-600">New Matches Today</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-600">
              {jobs.filter(j => j.applied).length}
            </div>
            <div className="text-sm text-gray-600">Applications Sent</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-600">
              {jobs.filter(j => !j.applied).length}
            </div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
        </div>
      </div>

      {/* Job List */}
      {jobs.map((job) => (
        <div key={job.id} className="card hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                {job.applied && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                    ✓ Applied
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-700 mb-1">{job.company}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  📍 {job.location}
                </span>
                <span className="flex items-center gap-1">
                  💰 {job.salary}
                </span>
                <span className="flex items-center gap-1">
                  🕐 {job.postedDate}
                </span>
                <span className="flex items-center gap-1">
                  🔗 {job.source}
                </span>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full font-semibold ${getMatchColor(job.matchScore)}`}>
              {job.matchScore}% Match
            </div>
          </div>

          <div className="flex gap-3">
            {job.applied ? (
              <button className="flex-1 bg-gray-100 text-gray-500 py-2 px-4 rounded-lg font-semibold cursor-not-allowed" disabled>
                Application Submitted
              </button>
            ) : (
              <>
                <button 
                  className="flex-1 btn-primary"
                  onClick={() => {
                    // Open job search websites in new tabs
                    const jobSites = [
                      'https://www.indeed.com',
                      'https://www.linkedin.com/jobs',
                      'https://www.glassdoor.com/Job/index.htm',
                      'https://www.ziprecruiter.com',
                      'https://www.monster.com'
                    ]
                    
                    // Open 2-3 random job sites
                    const sitesToOpen = jobSites
                      .sort(() => 0.5 - Math.random())
                      .slice(0, 2)
                    
                    sitesToOpen.forEach(site => {
                      window.open(site, '_blank', 'noopener,noreferrer')
                    })
                  }}
                >
                  Apply Now
                </button>
                <button className="px-6 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50">
                  Skip
                </button>
              </>
            )}
            <button 
              className="px-6 py-2 border-2 border-primary-300 text-primary-600 rounded-lg font-semibold hover:bg-primary-50"
              onClick={() => {
                // Open Google search for the job title and company
                const searchQuery = encodeURIComponent(`${job.title} ${job.company} jobs`)
                window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank', 'noopener,noreferrer')
              }}
            >
              Search Similar
            </button>
          </div>
        </div>
      ))}

      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">
          We're continuously searching for more jobs that match your profile
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Click "Apply Now" to open popular job search websites where you can find and apply to similar positions. 
            Click "Search Similar" to find more jobs like this one on Google.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-sm text-gray-500">
          <div className="animate-spin h-4 w-4 border-2 border-primary-600 border-t-transparent rounded-full"></div>
          Scanning job boards...
        </div>
      </div>
    </div>
  )
}


