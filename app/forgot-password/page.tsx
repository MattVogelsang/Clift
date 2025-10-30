'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/lib/auth-store'
import { Navbar } from '@/components/Navbar'

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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-16">
          <div className="max-w-md w-full card text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
            <p className="text-gray-600 mb-6">
              We've sent you a password reset link. Please check your email and follow the instructions.
            </p>
            <Link href="/login" className="btn-primary inline-block">
              Back to Login
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-16">
        <div className="max-w-md w-full">
          <div className="card">
            <h1 className="text-3xl font-bold text-center mb-2">Reset Password</h1>
            <p className="text-center text-gray-600 mb-8">
              Enter your email and we'll send you a reset link
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
              
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            
            <p className="mt-6 text-center text-gray-600">
              <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}


