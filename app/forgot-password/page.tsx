'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/lib/auth-store'
import { Navbar } from '@/components/layout/Navbar'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const resetPassword = useAuthStore((state) => state.resetPassword)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await resetPassword(email)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
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
                We've sent you a password reset link. Please check your email and follow the instructions.
              </p>
              <Link href="/login" className="btn-primary inline-block">
                Back to Login
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/30 via-purple-950/20 to-background-dark pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-md w-full">
          <div className="card-glass animate-scale-in">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-white">Reset</span>{' '}
                <span className="text-gradient">Password</span>
              </h1>
              <p className="text-neutral-400">
                Enter your email and we'll send you a reset link
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
              
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            
            <p className="mt-6 text-center text-neutral-400">
              <Link href="/login" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}


