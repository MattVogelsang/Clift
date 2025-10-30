import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const STRIPE_PLANS = {
  starter: {
    name: 'Basic',
    price: 29.99,
    priceId: process.env.STRIPE_STARTER_PRICE_ID || 'price_starter',
    applications: 50,
    features: [
      '50 job applications per month',
      'AI-powered job matching',
      'Auto-generated cover letters',
      'Application tracking dashboard',
      'Email notifications',
      'Standard support',
    ],
  },
  professional: {
    name: 'Professional',
    price: 79.99,
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID || 'price_professional',
    applications: 150,
    features: [
      '150 job applications per month',
      'Priority job matching',
      'Custom cover letter templates',
      'Advanced tracking & analytics',
      'Daily job alerts',
      'Resume optimization tips',
      'Priority support',
    ],
  },
  enterprise: {
    name: 'Premium',
    price: 129.99,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise',
    applications: 'Unlimited',
    features: [
      'Unlimited job applications',
      'Highest priority matching',
      'Personal job search strategist',
      'Career development resources',
      'LinkedIn profile optimization',
      'Salary negotiation guidance',
      'White-glove support',
      'Dedicated success manager',
    ],
  },
}

