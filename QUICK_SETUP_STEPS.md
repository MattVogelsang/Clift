# 🚀 Quick Setup Steps - Step by Step Guide

Follow these steps to complete your setup:

---

## Step 1: Set Up Email Provider (Resend - Recommended) ⭐

### Why This Matters
Without this, only 4 users can sign up per hour. This fixes that.

### Quick Steps:

1. **Create Resend Account** (2 minutes)
   - Go to https://resend.com
   - Click "Sign Up"
   - Use your email and create a password
   - Verify your email address

2. **Get API Key** (1 minute)
   - Once logged in, go to **API Keys** in the left sidebar
   - Click **"Create API Key"** button
   - Name it: `Supabase Integration`
   - Click **"Create"**
   - **IMPORTANT:** Copy the API key immediately (starts with `re_...`)
   - Save it somewhere safe - you won't see it again!

3. **Configure Supabase** (3 minutes)
   - Open your Supabase Dashboard: https://supabase.com/dashboard
   - Select your project
   - Go to **Settings** (gear icon in left sidebar)
   - Click **Auth** in the settings menu
   - Scroll down to **SMTP Settings**
   - Toggle **"Enable Custom SMTP"** to ON
   - Fill in these fields:
     ```
     Host: smtp.resend.com
     Port: 465
     Username: resend
     Password: [paste your Resend API key here - the re_... one]
     Sender email: onboarding@resend.dev (for testing - you can change this later)
     Sender name: CareerLift
     ```
   - Click **"Save"** at the bottom

4. **Test It** (2 minutes)
   - In Supabase, go to **Authentication** → **Email Templates**
   - Click **"Send test email"** or try signing up a new account
   - Check your email inbox
   - ✅ If email arrives, you're done!

**Total Time: ~8 minutes**

---

## Step 2: Test Your Dashboard

### Check if Dashboard Shows Real Data:

1. **Start your dev server** (if not running):
   ```bash
   npm run dev
   ```

2. **Open your dashboard**:
   - Go to http://localhost:3000
   - Log in to your account
   - Navigate to Dashboard

3. **What you should see**:
   - Quick stats cards at the top (will show 0s if no applications yet)
   - Analytics tab with real-time data
   - Applications tab with your applications

4. **Test with sample data** (optional):
   - If you want to see data, you can manually add test applications in Supabase:
     - Go to Supabase Dashboard → Table Editor
     - Open `applications` table
     - Click "Insert row" and add a test application

---

## Step 3: Verify Stripe Webhooks

### For Local Development:

1. **Install Stripe CLI** (if not already):
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Or download from: https://stripe.com/docs/stripe-cli
   ```

2. **Login to Stripe CLI**:
   ```bash
   stripe login
   ```
   - This will open a browser to authenticate

3. **Forward webhooks to local server**:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   - This will output a webhook signing secret (starts with `whsec_...`)
   - **Copy this secret!**

4. **Update your .env file**:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_... [paste the secret here]
   ```

5. **Test the webhook**:
   - In another terminal, trigger a test event:
     ```bash
     stripe trigger checkout.session.completed
     ```
   - Check your terminal - you should see the webhook received
   - Check Supabase → Table Editor → `users` table
   - The user's `subscription_status` should update to `active`

### For Production (Vercel):

1. **Get your production webhook URL**:
   - Deploy to Vercel first
   - Your webhook URL will be: `https://yourdomain.com/api/stripe/webhook`

2. **Configure in Stripe Dashboard**:
   - Go to https://dashboard.stripe.com/webhooks
   - Click **"Add endpoint"**
   - Paste your webhook URL
   - Select these events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Click **"Add endpoint"**
   - Copy the **Signing secret** (starts with `whsec_...`)

3. **Add to Vercel Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `STRIPE_WEBHOOK_SECRET` = `whsec_...` (your secret)
   - Redeploy your app

4. **Test in production**:
   - Complete a test checkout
   - Check Stripe Dashboard → Webhooks → Your endpoint → Recent events
   - Should show successful deliveries
   - Check Supabase to verify user subscription updated

---

## Step 4: Verify Everything Works

### Checklist:

- [ ] Email setup complete - can receive signup emails
- [ ] Dashboard loads without errors
- [ ] Dashboard shows real data (or 0s if no data yet)
- [ ] Stripe checkout works
- [ ] Webhook updates user subscription in database
- [ ] Can upgrade/downgrade plans
- [ ] Subscription status shows correctly in dashboard

---

## Troubleshooting

### Email Issues:
- **Emails not sending?**
  - Double-check SMTP settings in Supabase
  - Verify API key is correct (starts with `re_...`)
  - Check Resend dashboard for errors
  - Try using `587` port instead of `465`

### Dashboard Issues:
- **Showing 0s everywhere?**
  - This is normal if you haven't created applications yet
  - The dashboard will update automatically when you add applications
  - Check browser console for errors (F12)

### Stripe Webhook Issues:
- **Webhook not receiving events?**
  - Verify `STRIPE_WEBHOOK_SECRET` is set in `.env`
  - Check webhook URL is correct in Stripe dashboard
  - Look at Stripe Dashboard → Webhooks → Recent events for errors
  - Check server logs for webhook processing errors

### Database Issues:
- **Can't see user data?**
  - Make sure you ran `supabase/schema.sql` in Supabase SQL Editor
  - Check Row Level Security (RLS) policies are enabled
  - Verify you're logged in with the correct account

---

## Next Steps After Setup:

1. **Customize branding** - Update company name, logo, colors
2. **Set up custom domain** - For production email sending
3. **Add job board integrations** - Connect real job APIs
4. **Test end-to-end flow** - Sign up → Apply → Track
5. **Deploy to production** - Push to Vercel

---

## Need Help?

- **Email Setup**: See `EMAIL_SETUP_GUIDE.md` for detailed instructions
- **Stripe Setup**: See `SETUP_GUIDE.md` Step 4
- **Database Setup**: See `SETUP_GUIDE.md` Step 3
- **Deployment**: See `DEPLOYMENT.md`

Good luck! 🚀


