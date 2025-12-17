# Pre-Launch Checklist

## ✅ Completed
- [x] TypeScript errors fixed
- [x] ESLint warnings resolved
- [x] Tests passing
- [x] GitHub Actions CI configured
- [x] Debug logs cleaned up
- [x] Database schema deployed
- [x] Stripe webhook handler working
- [x] Subscription sync working

## 🚀 Pre-Deployment (Do These First)

### 1. Security Audit
```bash
npm audit
npm audit fix
```
- [ ] Review and fix any critical vulnerabilities
- [ ] Verify no test/development keys in production code
- [ ] Check `.gitignore` includes `.env.local`, `.env.*.local`
- [ ] Verify no secrets committed to git history

### 2. Environment Variables Preparation
Gather all values needed for Vercel:

**Supabase:**
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (keep secret!)

**Stripe (Production Keys):**
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Production publishable key
- [ ] `STRIPE_SECRET_KEY` - Production secret key
- [ ] `STRIPE_WEBHOOK_SECRET` - Will be set after webhook creation

**Application:**
- [ ] `NEXT_PUBLIC_APP_URL` - Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
- [ ] `CRON_SECRET` - Generate a secure random string for cron job auth
- [ ] `OPENAI_API_KEY` - If using AI features

### 3. Vercel Deployment
- [ ] Connect GitHub repo to Vercel
- [ ] Create new project in Vercel
- [ ] Add all environment variables (from step 2)
- [ ] Deploy to production
- [ ] Verify deployment is successful
- [ ] Test the live site loads correctly

### 4. Production Stripe Webhook Setup
**After Vercel deployment:**
1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-app.vercel.app/api/stripe/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the webhook signing secret
6. Add it to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`
7. Redeploy Vercel to pick up the new env var

### 5. Vercel Cron Job Setup
- [ ] Verify `vercel.json` has cron configuration (already done)
- [ ] In Vercel Dashboard → Settings → Cron Jobs
- [ ] Verify cron job is configured: `/api/cron/job-search` every 3 hours
- [ ] Test cron endpoint manually with `CRON_SECRET` header

## 🧪 Post-Deployment Testing

### 6. End-to-End Testing Checklist
- [ ] **Homepage loads** - Verify all sections display correctly
- [ ] **Sign up flow** - Create new account, verify email
- [ ] **Login** - Sign in with credentials
- [ ] **Dashboard** - All tabs load, stats display
- [ ] **Stripe Checkout** - Test with Stripe test card: `4242 4242 4242 4242`
- [ ] **Webhook** - Verify subscription updates after checkout
- [ ] **Subscription display** - Dashboard shows correct plan after payment
- [ ] **Stripe Portal** - "Manage subscription" button works
- [ ] **Job search** - Search functionality works
- [ ] **Application tracking** - Can add/view applications
- [ ] **AI features** - Cover letter generation, resume analysis work

### 7. Production Webhook Testing
- [ ] Complete a test checkout in production
- [ ] Check Stripe Dashboard → Webhooks → Latest events
- [ ] Verify webhook events are received (200 status)
- [ ] Check Supabase database - verify `subscription_status` and `subscription_tier` updated
- [ ] Refresh dashboard - verify plan displays correctly

## 🔒 Security & Compliance

### 8. Security Review
- [ ] All API routes have proper authentication
- [ ] RLS policies are enabled in Supabase
- [ ] No sensitive data exposed in client-side code
- [ ] Environment variables properly secured
- [ ] HTTPS enforced (Vercel does this automatically)

### 9. Legal Pages
- [ ] Privacy Policy accessible at `/legal/privacy`
- [ ] Terms of Service accessible at `/legal/terms`
- [ ] Footer links to legal pages work
- [ ] Content is accurate and up-to-date

## 📊 Monitoring & Maintenance

### 10. Monitoring Setup (Optional but Recommended)
- [ ] **Sentry** - Error tracking
  - Sign up at sentry.io
  - Install `@sentry/nextjs`
  - Configure DSN in environment variables
- [ ] **UptimeRobot** - Uptime monitoring
  - Set up monitoring for your Vercel URL
  - Configure alerts

### 11. Documentation
- [ ] Update README with production deployment steps
- [ ] Document environment variables
- [ ] Create runbook for common issues

## 🎯 Optional Improvements

### 12. Code Quality
- [ ] Review `/api/stripe/sync-subscription` endpoint
  - Currently kept as fallback for webhook failures
  - Consider adding rate limiting or additional security
- [ ] Add more comprehensive error handling
- [ ] Add request logging for production debugging

### 13. Performance
- [ ] Run Lighthouse audit
- [ ] Optimize images and assets
- [ ] Check bundle size
- [ ] Enable Vercel Analytics (optional)

## 🚨 Rollback Plan
- [ ] Document how to rollback to previous Vercel deployment
- [ ] Keep previous deployment URL as backup
- [ ] Test rollback procedure

## 📝 Notes
- The `/api/stripe/sync-subscription` endpoint is kept as a fallback mechanism
- It's authenticated (requires user session) so it's safe for production
- Consider adding rate limiting if you expect high usage

---

**Next Steps:**
1. Run `npm audit` and fix any issues
2. Deploy to Vercel
3. Set up production Stripe webhook
4. Run end-to-end tests
5. Monitor for 24-48 hours before announcing launch

