'use client'

import { useState } from 'react'

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
  const [applications] = useState<Application[]>([
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      appliedDate: '2024-10-06',
      status: 'response',
      salary: '$120k - $180k',
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      jobTitle: 'Full Stack Developer',
      company: 'StartupXYZ',
      appliedDate: '2024-10-05',
      status: 'viewed',
      salary: '$100k - $150k',
      location: 'New York, NY'
    },
    {
      id: '3',
      jobTitle: 'Software Developer',
      company: 'MegaCorp',
      appliedDate: '2024-10-04',
      status: 'applied',
      salary: '$90k - $130k',
      location: 'Austin, TX'
    },
    {
      id: '4',
      jobTitle: 'Backend Engineer',
      company: 'DataFlow Solutions',
      appliedDate: '2024-10-03',
      status: 'rejected',
      salary: '$110k - $160k',
      location: 'Remote'
    },
  ])

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
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">📅 Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
              🎉
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Response received from TechCorp Inc.</p>
              <p className="text-sm text-gray-600">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
              📤
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Applied to 12 new positions</p>
              <p className="text-sm text-gray-600">Today at 3:00 AM</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
              👀
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">StartupXYZ viewed your profile</p>
              <p className="text-sm text-gray-600">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


