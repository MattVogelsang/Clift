'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import { Navbar } from '@/components/Navbar'
import { ResumeUpload } from '@/components/ResumeUpload'
import { JobPreferences } from '@/components/JobPreferences'
import { JobMatches } from '@/components/JobMatches'
import { ApplicationTracker } from '@/components/ApplicationTracker'
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard'
import { AccountSettings } from '@/components/AccountSettings'
import { PLAN_NAME_BY_PRICE_ID } from '@/lib/plan-client'

type AlertState = {
  type: 'success' | 'error'
  title: string
  message: string
}

type SubscriptionInfo = {
  status: string
  tierLabel: string
  tierRaw: string | null
  stripeCustomerId: string | null
  loading: boolean
}

const getPlanLabel = (tier?: string | null) => {
  if (!tier) return 'No active subscription'
  return PLAN_NAME_BY_PRICE_ID[tier] || tier.replace(/_/g, ' ')
}

const getStatusMeta = (status?: string | null) => {
  const normalized = (status || 'inactive').toLowerCase()
  switch (normalized) {
    case 'active':
      return {
        label: 'Active',
        classes: 'bg-green-100 text-green-800 border border-green-200',
      }
    case 'trialing':
      return {
        label: 'Trialing',
        classes: 'bg-blue-100 text-blue-800 border border-blue-200',
      }
    case 'past_due':
    case 'past-due':
      return {
        label: 'Past due',
        classes: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      }
    case 'canceled':
    case 'cancelled':
      return {
        label: 'Canceled',
        classes: 'bg-gray-100 text-gray-700 border border-gray-200',
      }
    default:
      return {
        label: 'Inactive',
        classes: 'bg-gray-100 text-gray-700 border border-gray-200',
      }
  }
}

function DashboardContent() {
  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)
  const checkUser = useAuthStore((state) => state.checkUser)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'matches' | 'applications' | 'analytics' | 'profile' | 'settings'>('matches')
  const [quickStats, setQuickStats] = useState({
    applicationsSent: 0,
    profileViews: 0,
    responseRate: 0,
    matchScore: 0,
  })
  const [statsLoading, setStatsLoading] = useState(true)
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>({
    status: 'inactive',
    tierLabel: 'No active subscription',
    tierRaw: null,
    stripeCustomerId: null,
    loading: true,
  })
  const [billingLoading, setBillingLoading] = useState(false)
  const [alert, setAlert] = useState<AlertState | null>(null)

  useEffect(() => {
    async function fetchQuickStats() {
      try {
        const response = await fetch('/api/user/stats?range=30d')
        if (response.ok) {
          const data = await response.json()
          setQuickStats({
            applicationsSent: data.totalApplications || 0,
            profileViews: data.profileViews || 0,
            responseRate: data.responseRate || 0,
            matchScore: data.averageMatchScore || 0,
          })
        }
      } catch (error) {
        console.error('Error fetching quick stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }

    if (user) {
      fetchQuickStats()
    }
  }, [user])

  const loadSubscription = useCallback(async () => {
    if (!user) {
      return
    }

    setSubscriptionInfo((prev) => ({ ...prev, loading: true }))
    try {
      const response = await fetch('/api/user/profile', {
        credentials: 'include', // Ensure cookies are sent
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('[Dashboard] Profile API error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        })
        throw new Error(`Failed to load profile: ${response.status}`)
      }
      
      const data = await response.json()
      
      setSubscriptionInfo({
        status: data.subscription_status || 'inactive',
        tierLabel: getPlanLabel(data.subscription_tier),
        tierRaw: data.subscription_tier || null,
        stripeCustomerId: data.stripe_customer_id || null,
        loading: false,
      })
    } catch (error) {
      console.error('[Dashboard] Failed to load subscription info:', error)
      setSubscriptionInfo((prev) => ({ ...prev, loading: false }))
    }
  }, [user])

  useEffect(() => {
    // Re-check user session on mount (especially after Stripe redirect)
    checkUser()
  }, [checkUser])

  useEffect(() => {
    if (user) {
      loadSubscription()
    }
  }, [user, loadSubscription])

  useEffect(() => {
    if (!searchParams) return
    const success = searchParams.get('success')
    const error = searchParams.get('error')

    if (success === 'true') {
      setAlert({
        type: 'success',
        title: 'Payment successful',
        message: 'Thanks! Your subscription is active. Syncing subscription data...',
      })
      // Wait for user to be authenticated, then sync
      const syncSubscription = async () => {
        // Wait a bit for auth to be ready
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Re-check user to ensure session is loaded
        await checkUser()
        // Wait a bit more for state to update
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        // Now try to sync
        try {
          const res = await fetch('/api/stripe/sync-subscription', { method: 'POST' })
          const data = await res.json()
          if (!data.success) {
            console.warn('Sync failed, webhook should have handled it:', data)
          }
        } catch (err) {
          console.error('Sync error:', err)
        } finally {
          // Always reload subscription info
          setTimeout(() => {
            loadSubscription()
          }, 1000)
        }
      }
      syncSubscription()
    } else if (error) {
      const message =
        error === 'stripe_canceled'
          ? 'Checkout was canceled before completion. Your card was not charged.'
          : 'We could not complete your payment. Please try again.'
      setAlert({
        type: 'error',
        title: 'Payment not completed',
        message,
      })
    } else {
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    params.delete('success')
    params.delete('error')
    const query = params.toString()
    router.replace(`/dashboard${query ? `?${query}` : ''}`)
  }, [searchParams, router, loadSubscription, checkUser])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleManageSubscription = async () => {
    setBillingLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
        return
      }
      throw new Error(data.error || 'Missing portal URL')
    } catch (error) {
      console.error('Failed to open customer portal:', error)
      setAlert({
        type: 'error',
        title: 'Unable to open billing portal',
        message: 'Please try again in a moment or contact support if the issue persists.',
      })
    } finally {
      setBillingLoading(false)
    }
  }

  const statusMeta = getStatusMeta(subscriptionInfo.status)

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

          {alert && (
            <div
              className={`mb-6 flex items-start justify-between gap-4 rounded-lg border px-4 py-3 ${
                alert.type === 'success'
                  ? 'border-green-200 bg-green-50 text-green-800'
                  : 'border-red-200 bg-red-50 text-red-800'
              }`}
            >
              <div>
                <p className="font-semibold">{alert.title}</p>
                <p className="text-sm">{alert.message}</p>
              </div>
              <button
                onClick={() => setAlert(null)}
                className="text-xl leading-none text-current opacity-70 hover:opacity-100"
                aria-label="Dismiss alert"
              >
                ×
              </button>
            </div>
          )}

          {/* Subscription Summary */}
          <div className="card mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Current plan</p>
              {subscriptionInfo.loading ? (
                <div className="mt-2 h-6 w-32 animate-pulse rounded bg-gray-200" />
              ) : (
                <>
                  <div className="text-2xl font-semibold text-gray-900">
                    {subscriptionInfo.tierLabel}
                  </div>
                  <span
                    className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusMeta.classes}`}
                  >
                    {statusMeta.label}
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  checkUser()
                  loadSubscription()
                }}
                disabled={subscriptionInfo.loading}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
                title="Refresh subscription status"
              >
                🔄 Refresh
              </button>
              {subscriptionInfo.stripeCustomerId ? (
                <button
                  onClick={handleManageSubscription}
                  disabled={billingLoading}
                  className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {billingLoading ? 'Opening portal...' : 'Manage billing'}
                </button>
              ) : (
                <button
                  onClick={() => router.push('/#pricing')}
                  className="btn-primary"
                >
                  Upgrade plan
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <div className="text-3xl font-bold mb-1">
                {statsLoading ? '...' : quickStats.applicationsSent}
              </div>
              <div className="text-primary-100 text-sm">Applications Sent</div>
            </div>
            <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="text-3xl font-bold mb-1">
                {statsLoading ? '...' : quickStats.profileViews}
              </div>
              <div className="text-green-100 text-sm">Profile Views</div>
            </div>
            <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <div className="text-3xl font-bold mb-1">
                {statsLoading ? '...' : `${quickStats.responseRate.toFixed(1)}%`}
              </div>
              <div className="text-purple-100 text-sm">Response Rate</div>
            </div>
            <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
              <div className="text-3xl font-bold mb-1">
                {statsLoading ? '...' : `${quickStats.matchScore}%`}
              </div>
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

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </>
    }>
      <DashboardContent />
    </Suspense>
  )
}
