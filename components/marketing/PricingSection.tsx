'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/lib/auth-store'
import { STRIPE_PLANS } from '@/lib/stripe'
import { CLIENT_PLAN_IDS } from '@/lib/plan-client'

export function PricingSection() {
  const plans = Object.entries(STRIPE_PLANS)
  const user = useAuthStore((state) => state.user)
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleGetStarted = async (planKey: string, plan: typeof STRIPE_PLANS[keyof typeof STRIPE_PLANS]) => {
    if (!user) {
      // Not logged in - go to signup with plan
      window.location.href = `/signup?plan=${planKey}`
      return
    }

    // Use the actual Price ID from our mapping
    const priceId = CLIENT_PLAN_IDS[planKey as keyof typeof CLIENT_PLAN_IDS] || plan.priceId
    
    setLoadingPlan(planKey)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          userId: user.id,
          email: user.email,
        }),
      })
      
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('Checkout error response:', data)
        alert(`Error: ${data.error || 'Failed to create checkout session'}`)
        setLoadingPlan(null)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Error creating checkout session. Please try again.')
      setLoadingPlan(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="mb-4">
          <span className="text-white">Choose Your Job</span>{' '}
          <span className="text-gradient">Search Plan</span>
        </h2>
        <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Stop spending hours applying manually. Let AI apply to hundreds of jobs while you focus on your career goals.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {plans.map(([key, plan], index) => {
          const isProfessional = key === 'professional'
          return (
            <div
              key={key}
              className={`card-premium relative group ${
                isProfessional 
                  ? 'ring-2 ring-primary-500/50 border-primary-500/30 shadow-2xl shadow-primary-500/10' 
                  : ''
              }`}
            >
              {isProfessional && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="badge-accent text-xs font-bold px-4 py-1.5">
                    ⭐ MOST POPULAR
                  </div>
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-4 text-white">{plan.name}</h3>
              
              <div className="mb-6">
                <span className="text-5xl font-bold text-gradient-primary">${plan.price}</span>
                <span className="text-neutral-400 ml-2">/month</span>
              </div>
              
              <div className="mb-6 pb-6 border-b border-neutral-800">
                <div className="text-3xl font-bold text-white">
                  {typeof plan.applications === 'number' ? plan.applications : plan.applications}
                </div>
                <div className="text-sm text-neutral-400 mt-1">applications per month</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-neutral-300 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleGetStarted(key, plan)}
                disabled={loadingPlan === key}
                className={`w-full text-center py-3.5 px-6 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  isProfessional
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {loadingPlan === key ? 'Loading...' : key === 'enterprise' ? 'Get Premium' : 'Get Started'}
              </button>
            </div>
          )
        })}
      </div>
      
      <div className="mt-16 text-center space-y-3">
        <p className="text-sm text-neutral-400 flex items-center justify-center gap-2">
          <span className="text-primary-500">✓</span> No setup fees • Cancel anytime
        </p>
        <p className="text-sm text-neutral-400 flex items-center justify-center gap-2">
          <span className="text-primary-500">✓</span> 14-day money-back guarantee
        </p>
        <p className="text-sm text-neutral-400 flex items-center justify-center gap-2">
          <span className="text-primary-500">✓</span> Secure payments via Stripe • Your data is never shared
        </p>
      </div>
    </div>
  )
}
