'use client'

import { useState } from 'react'

export function JobPreferences() {
  const [preferences, setPreferences] = useState({
    jobTitle: '',
    location: '',
    remote: true,
    salaryMin: '',
    salaryMax: '',
    industries: [] as string[],
    experienceLevel: 'mid',
  })

  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Education', 
    'Marketing', 'Sales', 'Engineering', 'Design',
    'Product Management', 'Data Science', 'Consulting'
  ]

  const handleSave = async () => {
    setSaving(true)
    setSuccess(false)

    // Simulate save - replace with actual API call
    setTimeout(() => {
      setSaving(false)
      setSuccess(true)
    }, 1500)
  }

  const toggleIndustry = (industry: string) => {
    setPreferences(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry]
    }))
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">🎯 Set Your Job Preferences</h2>
      <p className="text-gray-600 mb-6">
        Tell us what you're looking for and we'll find the perfect matches.
      </p>

      <div className="space-y-6">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Desired Job Title
          </label>
          <input
            type="text"
            value={preferences.jobTitle}
            onChange={(e) => setPreferences({...preferences, jobTitle: e.target.value})}
            placeholder="e.g., Software Engineer, Marketing Manager"
            className="input-field"
          />
        </div>

        {/* Location */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={preferences.location}
              onChange={(e) => setPreferences({...preferences, location: e.target.value})}
              placeholder="e.g., San Francisco, CA"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Type
            </label>
            <select
              value={preferences.remote ? 'remote' : 'onsite'}
              onChange={(e) => setPreferences({...preferences, remote: e.target.value === 'remote'})}
              className="input-field"
            >
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary Range (USD/year)
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              value={preferences.salaryMin}
              onChange={(e) => setPreferences({...preferences, salaryMin: e.target.value})}
              placeholder="Minimum (e.g., 80000)"
              className="input-field"
            />
            <input
              type="number"
              value={preferences.salaryMax}
              onChange={(e) => setPreferences({...preferences, salaryMax: e.target.value})}
              placeholder="Maximum (e.g., 150000)"
              className="input-field"
            />
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            value={preferences.experienceLevel}
            onChange={(e) => setPreferences({...preferences, experienceLevel: e.target.value})}
            className="input-field"
          >
            <option value="entry">Entry Level (0-2 years)</option>
            <option value="mid">Mid Level (3-5 years)</option>
            <option value="senior">Senior Level (6-10 years)</option>
            <option value="lead">Lead/Principal (10+ years)</option>
          </select>
        </div>

        {/* Industries */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industries (select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {industries.map((industry) => (
              <button
                key={industry}
                type="button"
                onClick={() => toggleIndustry(industry)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  preferences.industries.includes(industry)
                    ? 'border-primary-500 bg-primary-50 text-primary-700 font-semibold'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            ✓ Preferences saved! We're now searching for jobs that match your criteria.
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full btn-primary disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Preferences & Start Searching'}
        </button>
      </div>
    </div>
  )
}


