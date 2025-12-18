# Vercel Deployment Guide

## Step 1: Connect GitHub to Vercel

1. Go to https://vercel.com
2. Sign in with your GitHub account
3. Click **"Add New Project"**
4. Import your repository: `MattVogelsang/Clift` (or your repo name)
5. Vercel will auto-detect Next.js settings

## Step 2: Configure Project Settings

### Build Settings (Auto-detected)
- **Framework Preset:** Next.js
- **Root Directory:** `./` (default)
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)

### Environment Variables
1. Click **"Environment Variables"** in project settings
2. Add each variable from `VERCEL_ENV_VARS_TEMPLATE.md`
3. Set environment to **Production** (and **Preview** for `NEXT_PUBLIC_*` vars)
4. **Important:** Don't add `STRIPE_WEBHOOK_SECRET` yet - we'll add it after webhook setup

## Step 3: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Once deployed, you'll get a URL like: `https://your-app.vercel.app`
4. **Save this URL** - you'll need it for:
   - Stripe webhook setup
   - `NEXT_PUBLIC_APP_URL` environment variable

## Step 4: Update Environment Variables

After first deployment:

1. Go to Project Settings → Environment Variables
2. Update `NEXT_PUBLIC_APP_URL` with your actual Vercel URL
3. Click **"Redeploy"** to apply changes

## Step 5: Verify Deployment

1. Visit your Vercel URL
2. Check that homepage loads
3. Try signing up (test account)
4. Verify no console errors

## Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Verify all environment variables are set
- Ensure `package.json` has correct Node version

### Environment Variables Not Working
- Make sure variables are set for **Production** environment
- Redeploy after adding new variables
- Check variable names match exactly (case-sensitive)

### 500 Errors
- Check Vercel function logs
- Verify Supabase and Stripe keys are correct
- Ensure database schema is deployed

## Next Steps

After successful deployment:
1. Set up production Stripe webhook (see checklist)
2. Test end-to-end flow
3. Monitor for errors



