'use client'

import Link from 'next/link'
import { STRIPE_PLANS } from '@/lib/stripe'

export function PricingSection() {
  const plans = Object.entries(STRIPE_PLANS)

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-4">
        Choose Your Job Search Plan
      </h2>
      <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
        Stop spending hours applying manually. Let AI apply to hundreds of jobs while you focus on your career goals.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map(([key, plan], index) => (
          <div
            key={key}
            className={`card relative ${
              key === 'professional' 
                ? 'ring-2 ring-primary-500 transform scale-105 shadow-2xl' 
                : ''
            }`}
          >
            {key === 'professional' && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                  ⭐ MOST POPULAR
                </div>
              </div>
            )}
            
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            
            <div className="mb-4">
              <span className="text-5xl font-bold">${plan.price}</span>
              <span className="text-gray-600">/month</span>
            </div>
            
            <div className="mb-6 pb-6 border-b">
              <div className="text-3xl font-bold text-primary-600">
                {typeof plan.applications === 'number' ? plan.applications : plan.applications}
              </div>
              <div className="text-sm text-gray-600">applications per month</div>
            </div>
            
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0"
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
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link
              href={`/signup?plan=${key}`}
              className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                key === 'professional'
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {key === 'enterprise' ? 'Get Premium' : 'Get Started'}
            </Link>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center space-y-2">
        <p className="text-sm text-gray-600">
          ✓ No setup fees • Cancel anytime
        </p>
        <p className="text-sm text-gray-600">
          ✓ Cancel anytime • 14-day money-back guarantee
        </p>
        <p className="text-sm text-gray-600">
          ✓ Secure payments via Stripe • Your data is never shared
        </p>
      </div>
    </div>
  )
}
