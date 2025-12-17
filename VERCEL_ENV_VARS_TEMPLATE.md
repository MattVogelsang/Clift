# Vercel Environment Variables Template

Copy these into Vercel Dashboard → Settings → Environment Variables

## Required Variables

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Stripe (Production Keys)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_... (set after webhook creation)
```

### Application
```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
CRON_SECRET=GENERATED_BELOW
OPENAI_API_KEY=sk-... (if using AI features)
```

## How to Get These Values

### Supabase
1. Go to https://supabase.com/dashboard
2. Select your project
3. Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### Stripe
1. Go to https://dashboard.stripe.com
2. Switch to **Live mode** (toggle in top right)
3. Developers → API keys
4. Copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
5. **After deployment**: Create webhook and get `STRIPE_WEBHOOK_SECRET`

### Application
- `NEXT_PUBLIC_APP_URL`: Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
- `CRON_SECRET`: Use the generated value below
- `OPENAI_API_KEY`: From OpenAI dashboard if using AI features

## Generated CRON_SECRET
Use this secure random value for `CRON_SECRET`:

```
646d87bba00ba9c4fba7087e4b929d892fca1ad144d5ffd9cee923d820674bf9
```

**⚠️ Keep this secret!** Don't commit it to git or share it publicly.

**Important:** 
- Set all variables for **Production** environment
- Some variables (like `NEXT_PUBLIC_*`) should also be set for **Preview** if you want preview deployments to work
- `STRIPE_WEBHOOK_SECRET` will be added after step 4 (webhook setup)

