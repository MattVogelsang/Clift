'use client'

import { useState, useEffect } from 'react'

interface Stats {
  totalApplications: number
  profileViews: number
  responses: number
  offers: number
  responseRate: number
  averageMatchScore: number
  weeklyData: { week: string; applications: number; responses: number }[]
  topCompanies: { name: string; applications: number; status: string }[]
}

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [stats, setStats] = useState<Stats>({
    totalApplications: 0,
    profileViews: 0,
    responses: 0,
    offers: 0,
    responseRate: 0,
    averageMatchScore: 0,
    weeklyData: [],
    topCompanies: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        const response = await fetch(`/api/user/stats?range=${timeRange}`)
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [timeRange])

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
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                timeRange === range
                  ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="text-3xl font-bold text-blue-600">{stats.totalApplications}</div>
          <div className="text-sm text-gray-700 font-medium">Total Applications</div>
          <div className="text-xs text-green-600 mt-1">↑ 12% from last period</div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="text-3xl font-bold text-purple-600">{stats.responses}</div>
          <div className="text-sm text-gray-700 font-medium">Responses</div>
          <div className="text-xs text-green-600 mt-1">{stats.responses > 0 ? 'Active' : 'No responses yet'}</div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="text-3xl font-bold text-yellow-600">{stats.offers}</div>
          <div className="text-sm text-gray-700 font-medium">Offers</div>
          <div className="text-xs text-green-600 mt-1">{stats.offers > 0 ? 'Congratulations!' : 'Keep applying'}</div>
        </div>

        <div className="card bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="text-3xl font-bold text-orange-600">{stats.responseRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-700 font-medium">Response Rate</div>
          <div className="text-xs text-green-600 mt-1">{stats.responseRate > 10 ? 'Above average!' : 'Keep improving'}</div>
        </div>

        <div className="card bg-gradient-to-br from-pink-50 to-pink-100">
          <div className="text-3xl font-bold text-pink-600">{stats.averageMatchScore}%</div>
          <div className="text-sm text-gray-700 font-medium">Avg Match Score</div>
          <div className="text-xs text-gray-600 mt-1">{stats.averageMatchScore > 0 ? 'Good matches' : 'No matches yet'}</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Application Trend Chart */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Application Activity</h3>
          <div className="space-y-4">
            {stats.weeklyData.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No data for this time period</p>
            ) : (
              stats.weeklyData.map((week, index) => (
              <div key={week.week}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 font-medium">{week.week}</span>
                  <span className="text-gray-600">
                    {week.applications} applications • {week.responses} responses
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-purple-600 rounded-full transition-all"
                      style={{ width: `${(week.applications / 50) * 100}%` }}
                    />
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${(week.responses / 10) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
          <div className="mt-6 flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-purple-600"></div>
              <span className="text-gray-600">Applications</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Responses</span>
            </div>
          </div>
        </div>

        {/* Top Companies */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top Companies Applied To</h3>
          <div className="space-y-4">
            {stats.topCompanies.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No applications yet</p>
            ) : (
              stats.topCompanies.map((company, index) => (
              <div key={company.name} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{company.name}</div>
                  <div className="text-sm text-gray-600">{company.applications} applications</div>
                </div>
                <div className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                  {company.status}
                </div>
              </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="card bg-gradient-to-r from-primary-50 to-purple-50 border-2 border-primary-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Performance Insights</h3>
        <div className="space-y-3 text-gray-700">
          <p>
            ✓ Your response rate is <strong className="text-green-600">{stats.responseRate.toFixed(1)}%</strong>
            {stats.responseRate > 5 ? ', which is above the industry average of 5%.' : '. Keep applying to improve!'}
          </p>
          <p>
            {stats.totalApplications > 0 ? (
              <>✓ You've sent <strong className="text-purple-600">{stats.totalApplications} applications</strong> and received <strong className="text-purple-600">{stats.responses} responses</strong>. Keep this up!</>
            ) : (
              <>✓ Start applying to jobs to see your statistics here!</>
            )}
          </p>
          <p>
            ✓ Best application times: <strong>Tuesday-Thursday mornings</strong> show 
            28% higher response rates.
          </p>
          <p>
            💡 <strong>Tip:</strong> Jobs with 85%+ match scores have 2x higher interview rates. 
            Focus on those for best results.
          </p>
        </div>
      </div>
    </div>
  )
}


