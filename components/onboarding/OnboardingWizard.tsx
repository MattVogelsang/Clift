'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface OnboardingData {
  resume: File | null
  jobTitle: string
  location: string
  remote: boolean
  salaryMin: string
  salaryMax: string
  industries: string[]
  experienceLevel: string
}

export function OnboardingWizard() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    resume: null,
    jobTitle: '',
    location: '',
    remote: true,
    salaryMin: '',
    salaryMax: '',
    industries: [],
    experienceLevel: 'mid'
  })
  const router = useRouter()

  const totalSteps = 4

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Education', 
    'Marketing', 'Sales', 'Engineering', 'Design',
    'Product Management', 'Data Science', 'Consulting'
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData({...data, resume: e.target.files[0]})
    }
  }

  const toggleIndustry = (industry: string) => {
    setData(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry]
    }))
  }

  const handleComplete = () => {
    // Save data and redirect to dashboard
    localStorage.setItem('onboarding_complete', 'true')
    router.push('/dashboard')
  }

  const progressPercentage = (step / totalSteps) * 100

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-purple-600 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="card">
          {/* Step 1: Welcome & Resume Upload */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">👋</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Welcome to CareerLift!
                </h2>
                <p className="text-lg text-gray-600">
                  Let's get you set up in just a few minutes. First, upload your resume.
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload-onboarding"
                />
                <label htmlFor="resume-upload-onboarding" className="cursor-pointer">
                  <div className="text-6xl mb-4">📄</div>
                  {data.resume ? (
                    <div>
                      <p className="text-xl font-semibold text-primary-600 mb-2">
                        {data.resume.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(data.resume.size / 1024).toFixed(0)} KB • Click to change
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xl font-semibold mb-2">
                        Click to upload your resume
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, DOC, or DOCX (Max 10MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!data.resume}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Job Preferences */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  What's Your Dream Role?
                </h2>
                <p className="text-lg text-gray-600">
                  Tell us what you're looking for
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Job Title
                </label>
                <input
                  type="text"
                  value={data.jobTitle}
                  onChange={(e) => setData({...data, jobTitle: e.target.value})}
                  placeholder="e.g., Software Engineer, Marketing Manager"
                  className="input-field"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    value={data.location}
                    onChange={(e) => setData({...data, location: e.target.value})}
                    placeholder="e.g., San Francisco, CA"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Type
                  </label>
                  <select
                    value={data.remote ? 'remote' : 'onsite'}
                    onChange={(e) => setData({...data, remote: e.target.value === 'remote'})}
                    className="input-field"
                  >
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  value={data.experienceLevel}
                  onChange={(e) => setData({...data, experienceLevel: e.target.value})}
                  className="input-field"
                >
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior Level (6-10 years)</option>
                  <option value="lead">Lead/Principal (10+ years)</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!data.jobTitle}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Salary & Industries */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">💰</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Salary & Industries
                </h2>
                <p className="text-lg text-gray-600">
                  Help us find the perfect match
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Salary Range (USD/year)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    value={data.salaryMin}
                    onChange={(e) => setData({...data, salaryMin: e.target.value})}
                    placeholder="Minimum (e.g., 80000)"
                    className="input-field"
                  />
                  <input
                    type="number"
                    value={data.salaryMax}
                    onChange={(e) => setData({...data, salaryMax: e.target.value})}
                    placeholder="Maximum (e.g., 150000)"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Target Industries (select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      type="button"
                      onClick={() => toggleIndustry(industry)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium ${
                        data.industries.includes(industry)
                          ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-purple-50 text-gray-900 shadow-md'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={data.industries.length === 0}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review & Complete */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  You're All Set!
                </h2>
                <p className="text-lg text-gray-600">
                  Review your profile and start your automated job search
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Resume</label>
                  <p className="text-gray-900 font-semibold">{data.resume?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Job Title</label>
                  <p className="text-gray-900 font-semibold">{data.jobTitle}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location & Type</label>
                  <p className="text-gray-900 font-semibold">
                    {data.location} • {data.remote ? 'Remote' : 'On-site'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Salary Range</label>
                  <p className="text-gray-900 font-semibold">
                    ${parseInt(data.salaryMin).toLocaleString()} - ${parseInt(data.salaryMax).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Industries</label>
                  <p className="text-gray-900 font-semibold">{data.industries.join(', ')}</p>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                <p className="text-green-800 font-semibold mb-2">
                  🎉 Your profile is ready!
                </p>
                <p className="text-green-700 text-sm">
                  We'll start searching for jobs that match your criteria immediately.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-1 btn-primary"
                >
                  Complete Setup & Start Job Search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


