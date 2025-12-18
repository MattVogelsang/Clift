'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { useAuthStore } from '@/lib/auth-store'
import { Navbar } from '@/components/layout/Navbar'
import { STRIPE_PLANS } from '@/lib/stripe'

function SignUpContent() {
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
        <div className="min-h-screen bg-background-dark flex items-center justify-center px-4 pt-20 pb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-950/30 via-purple-950/20 to-background-dark pointer-events-none" />
          <div className="relative max-w-md w-full">
            <div className="card-glass text-center animate-scale-in">
              <div className="text-6xl mb-6">
                <span className="text-accent-emerald">✓</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">
                <span className="text-white">Check Your</span>{' '}
                <span className="text-gradient">Email</span>
              </h1>
              <p className="text-neutral-400 mb-8 leading-relaxed">
                We've sent you a confirmation email. Please click the link in the email to verify your account.
              </p>
              <Link href="/login" className="btn-primary inline-block">
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background-dark flex items-center justify-center px-4 pt-20 pb-8 relative overflow-hidden">
        {/* Background Gradient Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/30 via-purple-950/20 to-background-dark pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-md w-full">
          <div className="card-glass animate-scale-in">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-white">Start Your</span>{' '}
                <span className="text-gradient">Job Search</span>
              </h1>
              <p className="text-neutral-400 text-sm">
                Selected plan:{' '}
                <span className="font-semibold text-primary-400">
                  {STRIPE_PLANS[selectedPlan as keyof typeof STRIPE_PLANS]?.name} - {STRIPE_PLANS[selectedPlan as keyof typeof STRIPE_PLANS]?.applications} applications/month
                </span>
              </p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field-glass"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field-glass"
                  required
                  minLength={8}
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field-glass"
                  required
                />
              </div>
              
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-primary-500 focus:ring-primary-500 focus:ring-2"
                  required
                />
                <label htmlFor="terms" className="text-sm text-neutral-400 leading-relaxed">
                  I agree to the{' '}
                  <Link href="/legal/terms" className="text-primary-400 hover:text-primary-300 transition-colors" target="_blank">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/legal/privacy" className="text-primary-400 hover:text-primary-300 transition-colors" target="_blank">
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
            
            <p className="mt-6 text-center text-neutral-400">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <>
        <Navbar />
        <div className="min-h-screen bg-background-dark pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-neutral-400">Loading...</p>
          </div>
        </div>
      </>
    }>
      <SignUpContent />
    </Suspense>
  )
}

