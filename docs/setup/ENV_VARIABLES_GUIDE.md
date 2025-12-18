# Environment Variables Guide

## Where to Get Each Environment Variable

### 1. Supabase Variables

**NEXT_PUBLIC_SUPABASE_URL** and **NEXT_PUBLIC_SUPABASE_ANON_KEY**

1. Go to https://supabase.com/dashboard
2. Sign in to your account
3. Select your project (or create a new one)
4. Go to **Settings** → **API**
5. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
     - Example: `https://xxxxx.supabase.co`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - This is the long JWT token under "Project API keys"

**SUPABASE_SERVICE_ROLE_KEY**

1. Same page: **Settings** → **API**
2. Copy the **service_role secret** key
   - ⚠️ **Keep this secret!** Never expose it in client-side code
   - Only use it in server-side API routes

---

### 2. Stripe Variables

**NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY** and **STRIPE_SECRET_KEY**

**For Testing (Development):**
1. Go to https://dashboard.stripe.com/test/apikeys
2. Make sure you're in **Test mode** (toggle in top right)
3. Copy:
   - **Publishable key** (starts with `pk_test_...`) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** (starts with `sk_test_...`) → `STRIPE_SECRET_KEY`
   - Click "Reveal test key" to see the secret key

**For Production:**
1. Go to https://dashboard.stripe.com/apikeys
2. Make sure you're in **Live mode** (toggle in top right)
3. Copy:
   - **Publishable key** (starts with `pk_live_...`) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** (starts with `sk_live_...`) → `STRIPE_SECRET_KEY`
   - Click "Reveal live key" to see the secret key

**STRIPE_WEBHOOK_SECRET**

1. Go to https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"** (or edit existing)
3. Set endpoint URL: `https://your-app.vercel.app/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click **"Add endpoint"**
6. Click on the webhook you just created
7. Click **"Reveal"** next to "Signing secret"
8. Copy the value (starts with `whsec_...`) → `STRIPE_WEBHOOK_SECRET`

---

### 3. Application Variables

**NEXT_PUBLIC_APP_URL**

- **For local development:** `http://localhost:3000`
- **For production:** Your Vercel deployment URL
  - Example: `https://your-app.vercel.app`
  - Get this after deploying to Vercel

**CRON_SECRET**

- This is a secure random string you generate yourself
- Use this value: `646d87bba00ba9c4fba7087e4b929d892fca1ad144d5ffd9cee923d820674bf9`
- Or generate your own:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

**OPENAI_API_KEY**

1. Go to https://platform.openai.com/api-keys
2. Sign in to your OpenAI account
3. Click **"Create new secret key"**
4. Give it a name (e.g., "CareerLift App")
5. Copy the key (starts with `sk-...`)
   - ⚠️ You can only see it once! Save it immediately
6. Paste it as `OPENAI_API_KEY=sk-...`

**Note:** If you're not using AI features, you can leave this as a placeholder or omit it.

---

### 4. Optional Stripe Price IDs

If you want to use custom Stripe price IDs (instead of the defaults):

**STRIPE_STARTER_PRICE_ID**, **STRIPE_PROFESSIONAL_PRICE_ID**, **STRIPE_ENTERPRISE_PRICE_ID**

1. Go to https://dashboard.stripe.com/products
2. Create products/prices in Stripe
3. Copy the Price ID (starts with `price_...`)
4. Add to `.env.local`:
   - `STRIPE_STARTER_PRICE_ID=price_xxxxx`
   - `STRIPE_PROFESSIONAL_PRICE_ID=price_xxxxx`
   - `STRIPE_ENTERPRISE_PRICE_ID=price_xxxxx`

---

## Quick Checklist

- [ ] Supabase Project URL
- [ ] Supabase Anon Key
- [ ] Supabase Service Role Key
- [ ] Stripe Publishable Key (test or live)
- [ ] Stripe Secret Key (test or live)
- [ ] Stripe Webhook Secret (after webhook setup)
- [ ] App URL (localhost for dev, Vercel URL for prod)
- [ ] CRON Secret (use generated value)
- [ ] OpenAI API Key (optional, if using AI features)

---

## Example .env.local File

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe (Test Mode for Development)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
CRON_SECRET=646d87bba00ba9c4fba7087e4b929d892fca1ad144d5ffd9cee923d820674bf9

# OpenAI (Optional)
OPENAI_API_KEY=sk-xxxxx
```

---

## Important Notes

1. **Never commit `.env.local` to git** - it's already in `.gitignore`
2. **Restart your dev server** after updating environment variables
3. **Use test keys** for local development, **live keys** for production
4. **Keep secrets secure** - especially `SUPABASE_SERVICE_ROLE_KEY` and `STRIPE_SECRET_KEY`



