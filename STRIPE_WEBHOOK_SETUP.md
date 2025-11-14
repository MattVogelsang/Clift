# 🔗 Stripe Webhook Setup - Step by Step

Follow these steps to set up Stripe webhooks for local development.

## Step 1: Login to Stripe CLI

Open your terminal and run:

```bash
stripe login
```

This will:
- Open a browser window
- Ask you to authorize the CLI
- Or give you a pairing code to enter

**If you get permission errors**, try:
```bash
mkdir -p ~/.config/stripe
chmod 755 ~/.config/stripe
stripe login
```

---

## Step 2: Forward Webhooks to Local Server

In your terminal, run:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

**What this does:**
- Listens for Stripe webhook events
- Forwards them to your local server
- Shows you all webhook events in real-time

**You'll see output like:**
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx (^C to quit)
```

**IMPORTANT:** Copy the webhook secret (starts with `whsec_...`) - you'll need it!

**Keep this terminal window open** - it needs to keep running to forward webhooks.

---

## Step 3: Add Webhook Secret to .env File

1. **Open your `.env` file** in the project root
2. **Add or update this line:**
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```
   (Replace `whsec_xxxxxxxxxxxxx` with the secret from Step 2)

3. **Save the file**

4. **Restart your dev server** (if it's running):
   - Stop it (Ctrl+C)
   - Start it again: `npm run dev`

---

## Step 4: Test the Webhook

### Option A: Test with Stripe CLI

In a **new terminal window** (keep the webhook listener running), run:

```bash
stripe trigger checkout.session.completed
```

**What to check:**
1. In the webhook listener terminal, you should see the event received
2. Check your server logs for webhook processing
3. Go to Supabase Dashboard → Table Editor → `users` table
4. Check if a user's `subscription_status` updated

### Option B: Test with Real Checkout

1. Go to http://localhost:3000/#pricing
2. Click "Get Started" on any plan
3. Complete checkout with test card: `4242 4242 4242 4242`
4. Check:
   - Webhook listener shows event received
   - Supabase `users` table shows `subscription_status: active`
   - User has `stripe_customer_id` set

---

## Troubleshooting

### "Permission denied" error?
```bash
sudo mkdir -p ~/.config/stripe
sudo chmod 755 ~/.config/stripe
stripe login
```

### Webhook not receiving events?
- Make sure the listener is still running
- Check the webhook URL is correct: `localhost:3000/api/stripe/webhook`
- Verify your dev server is running on port 3000

### Webhook secret not working?
- Make sure you copied the FULL secret (it's long)
- Check `.env` file has the correct variable name: `STRIPE_WEBHOOK_SECRET`
- Restart your dev server after updating `.env`

### Database not updating?
- Check Supabase logs for errors
- Verify the webhook endpoint is receiving events (check listener terminal)
- Check server logs for webhook processing errors

---

## For Production (After Deployment)

Once you deploy to Vercel:

1. **Get your production webhook URL:**
   - `https://yourdomain.com/api/stripe/webhook`

2. **Add webhook in Stripe Dashboard:**
   - Go to https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Click "Add endpoint"
   - Copy the **Signing secret**

3. **Add to Vercel Environment Variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `STRIPE_WEBHOOK_SECRET` = your production secret
   - Redeploy

---

## Quick Checklist

- [ ] Stripe CLI installed
- [ ] Logged in with `stripe login`
- [ ] Webhook listener running: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- [ ] Copied webhook secret (whsec_...)
- [ ] Added `STRIPE_WEBHOOK_SECRET` to `.env` file
- [ ] Restarted dev server
- [ ] Tested webhook with `stripe trigger checkout.session.completed`
- [ ] Verified database updates in Supabase

---

## Need Help?

If you're stuck:
1. Check the webhook listener terminal for errors
2. Check your server logs
3. Verify `.env` file has correct webhook secret
4. Make sure both terminals are running (listener + dev server)

Good luck! 🚀


