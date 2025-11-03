'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/lib/auth-store'
import { Navbar } from '@/components/Navbar'
import { STRIPE_PLANS } from '@/lib/stripe'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedPlan = searchParams.get('plan') || 'starter'
  const signUp = useAuthStore((state) => state.signUp)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (!agreedToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy')
      return
    }

    setLoading(true)

    const { error: signUpError } = await signUp(email, password)

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // For testing: Auto-login after signup and redirect to checkout
    const { signIn } = useAuthStore.getState()
    const { error: signInError } = await signIn(email, password)
    
    if (signInError) {
      // If auto-login fails, show success message (user needs to verify email)
      setSuccess(true)
      setLoading(false)
      return
    }

    // User is logged in - redirect to checkout
    const plan = STRIPE_PLANS[selectedPlan as keyof typeof STRIPE_PLANS]
    if (plan?.priceId) {
      try {
        const user = useAuthStore.getState().user
        if (user) {
          const response = await fetch('/api/stripe/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              priceId: plan.priceId,
              userId: user.id,
              email: user.email,
            }),
          })
          
          const data = await response.json()
          if (data.url) {
            window.location.href = data.url
            return
          }
        }
      } catch (err) {
        console.error('Checkout error:', err)
      }
    }

    // Fallback: redirect to dashboard
    router.push('/dashboard')
  }

  if (success) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-16">
          <div className="max-w-md w-full card text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
            <p className="text-gray-600 mb-6">
              We've sent you a confirmation email. Please click the link in the email to verify your account.
            </p>
            <Link href="/login" className="btn-primary inline-block">
              Go to Login
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-16 pb-8">
        <div className="max-w-md w-full">
          <div className="card">
            <h1 className="text-3xl font-bold text-center mb-2">Start Your Job Search</h1>
            <p className="text-center text-gray-600 mb-6">
              Selected plan: <span className="font-semibold text-primary-600">
                {STRIPE_PLANS[selectedPlan as keyof typeof STRIPE_PLANS]?.name} - {STRIPE_PLANS[selectedPlan as keyof typeof STRIPE_PLANS]?.applications} applications/month
              </span>
            </p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                  minLength={8}
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/legal/terms" className="text-primary-600 hover:text-primary-700" target="_blank">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/legal/privacy" className="text-primary-600 hover:text-primary-700" target="_blank">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            
            <p className="mt-6 text-center text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

