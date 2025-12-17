# Quick Deployment Steps

Follow these steps in order to deploy your app to production.

## ✅ Step 1: Security Audit (DONE)
- [x] Security vulnerabilities reviewed
- [x] Only dev dependency issues remaining (acceptable)
- [x] `.gitignore` properly configured
- [x] No secrets in git history

## 📝 Step 2: Prepare Environment Variables

**Action Required:** Gather these values before deploying

### Quick Checklist:
- [ ] Supabase Project URL
- [ ] Supabase Anon Key
- [ ] Supabase Service Role Key
- [ ] Stripe Production Publishable Key (`pk_live_...`)
- [ ] Stripe Production Secret Key (`sk_live_...`)
- [ ] OpenAI API Key (if using AI features)

**Generated Values:**
- ✅ `CRON_SECRET`: `646d87bba00ba9c4fba7087e4b929d892fca1ad144d5ffd9cee923d820674bf9`

**See `VERCEL_ENV_VARS_TEMPLATE.md` for detailed instructions on where to find each value.**

## 🚀 Step 3: Deploy to Vercel

1. **Go to Vercel:** https://vercel.com
2. **Sign in** with GitHub
3. **Click "Add New Project"**
4. **Import repository:** Select your GitHub repo
5. **Configure:**
   - Framework: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
6. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add each variable from `VERCEL_ENV_VARS_TEMPLATE.md`
   - Set to **Production** environment
   - **Note:** Don't add `STRIPE_WEBHOOK_SECRET` yet
7. **Deploy:**
   - Click "Deploy"
   - Wait 2-5 minutes for build
   - **Save your deployment URL** (e.g., `https://your-app.vercel.app`)

## 🔗 Step 4: Set Up Production Stripe Webhook

**After Vercel deployment is complete:**

1. **Get your Vercel URL** (from step 3)
2. **Go to Stripe Dashboard:** https://dashboard.stripe.com
3. **Switch to Live Mode** (toggle in top right)
4. **Navigate to:** Developers → Webhooks
5. **Click "Add endpoint"**
6. **Configure:**
   - Endpoint URL: `https://your-app.vercel.app/api/stripe/webhook`
   - Description: "Production webhook for subscription events"
7. **Select Events:**
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
8. **Click "Add endpoint"**
9. **Copy the Signing Secret:**
   - Click on the new webhook
   - Click "Reveal" next to "Signing secret"
   - Copy the value (starts with `whsec_`)
10. **Add to Vercel:**
    - Go back to Vercel → Project Settings → Environment Variables
    - Add: `STRIPE_WEBHOOK_SECRET` = `whsec_...` (the value you copied)
    - Set to **Production** environment
11. **Redeploy:**
    - Go to Deployments tab
    - Click "..." on latest deployment → "Redeploy"
    - Or push a new commit to trigger redeploy

## ⏰ Step 5: Verify Cron Job Setup

**In Vercel Dashboard:**

1. Go to **Project Settings** → **Cron Jobs**
2. Verify cron job is configured:
   - Path: `/api/cron/job-search`
   - Schedule: Every 3 hours (`0 */3 * * *`)
3. **Test the endpoint manually:**
   ```bash
   curl -X GET https://your-app.vercel.app/api/cron/job-search \
     -H "Authorization: Bearer 646d87bba00ba9c4fba7087e4b929d892fca1ad144d5ffd9cee923d820674bf9"
   ```
   Should return: `{"success":true,"message":"Automated job search completed",...}`

## ✅ Verification Checklist

After completing all steps:

- [ ] Vercel deployment successful
- [ ] Homepage loads at your Vercel URL
- [ ] Stripe webhook endpoint created
- [ ] `STRIPE_WEBHOOK_SECRET` added to Vercel
- [ ] Cron job visible in Vercel dashboard
- [ ] All environment variables set

## 🧪 Next: End-to-End Testing

Once deployment is complete, test the full flow:
1. Sign up for a new account
2. Complete Stripe checkout (use test card: `4242 4242 4242 4242`)
3. Verify webhook received in Stripe Dashboard
4. Check dashboard shows correct subscription
5. Test other features (job search, applications, etc.)

---

**Need Help?**
- See `VERCEL_DEPLOYMENT_GUIDE.md` for detailed instructions
- See `VERCEL_ENV_VARS_TEMPLATE.md` for environment variable details
- Check Vercel logs if deployment fails

