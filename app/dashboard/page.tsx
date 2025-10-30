'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import { Navbar } from '@/components/Navbar'
import { ResumeUpload } from '@/components/ResumeUpload'
import { JobPreferences } from '@/components/JobPreferences'
import { JobMatches } from '@/components/JobMatches'
import { ApplicationTracker } from '@/components/ApplicationTracker'
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard'
import { AccountSettings } from '@/components/AccountSettings'

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'matches' | 'applications' | 'analytics' | 'profile' | 'settings'>('matches')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Job Search Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your job search activity.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <div className="text-3xl font-bold mb-1">147</div>
              <div className="text-primary-100 text-sm">Applications Sent</div>
            </div>
            <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="text-3xl font-bold mb-1">23</div>
              <div className="text-green-100 text-sm">Profile Views</div>
            </div>
            <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <div className="text-3xl font-bold mb-1">8</div>
              <div className="text-purple-100 text-sm">Response Rate</div>
            </div>
            <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
              <div className="text-3xl font-bold mb-1">92%</div>
              <div className="text-yellow-100 text-sm">Match Score</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex gap-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('matches')}
                className={`pb-4 px-2 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'matches'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                🎯 Job Matches
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`pb-4 px-2 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'applications'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📋 Applications
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`pb-4 px-2 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'analytics'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📊 Analytics
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-4 px-2 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                👤 My Profile
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`pb-4 px-2 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                ⚙️ Settings
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'matches' && <JobMatches />}
          {activeTab === 'applications' && <ApplicationTracker />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <ResumeUpload />
              <JobPreferences />
            </div>
          )}
          {activeTab === 'settings' && <AccountSettings />}
        </div>
      </div>
    </>
  )
}
