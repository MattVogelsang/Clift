# AI SaaS Platform

A complete, production-ready AI-powered SaaS platform built with Next.js, Supabase, and Stripe. This platform provides AI text generation and analysis services with secure user authentication, subscription management, and comprehensive legal protection.

## 🚀 Features

- **AI-Powered Services**: Text generation and analysis using OpenAI or custom AI models
- **User Authentication**: Secure authentication with Supabase (email/password, magic links)
- **Subscription Management**: Stripe integration for payments and subscription handling
- **Beautiful UI**: Modern, responsive design with Tailwind CSS
- **Legal Protection**: Complete Terms of Service and Privacy Policy
- **Secure Data Storage**: All data encrypted and stored with Supabase
- **API Ready**: RESTful API endpoints for all services
- **Type-Safe**: Built with TypeScript for reliability
- **Production Ready**: Optimized for deployment and scaling

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Supabase Setup](#supabase-setup)
- [Stripe Setup](#stripe-setup)
- [Development](#development)
- [Deployment](#deployment)
- [Legal Considerations](#legal-considerations)
- [API Documentation](#api-documentation)

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Payments**: [Stripe](https://stripe.com/)
- **AI**: OpenAI API (configurable for other providers)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)

## 📁 Project Structure

```
ai-saas-platform/
├── app/                      # Next.js 14 app directory
│   ├── api/                  # API routes
│   │   ├── ai/              # AI service endpoints
│   │   ├── stripe/          # Stripe integration
│   │   └── user/            # User management
│   ├── dashboard/           # User dashboard
│   ├── legal/               # Legal pages
│   │   ├── terms/          # Terms of Service
│   │   └── privacy/        # Privacy Policy
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   └── forgot-password/    # Password reset
├── components/              # React components
│   ├── AuthProvider.tsx    # Authentication context
│   ├── Navbar.tsx          # Navigation bar
│   ├── Footer.tsx          # Footer
│   ├── PricingSection.tsx  # Pricing cards
│   ├── AIInterface.tsx     # AI service interface
│   └── AccountSettings.tsx # User settings
├── lib/                     # Utility libraries
│   ├── supabase.ts         # Supabase client
│   ├── supabase-server.ts  # Server-side Supabase
│   ├── stripe.ts           # Stripe configuration
│   ├── auth-store.ts       # Authentication state
│   └── ai-service.ts       # AI service logic
├── supabase/               # Supabase configuration
│   └── schema.sql          # Database schema
└── public/                 # Static assets
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account ([sign up](https://supabase.com))
- A Stripe account ([sign up](https://stripe.com))
- An OpenAI API key (optional, for AI features)

### Installation

1. **Clone or navigate to the repository**:
   ```bash
   cd ai-saas-platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your actual credentials (see [Environment Variables](#environment-variables)).

4. **Set up Supabase** (see [Supabase Setup](#supabase-setup))

5. **Set up Stripe** (see [Stripe Setup](#stripe-setup))

6. **Run the development server**:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (create these in Stripe Dashboard)
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PROFESSIONAL_PRICE_ID=price_...
STRIPE_ENTERPRISE_PRICE_ID=price_...

# OpenAI Configuration (optional)
OPENAI_API_KEY=sk-...

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📊 Supabase Setup

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Get your credentials**:
   - Go to Project Settings > API
   - Copy the `URL` and `anon public` key
   - Copy the `service_role` key (keep this secret!)

3. **Run the database schema**:
   - Go to SQL Editor in Supabase Dashboard
   - Copy the contents of `supabase/schema.sql`
   - Execute the SQL to create tables and policies

4. **Configure authentication**:
   - Go to Authentication > Settings
   - Enable Email auth
   - Configure email templates if desired
   - Set Site URL to your domain

5. **Update environment variables** with your Supabase credentials

## 💳 Stripe Setup

1. **Create a Stripe account** at [stripe.com](https://stripe.com)

2. **Get your API keys**:
   - Go to Developers > API keys
   - Copy Publishable key and Secret key
   - Start with test mode keys

3. **Create Products and Prices**:
   - Go to Products > Add Product
   - Create three products (Starter, Professional, Enterprise)
   - Set recurring prices for each
   - Copy the Price IDs and add to `.env`

4. **Set up Webhook**:
   - Go to Developers > Webhooks > Add endpoint
   - URL: `https://your-domain.com/api/stripe/webhook`
   - Events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy the Webhook Secret to `.env`

5. **Configure Customer Portal**:
   - Go to Settings > Billing > Customer Portal
   - Enable and customize the portal

## 🔧 Development

### Running locally

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter
npm run type-check   # Check TypeScript types
```

### Testing Stripe locally

Use Stripe CLI to test webhooks locally:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## 🚀 Deployment

### Deploying to Vercel (Recommended)

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and import your repository

3. Add all environment variables from `.env`

4. Deploy!

5. Update Stripe webhook URL to your production domain

6. Update Supabase Site URL to your production domain

### Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Render
- Any Node.js hosting platform

## ⚖️ Legal Considerations

This platform includes comprehensive legal documentation:

### Terms of Service (`/legal/terms`)
- "AS-IS" service disclaimer
- Limitation of liability (capped at 30-day payment amount)
- No warranties on AI accuracy
- Not for legal/medical/financial advice
- Acceptable use policy
- Payment terms

### Privacy Policy (`/legal/privacy`)
- Data collection and usage
- Supabase storage details
- Stripe payment processing
- Third-party service providers
- User rights (GDPR-compliant)
- Data security measures

### Business Structure
The legal documents assume LLC formation. Update the placeholders:
- `[Your Company Name]` - Replace with your LLC name
- `[your-email@example.com]` - Replace with your business email
- `[Your Business Address]` - Replace with your registered address
- `[Your State/Country]` - Replace with your jurisdiction

### Important Disclaimers
All pages include prominent disclaimers stating:
- AI outputs may not be accurate
- Service is "as-is" without warranties
- Not for legal, medical, or financial advice
- Liability limited to 30-day payment amount

## 📚 API Documentation

### AI Endpoints

#### Generate Text
```
POST /api/ai/generate
Body: { prompt: string, userId: string }
Response: { response: string, tokensUsed: number, model: string }
```

#### Analyze Text
```
POST /api/ai/analyze
Body: { prompt: string, userId: string }
Response: { response: string, tokensUsed: number, model: string }
```

### User Endpoints

#### Get Profile
```
GET /api/user/profile
Response: { id, email, subscription_status, subscription_tier, stripe_customer_id }
```

### Stripe Endpoints

#### Create Checkout Session
```
POST /api/stripe/checkout
Body: { priceId: string, userId: string, email: string }
Response: { url: string }
```

#### Open Customer Portal
```
POST /api/stripe/portal
Response: { url: string }
```

## 🔒 Security Considerations

- All passwords are hashed by Supabase
- Row-level security (RLS) enabled on all tables
- API routes validate user authentication
- Stripe webhooks verify signatures
- Environment variables never exposed to client
- HTTPS required in production

## 💰 Cost Breakdown

### Expected Costs (per month):
- **Supabase**: Free tier (up to 500MB database, 50k auth users)
- **Stripe**: 2.9% + 30¢ per successful transaction
- **OpenAI API**: Variable (depends on usage)
  - GPT-3.5-turbo: ~$0.002 per 1K tokens
  - GPT-4: ~$0.03 per 1K tokens
- **Hosting** (Vercel): Free tier for hobby projects, $20/month Pro

### Revenue per Customer:
- Starter: $9.99/month
- Professional: $29.99/month
- Enterprise: $99.99/month

## 🤝 Contributing

This is a template project. Feel free to:
- Customize the design and branding
- Add new AI features
- Integrate different AI providers
- Enhance the UI/UX
- Add more payment options

## 📝 License

This project is provided as-is for commercial use. You can modify and use it for your own SaaS business.

## 🆘 Support & Contact

For questions or issues:
- Check the documentation above
- Review the code comments
- Open an issue on GitHub

## ✅ Checklist Before Launch

- [ ] Update company name in legal documents
- [ ] Add your business email and address
- [ ] Set up LLC or business entity
- [ ] Get business insurance (recommended)
- [ ] Configure production environment variables
- [ ] Set up Stripe production mode
- [ ] Configure custom domain
- [ ] Set up email service (SMTP)
- [ ] Test payment flow end-to-end
- [ ] Test AI service functionality
- [ ] Review and customize Terms of Service
- [ ] Review and customize Privacy Policy
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Configure backup strategy
- [ ] Set up monitoring and error tracking (Sentry, LogRocket, etc.)
- [ ] Test mobile responsiveness
- [ ] Perform security audit
- [ ] Set up customer support system

## 🎉 You're All Set!

Your AI SaaS platform is ready to launch. Customize it, add your branding, and start building your business!

For additional features or customizations, refer to the documentation for:
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Stripe: https://stripe.com/docs
- Tailwind CSS: https://tailwindcss.com/docs


