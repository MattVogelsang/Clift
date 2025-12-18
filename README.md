# CareerLift - AI-Powered Job Search Automation

> **Get Hired While You Sleep** - AI-powered job search automation that continuously finds and applies to relevant jobs until you're hired.

## 🚀 Overview

CareerLift is a Next.js-based SaaS platform that automates the entire job search process. The platform uses AI to match your profile with relevant job postings and automatically submits applications on your behalf, saving you hours of manual work.

## ✨ Features

- **🤖 AI-Powered Job Matching** - Intelligent job recommendations based on your profile and preferences
- **📄 Automated Applications** - Automatically apply to hundreds of jobs with personalized cover letters
- **📊 Application Tracking** - Real-time dashboard to track all your applications and their status
- **📈 Analytics Dashboard** - Insights into your job search performance and success metrics
- **💼 Resume Management** - Upload and manage your resume with AI-powered optimization
- **🎯 Job Preferences** - Customize your job search criteria (location, salary, industry, etc.)
- **💳 Subscription Plans** - Flexible pricing tiers (Starter, Professional, Enterprise)
- **🔐 Secure Authentication** - Built with Supabase Auth for secure user management

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase
- **Payments:** Stripe
- **State Management:** Zustand
- **Testing:** Vitest
- **Deployment:** Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for payments)
- OpenAI API key (optional, for AI features)

## 🚦 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai-saas-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

See [docs/setup/ENV_VARIABLES_GUIDE.md](./docs/setup/ENV_VARIABLES_GUIDE.md) for detailed instructions on obtaining each environment variable.

### 4. Set Up Database

Run the Supabase schema:

```bash
# In Supabase Dashboard → SQL Editor, run:
cat supabase/schema.sql
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ai-saas-platform/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── ai/            # AI endpoints
│   │   ├── jobs/          # Job search endpoints
│   │   ├── stripe/        # Payment endpoints
│   │   └── user/          # User endpoints
│   ├── dashboard/         # User dashboard
│   ├── onboarding/        # Onboarding flow
│   └── ...                # Other pages
├── components/            # React components
│   ├── layout/            # Layout components (Navbar, Footer, Logo)
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   ├── jobs/              # Job-related components
│   ├── ai/                # AI interface components
│   ├── marketing/         # Marketing components
│   └── onboarding/        # Onboarding components
├── lib/                   # Utility libraries
│   ├── supabase.ts        # Supabase client
│   ├── stripe.ts          # Stripe integration
│   ├── ai-service.ts      # AI service integration
│   └── ...                # Other utilities
├── docs/                  # Documentation
│   ├── deployment/        # Deployment guides
│   ├── setup/             # Setup guides
│   └── checklists/        # Pre-launch checklists
├── public/                # Static assets
├── supabase/              # Database schema
└── tests/                 # Test files
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Vitest
- `npm run type-check` - TypeScript type checking

## 📚 Documentation

- **[Environment Variables Guide](./docs/setup/ENV_VARIABLES_GUIDE.md)** - Complete guide to setting up environment variables
- **[Deployment Guide](./docs/deployment/VERCEL_DEPLOYMENT_GUIDE.md)** - Step-by-step Vercel deployment instructions
- **[Deployment Steps](./docs/deployment/DEPLOYMENT_STEPS.md)** - Quick deployment checklist
- **[Pre-Launch Checklist](./docs/checklists/PRE_LAUNCH_CHECKLIST.md)** - Pre-launch verification checklist

## 🔐 Environment Variables

Required environment variables (see [ENV_VARIABLES_GUIDE.md](./docs/setup/ENV_VARIABLES_GUIDE.md) for details):

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `NEXT_PUBLIC_APP_URL` - Application URL
- `CRON_SECRET` - Secret for cron job authentication
- `OPENAI_API_KEY` - OpenAI API key (optional)

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

See [docs/deployment/VERCEL_DEPLOYMENT_GUIDE.md](./docs/deployment/VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions.

### Other Platforms

Docker and Fly.io configurations are available in `docs/deployment/archive/` if needed.

## 🧪 Testing

Run tests with:

```bash
npm run test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

See [LICENSE](./LICENSE) file for details.

## 🆘 Support

For issues, questions, or contributions, please open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Enhanced AI matching algorithms
- [ ] Multi-resume support
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] Mobile app
- [ ] Browser extension

---

Built with ❤️ using Next.js, Supabase, and Stripe
