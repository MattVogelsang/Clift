'use client'

import { useState, useEffect } from 'react'

interface Application {
  id: string
  jobTitle: string
  company: string
  appliedDate: string
  status: 'applied' | 'viewed' | 'response' | 'rejected' | 'offer'
  salary: string
  location: string
}

export function ApplicationTracker() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchApplications() {
      try {
        setLoading(true)
        const response = await fetch('/api/user/stats?range=90d')
        if (response.ok) {
          const data = await response.json()
          // Transform API data to component format
          const transformed = (data.applications || []).map((app: any) => ({
            id: app.id,
            jobTitle: app.job_listings?.title || 'Unknown Position',
            company: app.job_listings?.company || 'Unknown Company',
            appliedDate: app.applied_at,
            status: app.status,
            salary: app.job_listings?.salary || 'Not specified',
            location: app.job_listings?.location || 'Not specified',
          }))
          setApplications(transformed)
        }
      } catch (error) {
        console.error('Error fetching applications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const getTimeAgo = (date: Date): string => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getStatusBadge = (status: Application['status']) => {
    const styles = {
      applied: 'bg-blue-100 text-blue-700',
      viewed: 'bg-purple-100 text-purple-700',
      response: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      offer: 'bg-yellow-100 text-yellow-700',
    }

    const labels = {
      applied: '📤 Applied',
      viewed: '👀 Viewed',
      response: '🎉 Response',
      rejected: '❌ Rejected',
      offer: '⭐ Offer',
    }

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === 'applied').length,
    viewed: applications.filter(a => a.status === 'viewed').length,
    responses: applications.filter(a => a.status === 'response').length,
    offers: applications.filter(a => a.status === 'offer').length,
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="text-3xl font-bold text-primary-600">{stats.total}</div>
          <div className="text-sm text-gray-700 font-medium">Total Applications</div>
        </div>
        <div className="card bg-blue-50">
          <div className="text-3xl font-bold text-blue-600">{stats.applied}</div>
          <div className="text-sm text-gray-700 font-medium">Under Review</div>
        </div>
        <div className="card bg-purple-50">
          <div className="text-3xl font-bold text-purple-600">{stats.viewed}</div>
          <div className="text-sm text-gray-700 font-medium">Profile Viewed</div>
        </div>
        <div className="card bg-green-50">
          <div className="text-3xl font-bold text-green-600">{stats.responses}</div>
          <div className="text-sm text-gray-700 font-medium">Responses</div>
        </div>
        <div className="card bg-yellow-50">
          <div className="text-3xl font-bold text-yellow-600">{stats.offers}</div>
          <div className="text-sm text-gray-700 font-medium">Offers</div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">📋 Your Applications</h2>
          <button className="text-primary-600 hover:text-primary-700 font-semibold">
            Export to CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          {applications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No applications yet</p>
              <p className="text-sm text-gray-400">Start applying to jobs to track them here!</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-semibold text-gray-700">Job Title</th>
                  <th className="pb-3 font-semibold text-gray-700">Company</th>
                  <th className="pb-3 font-semibold text-gray-700">Applied</th>
                  <th className="pb-3 font-semibold text-gray-700">Status</th>
                  <th className="pb-3 font-semibold text-gray-700">Salary</th>
                  <th className="pb-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4">
                    <div className="font-semibold text-gray-900">{app.jobTitle}</div>
                    <div className="text-sm text-gray-500">{app.location}</div>
                  </td>
                  <td className="py-4 text-gray-700">{app.company}</td>
                  <td className="py-4 text-gray-600 text-sm">
                    {new Date(app.appliedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-4">{getStatusBadge(app.status)}</td>
                  <td className="py-4 text-gray-700 text-sm">{app.salary}</td>
                  <td className="py-4">
                    <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                      View Details →
                    </button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">📅 Recent Activity</h3>
        <div className="space-y-4">
          {applications.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No recent activity</p>
          ) : (
            applications.slice(0, 5).map((app) => {
              const getActivityIcon = () => {
                switch (app.status) {
                  case 'offer':
                    return { icon: '⭐', bg: 'bg-yellow-100', color: 'text-yellow-600' }
                  case 'response':
                    return { icon: '🎉', bg: 'bg-green-100', color: 'text-green-600' }
                  case 'viewed':
                    return { icon: '👀', bg: 'bg-purple-100', color: 'text-purple-600' }
                  case 'rejected':
                    return { icon: '❌', bg: 'bg-red-100', color: 'text-red-600' }
                  default:
                    return { icon: '📤', bg: 'bg-blue-100', color: 'text-blue-600' }
                }
              }
              const activity = getActivityIcon()
              const appliedDate = new Date(app.appliedDate)
              const timeAgo = getTimeAgo(appliedDate)
              
              return (
                <div key={app.id} className="flex items-start gap-4">
                  <div className={`${activity.bg} ${activity.color} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {app.status === 'response' && `Response received from ${app.company}`}
                      {app.status === 'viewed' && `${app.company} viewed your profile`}
                      {app.status === 'offer' && `Offer received from ${app.company}!`}
                      {app.status === 'rejected' && `Application to ${app.company} was not selected`}
                      {app.status === 'applied' && `Applied to ${app.jobTitle} at ${app.company}`}
                    </p>
                    <p className="text-sm text-gray-600">{timeAgo}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}


