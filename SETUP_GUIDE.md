# Quick Setup Guide

This guide will walk you through setting up your AI SaaS platform from scratch.

## Step 1: Install Dependencies (5 minutes)

```bash
cd ai-saas-platform
npm install
```

## Step 2: Create Supabase Project (10 minutes)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be created (takes ~2 minutes)
3. Go to **Project Settings > API**
4. Copy these values:
   - Project URL
   - `anon public` key
   - `service_role` key (⚠️ keep this secret!)

## Step 3: Set Up Database (5 minutes)

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste and click **Run**
5. You should see "Success. No rows returned"

## Step 4: Configure Stripe (15 minutes)

1. Go to [stripe.com](https://stripe.com) and create an account
2. Go to **Developers > API keys**
3. Copy your test mode keys (Publishable and Secret)
4. Go to **Products > Add Product**
5. Create three products:

   **Starter Plan**
   - Name: Starter
   - Price: $9.99/month recurring
   - Copy the Price ID (starts with `price_`)

   **Professional Plan**
   - Name: Professional
   - Price: $29.99/month recurring
   - Copy the Price ID

   **Enterprise Plan**
   - Name: Enterprise
   - Price: $99.99/month recurring
   - Copy the Price ID

6. Go to **Developers > Webhooks > Add endpoint**
   - For now, use: `http://localhost:3000/api/stripe/webhook`
   - Select these events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy the Webhook Secret (starts with `whsec_`)

## Step 5: Configure Environment Variables (5 minutes)

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in all values:
   ```env
   # From Supabase (Step 2)
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

   # From Stripe (Step 4)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   STRIPE_STARTER_PRICE_ID=price_...
   STRIPE_PROFESSIONAL_PRICE_ID=price_...
   STRIPE_ENTERPRISE_PRICE_ID=price_...

   # OpenAI (optional for now)
   OPENAI_API_KEY=sk-...

   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

## Step 6: Get OpenAI API Key (Optional, 5 minutes)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an account or sign in
3. Go to **API keys**
4. Create a new API key
5. Add it to your `.env` file

⚠️ **Note**: Without an OpenAI key, the AI features won't work. You can skip this for now and add it later.

## Step 7: Run the Application (2 minutes)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 8: Test the Application (10 minutes)

### Test User Registration:
1. Click "Sign Up"
2. Enter an email and password
3. Check your email for confirmation link
4. Click the link to verify your account

### Test Login:
1. Go to login page
2. Enter your credentials
3. You should be redirected to the dashboard

### Test AI Service:
1. In the dashboard, go to "AI Service" tab
2. Enter a prompt like "Write a short story about a robot"
3. Click "Generate"
4. You should see the AI response

### Test Payment Flow:
1. Click on "Upgrade Plan" or go to pricing section
2. Click "Get Started" on any plan
3. This will redirect to Stripe Checkout
4. Use Stripe test card: `4242 4242 4242 4242`
5. Any future date for expiry, any CVC
6. Complete the checkout
7. You should be redirected back to dashboard

## Step 9: Test Webhooks Locally (Optional, 10 minutes)

To test Stripe webhooks locally:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe  # macOS
# or download from: https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret and update your .env file
```

## Troubleshooting

### Issue: "Cannot find module" errors
**Solution**: Run `npm install` again

### Issue: Supabase connection errors
**Solution**: 
- Check your `.env` file has correct Supabase credentials
- Make sure you've run the SQL schema
- Restart the dev server

### Issue: Stripe checkout doesn't work
**Solution**:
- Verify all Stripe keys in `.env`
- Make sure you're using test mode keys
- Check that Price IDs are correct

### Issue: AI generation fails
**Solution**:
- Make sure OPENAI_API_KEY is set in `.env`
- Check your OpenAI account has credits
- Try a different AI service or model

### Issue: Email confirmation not working
**Solution**:
- Check Supabase email settings
- Make sure Site URL is set correctly in Supabase
- Check spam folder

## Next Steps

1. **Customize the branding**:
   - Update "AI Platform" name in `components/Navbar.tsx`
   - Update company name in legal documents
   - Add your logo

2. **Update legal documents**:
   - Replace `[Your Company Name]` with your business name
   - Replace `[your-email@example.com]` with your email
   - Add your business address

3. **Configure Supabase email templates**:
   - Go to Authentication > Email Templates
   - Customize confirmation and reset password emails

4. **Set up a custom domain**:
   - Buy a domain
   - Deploy to Vercel or your hosting provider
   - Update `NEXT_PUBLIC_APP_URL` in `.env`
   - Update Stripe webhook URL
   - Update Supabase Site URL

5. **Form your LLC**:
   - Register your business
   - Get an EIN
   - Open a business bank account
   - Consider business insurance

6. **Launch**:
   - Switch Stripe to live mode
   - Update all production environment variables
   - Deploy to production
   - Start marketing!

## Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review the code - it's well-commented
- Check Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Check Stripe docs: [stripe.com/docs](https://stripe.com/docs)
- Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

Good luck with your AI SaaS business! 🚀


