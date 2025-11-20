# 🚀 Pre-Launch Checklist

Complete these items before launching to the public. Items are organized by priority.

---

## 🔴 CRITICAL (Must Do Before Launch)

### 1. Production Deployment
- [ ] Deploy to Vercel (or your hosting platform)
- [ ] Configure custom domain (optional but recommended)
- [ ] Verify SSL certificate is active (HTTPS only)
- [ ] Test that site loads at production URL

### 2. Environment Variables (Production)
Add ALL of these to Vercel/your hosting platform:

**Supabase:**
- [ ] `NEXT_PUBLIC_SUPABASE_URL` (production URL)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` (production anon key)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (production service role key)

**Stripe (LIVE MODE - NOT TEST):**
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_live_...)
- [ ] `STRIPE_SECRET_KEY` (sk_live_...)
- [ ] `STRIPE_WEBHOOK_SECRET` (whsec_... from production webhook)
- [ ] `STRIPE_STARTER_PRICE_ID` (production price ID)
- [ ] `STRIPE_PROFESSIONAL_PRICE_ID` (production price ID)
- [ ] `STRIPE_ENTERPRISE_PRICE_ID` (production price ID)

**App Configuration:**
- [ ] `NEXT_PUBLIC_APP_URL` (your production domain, e.g., https://yourdomain.com)
- [ ] `CRON_SECRET` (if using cron jobs)

**Optional:**
- [ ] `OPENAI_API_KEY` (if using AI features)

⚠️ **IMPORTANT**: Use LIVE/Production keys, NOT test keys!

### 3. Stripe Production Setup
- [ ] Switch Stripe account to **Live Mode**
- [ ] Create production products/prices in Stripe Dashboard
- [ ] Set up production webhook endpoint:
  - URL: `https://your-domain.com/api/stripe/webhook`
  - Events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
- [ ] Copy production webhook secret to Vercel env vars
- [ ] Test production checkout with real card (use small amount first!)

### 4. Supabase Production Configuration
- [ ] Update Supabase Site URL to production domain
- [ ] Add production domain to Redirect URLs in Supabase Auth settings
- [ ] Verify RLS policies are enabled
- [ ] Test database connection from production

### 5. Security Checks
- [ ] All secrets are in environment variables (not hardcoded)
- [ ] No test keys/placeholders in production code
- [ ] HTTPS is enforced (no HTTP)
- [ ] Run `npm audit` and fix any critical vulnerabilities
- [ ] Verify `.env.local` is in `.gitignore` (never commit secrets!)

### 6. End-to-End Testing (Production)
Test these on your **production site**:
- [ ] User signup flow (create new account)
- [ ] Email verification (check email arrives)
- [ ] Login/logout
- [ ] Password reset (check email arrives)
- [ ] Dashboard loads correctly
- [ ] Subscription checkout (use real card, small amount)
- [ ] Webhook updates subscription status
- [ ] Subscription cancellation (via Stripe portal)
- [ ] All pages load without errors
- [ ] Mobile responsiveness (test on phone/tablet)

---

## 🟡 IMPORTANT (Should Do Before Launch)

### 7. Legal & Compliance
- [ ] Privacy Policy is accessible and up-to-date (`/legal/privacy`)
- [ ] Terms of Service is accessible and up-to-date (`/legal/terms`)
- [ ] Both linked in footer
- [ ] Review legal documents for accuracy (consider lawyer review)

### 8. Error Handling & Monitoring
- [ ] Set up error tracking (Sentry recommended - free tier available)
  ```bash
  npm install @sentry/nextjs
  npx @sentry/wizard -i nextjs
  ```
- [ ] Set up uptime monitoring (UptimeRobot - free)
- [ ] Test 404 page works
- [ ] Test 500 error handling
- [ ] Verify error logs are working

### 9. Performance & Analytics
- [ ] Enable Vercel Analytics (if using Vercel)
- [ ] Set up Google Analytics or Plausible (optional but recommended)
- [ ] Test page load speeds
- [ ] Verify images are optimized
- [ ] Check mobile performance

### 10. Database & Backups
- [ ] Verify Supabase backups are enabled (automatic on paid plans)
- [ ] Create manual backup before launch
- [ ] Test database restore process (optional but good practice)

### 11. Email Configuration
- [ ] SMTP is configured in Supabase (Resend or other provider)
- [ ] Test signup email arrives
- [ ] Test password reset email arrives
- [ ] Update sender email from `onboarding@resend.dev` to your domain (optional)
- [ ] Verify email templates look professional

---

## 🟢 NICE TO HAVE (Can Do After Launch)

### 12. Documentation
- [ ] Update README with production URL
- [ ] Document any custom configurations
- [ ] Create support/help documentation

### 13. Marketing Prep
- [ ] Prepare launch announcement
- [ ] Set up social media accounts
- [ ] Create landing page content
- [ ] Prepare customer support email

### 14. Support & Communication
- [ ] Set up support email (e.g., support@yourdomain.com)
- [ ] Add contact form or support link
- [ ] Prepare FAQ page
- [ ] Set up customer communication channels

### 15. Business Setup (If Applicable)
- [ ] Form LLC or business entity
- [ ] Set up business bank account
- [ ] Get EIN from IRS
- [ ] Set up business email

---

## 🔍 Final Pre-Launch Verification

Run through this checklist one more time:

1. **Production URL works**: ✅ Site loads at production domain
2. **All features work**: ✅ Tested signup, login, checkout, dashboard
3. **Payments work**: ✅ Tested with real card (small amount)
4. **Emails work**: ✅ Signup and password reset emails arrive
5. **Webhooks work**: ✅ Subscription status updates correctly
6. **Security**: ✅ No test keys, HTTPS enforced, secrets protected
7. **Legal**: ✅ Privacy Policy and Terms accessible
8. **Monitoring**: ✅ Error tracking and uptime monitoring set up
9. **Mobile**: ✅ Site works on mobile devices
10. **Performance**: ✅ Pages load quickly

---

## 🚨 Common Launch Mistakes to Avoid

- ❌ **Don't use test Stripe keys in production** - You won't get paid!
- ❌ **Don't forget to switch Stripe to Live Mode**
- ❌ **Don't commit `.env` files to Git** - Check `.gitignore`
- ❌ **Don't skip testing checkout** - Test with real card first
- ❌ **Don't forget production webhook** - Local webhook won't work in production
- ❌ **Don't launch without monitoring** - You need to know if things break

---

## ✅ Ready to Launch?

Once all **CRITICAL** items are checked, you're ready to launch! 

**Launch Day Checklist:**
1. Final production test (run through all features)
2. Announce launch! 🎉
3. Monitor closely for first 24 hours
4. Be ready to fix issues quickly
5. Celebrate! 🚀

---

## 📞 Need Help?

- **Deployment Issues**: See `DEPLOYMENT.md`
- **Setup Issues**: See `SETUP_GUIDE.md` or `RUNBOOK.md`
- **Stripe Issues**: Check Stripe Dashboard → Webhooks → Recent events
- **Supabase Issues**: Check Supabase Dashboard → Logs

Good luck with your launch! 🚀

