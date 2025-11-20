# 🔗 Stripe Production Webhook Setup Guide

This guide walks you through setting up your production Stripe webhook endpoint.

---

## ✅ What You Need

- **Stripe account in Live Mode** (you have this ✅)
- **Production URL** (your deployed Vercel site, e.g., `https://yourdomain.com`)
- **Access to Stripe Dashboard**

---

## 📋 Step-by-Step Instructions

### Step 1: Get Your Production URL

1. Deploy your site to Vercel (if not already done)
2. Note your production URL:
   - Vercel default: `https://your-project.vercel.app`
   - Or your custom domain: `https://yourdomain.com`

### Step 2: Add Webhook Endpoint in Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in **Live Mode** (toggle in top right)
3. Navigate to: **Developers** → **Webhooks**
4. Click **"Add endpoint"** button
5. Enter your webhook URL:
   ```
   https://your-domain.com/api/stripe/webhook
   ```
   Replace `your-domain.com` with your actual production domain

### Step 3: Select Events

Select these events (check all of them):
- ✅ `checkout.session.completed`
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`

**Why these events?**
- `checkout.session.completed` - When a customer completes checkout
- `customer.subscription.created` - When a subscription is first created
- `customer.subscription.updated` - When subscription changes (plan upgrade/downgrade)
- `customer.subscription.deleted` - When subscription is canceled

### Step 4: Copy Webhook Signing Secret

1. After creating the endpoint, click on it
2. In the **"Signing secret"** section, click **"Reveal"**
3. Copy the secret (starts with `whsec_...`)
4. **Important**: This is different from your local `stripe listen` secret!

### Step 5: Add Secret to Vercel

1. Go to your Vercel project dashboard
2. Navigate to: **Settings** → **Environment Variables**
3. Add a new variable:
   - **Key**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: Paste the `whsec_...` secret you copied
   - **Environment**: Production (and Preview if you want)
4. Click **Save**

### Step 6: Redeploy

1. After adding the environment variable, **redeploy** your site
2. Vercel will automatically redeploy, or you can trigger a manual redeploy

### Step 7: Test the Webhook

1. In Stripe Dashboard → **Webhooks** → Click your endpoint
2. Scroll to **"Recent events"** section
3. Go to your production site and complete a test checkout
4. You should see events appear in the "Recent events" section
5. Click on an event to see if it was successful (should show `200` status)

---

## ❓ FAQ

### Do I need an "Amazon EventBridge destination"?
**No.** You only need a webhook endpoint. Destinations are for advanced AWS integrations.

### What's the difference between local and production webhooks?
- **Local**: `stripe listen` forwards events to `localhost:3000` (for development)
- **Production**: Stripe sends events directly to your live site URL (for real customers)

### Can I use the same webhook secret for local and production?
**No.** They're different:
- Local: Secret from `stripe listen` command
- Production: Secret from Stripe Dashboard webhook endpoint

### What if my webhook URL changes?
1. Update the endpoint URL in Stripe Dashboard
2. The signing secret stays the same (unless you delete and recreate the endpoint)

### How do I know if webhooks are working?
1. Check Stripe Dashboard → Webhooks → Your endpoint → Recent events
2. Look for `200` status codes (success)
3. Check your Vercel logs for any errors
4. Test by completing a checkout and verifying subscription updates in your database

---

## 🚨 Troubleshooting

### Webhook returns 400/401 errors
- ✅ Verify `STRIPE_WEBHOOK_SECRET` in Vercel matches the secret from Stripe Dashboard
- ✅ Make sure you redeployed after adding the secret
- ✅ Check that your webhook URL is correct (must be HTTPS)

### Webhook returns 500 errors
- ✅ Check Vercel function logs for errors
- ✅ Verify your database connection is working
- ✅ Make sure Supabase environment variables are set correctly

### Events not appearing
- ✅ Make sure you're in **Live Mode** in Stripe Dashboard
- ✅ Verify the webhook endpoint is active (not disabled)
- ✅ Check that events are being triggered (complete a test checkout)

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Webhook endpoint created in Stripe Dashboard
- [ ] All 4 events selected
- [ ] Webhook secret copied
- [ ] Secret added to Vercel environment variables
- [ ] Site redeployed
- [ ] Test checkout completed
- [ ] Events appear in Stripe Dashboard
- [ ] Subscription status updates in your database

---

## 📝 Quick Reference

**Webhook URL Format:**
```
https://your-domain.com/api/stripe/webhook
```

**Required Events:**
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

**Environment Variable:**
```
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

That's it! Your production webhooks are now set up. 🎉

