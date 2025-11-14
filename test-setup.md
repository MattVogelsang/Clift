# 🧪 Quick Test Checklist

Use this to verify everything is working after setup.

## 1. Test Email Setup ✅

### Test Signup Email:
1. Go to http://localhost:3000/signup
2. Enter a test email (use a real email you can check)
3. Enter a password
4. Click "Sign Up"
5. **Check your email inbox** - you should receive a confirmation email
6. Click the confirmation link
7. ✅ If email arrives and link works, email setup is good!

### Test Password Reset:
1. Go to http://localhost:3000/forgot-password
2. Enter your email
3. Click "Send Reset Link"
4. **Check your email** - should receive reset email
5. ✅ If email arrives, password reset works!

---

## 2. Test Dashboard Data ✅

### Check Dashboard Loads:
1. Log in to your account
2. Go to Dashboard: http://localhost:3000/dashboard
3. **Check Quick Stats** (top 4 cards):
   - Should show numbers (even if 0s)
   - Should NOT show "..." forever
   - ✅ If numbers appear, dashboard is connected!

### Check Analytics Tab:
1. Click "📊 Analytics" tab
2. Should see:
   - Time range selector (7d, 30d, 90d)
   - 6 metric cards
   - Charts section
   - Top companies section
3. ✅ If page loads without errors, analytics works!

### Check Applications Tab:
1. Click "📋 Applications" tab
2. Should see:
   - Stats overview cards
   - Applications table (may be empty)
   - Recent activity section
3. ✅ If page loads, applications tracker works!

---

## 3. Test Stripe Integration ✅

### Test Checkout:
1. Go to http://localhost:3000/#pricing (or click "Upgrade Plan")
2. Click "Get Started" on any plan
3. Should redirect to Stripe Checkout
4. Use test card: `4242 4242 4242 4242`
5. Any future expiry date (e.g., 12/25)
6. Any 3-digit CVC (e.g., 123)
7. Complete checkout
8. Should redirect back to dashboard with `?success=true`
9. ✅ If redirect works, checkout is good!

### Test Webhook (Local):
1. Make sure Stripe CLI is running:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
2. Complete a test checkout (see above)
3. Check terminal - should see webhook event received
4. Go to Supabase Dashboard → Table Editor → `users` table
5. Find your user row
6. Check `subscription_status` - should be `active`
7. Check `stripe_customer_id` - should have a value (starts with `cus_...`)
8. ✅ If database updated, webhook works!

### Test Subscription Update:
1. In Stripe Dashboard, go to Customers
2. Find your test customer
3. Go to their subscription
4. Click "Cancel subscription" (or change plan)
5. Check Supabase `users` table again
6. `subscription_status` should update to `canceled` (or new status)
7. ✅ If status updates, webhook subscription handling works!

---

## 4. Test Database Connection ✅

### Check Tables Exist:
1. Go to Supabase Dashboard → Table Editor
2. Should see these tables:
   - `users`
   - `user_profiles`
   - `job_listings`
   - `applications`
   - `ai_requests`
3. ✅ If all tables exist, database is set up!

### Check Data Flow:
1. Sign up a new user
2. Check `users` table - should see new row
3. Check `user_profiles` table - should see new row (auto-created)
4. ✅ If data appears, database triggers work!

---

## 5. Common Issues & Fixes

### Issue: Dashboard shows "..." forever
**Fix:**
- Check browser console (F12) for errors
- Verify `/api/user/stats` endpoint works
- Check Supabase connection in `.env`

### Issue: Email not sending
**Fix:**
- Verify SMTP settings in Supabase
- Check Resend dashboard for errors
- Try different port (587 instead of 465)

### Issue: Webhook not working
**Fix:**
- Verify `STRIPE_WEBHOOK_SECRET` in `.env`
- Check Stripe CLI is running (for local)
- Verify webhook URL in Stripe dashboard (for production)
- Check server logs for errors

### Issue: Subscription not updating
**Fix:**
- Check webhook is receiving events (Stripe dashboard)
- Verify webhook secret matches
- Check Supabase logs for errors
- Make sure `users` table has correct structure

---

## ✅ All Tests Passed?

If everything above works, you're ready to:
1. Deploy to production
2. Start adding real job board integrations
3. Customize branding and content
4. Launch! 🚀


