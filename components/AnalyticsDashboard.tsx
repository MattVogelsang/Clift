'use client'

import { useState } from 'react'

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  // Mock data - replace with real data from your API
  const stats = {
    totalApplications: 147,
    responses: 23,
    offers: 2,
    responseRate: 15.6,
    averageMatchScore: 89,
  }

  const weeklyData = [
    { week: 'Week 1', applications: 35, responses: 4 },
    { week: 'Week 2', applications: 42, responses: 6 },
    { week: 'Week 3', applications: 38, responses: 7 },
    { week: 'Week 4', applications: 32, responses: 6 },
  ]

  const topCompanies = [
    { name: 'TechCorp', applications: 8, status: 'Response received' },
    { name: 'DataFlow', applications: 6, status: 'Under review' },
    { name: 'CloudScale', applications: 5, status: 'Profile viewed' },
    { name: 'InnovateLabs', applications: 4, status: 'Applied' },
  ]

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
          <div className="text-xs text-green-600 mt-1">↑ 18% from last period</div>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="text-3xl font-bold text-blue-600">{stats.averageMatchScore}%</div>
          <div className="text-sm text-gray-700 font-medium">Avg Match Score</div>
          <div className="text-xs text-blue-600 mt-1">↑ 5% from last period</div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="text-3xl font-bold text-yellow-600">{stats.offers}</div>
          <div className="text-sm text-gray-700 font-medium">Offers</div>
          <div className="text-xs text-green-600 mt-1">New this period!</div>
        </div>

        <div className="card bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="text-3xl font-bold text-orange-600">{stats.responseRate}%</div>
          <div className="text-sm text-gray-700 font-medium">Response Rate</div>
          <div className="text-xs text-green-600 mt-1">↑ 3% from last period</div>
        </div>

        <div className="card bg-gradient-to-br from-pink-50 to-pink-100">
          <div className="text-3xl font-bold text-pink-600">{stats.averageMatchScore}%</div>
          <div className="text-sm text-gray-700 font-medium">Avg Match Score</div>
          <div className="text-xs text-gray-600 mt-1">Consistent</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Application Trend Chart */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Application Activity</h3>
          <div className="space-y-4">
            {weeklyData.map((week, index) => (
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
            ))}
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
            {topCompanies.map((company, index) => (
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
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="card bg-gradient-to-r from-primary-50 to-purple-50 border-2 border-primary-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Performance Insights</h3>
        <div className="space-y-3 text-gray-700">
          <p>
            ✓ Your response rate is <strong className="text-green-600">15.6%</strong>, which is 
            3x higher than the industry average of 5%.
          </p>
          <p>
            ✓ You're getting <strong className="text-purple-600">23 responses</strong> from 147 applications. 
            Keep this up and you'll have multiple offers soon!
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


