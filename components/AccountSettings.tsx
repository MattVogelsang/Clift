'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/auth-store'
import Link from 'next/link'

interface UserProfile {
  subscription_status: string | null
  subscription_tier: string | null
  stripe_customer_id: string | null
}

export function AccountSettings() {
  const user = useAuthStore((state) => state.user)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/user/profile')
      const data = await res.json()
      setProfile(data)
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
      })
      const data = await res.json()
      
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Failed to open customer portal:', error)
    }
  }

  const handleUpgrade = async () => {
    window.location.href = '/#pricing'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Account Information */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Account Information</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="text-lg text-gray-900">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Account Created</label>
            <p className="text-lg text-gray-900">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Information */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Subscription</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Current Plan</label>
            <p className="text-lg text-gray-900 capitalize">
              {profile?.subscription_tier || 'Free'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Status</label>
            <p className="text-lg text-gray-900 capitalize">
              {profile?.subscription_status || 'Inactive'}
            </p>
          </div>
          
          <div className="flex gap-4 pt-4">
            {profile?.stripe_customer_id ? (
              <button
                onClick={handleManageSubscription}
                className="btn-primary"
              >
                Manage Subscription
              </button>
            ) : (
              <button
                onClick={handleUpgrade}
                className="btn-primary"
              >
                Upgrade Plan
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Data & Privacy</h2>
        <p className="text-gray-600 mb-4">
          Your data is stored securely with Supabase and encrypted at rest. 
          We do not share your personal information with third parties except 
          as required for payment processing through Stripe.
        </p>
        <div className="space-y-2">
          <Link href="/legal/privacy" className="block text-primary-600 hover:text-primary-700">
            View Privacy Policy →
          </Link>
          <Link href="/legal/terms" className="block text-primary-600 hover:text-primary-700">
            View Terms of Service →
          </Link>
        </div>
      </div>

      {/* Liability Notice */}
      <div className="card bg-yellow-50 border-yellow-200">
        <h2 className="text-xl font-bold mb-2 text-yellow-900">⚠️ Liability Notice</h2>
        <p className="text-sm text-yellow-800">
          By using this service, you acknowledge that AI outputs may not be accurate and are 
          provided "as-is". This service is not intended for legal, medical, or financial advice. 
          Our liability is limited to the amount you paid in the last 30 days. See our Terms 
          of Service for full details.
        </p>
      </div>
    </div>
  )
}


