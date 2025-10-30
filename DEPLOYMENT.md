# Deployment Guide

This guide covers deploying your AI SaaS platform to production.

## Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest deployment option for Next.js applications.

### Step 1: Prepare Your Code

1. Make sure all your code is committed to Git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub:
   ```bash
   # Create a new repo on GitHub, then:
   git remote add origin https://github.com/your-username/your-repo.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables

In Vercel project settings, add all environment variables from your `.env` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PROFESSIONAL_PRICE_ID=price_...
STRIPE_ENTERPRISE_PRICE_ID=price_...
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

⚠️ **Important**: Use production/live keys, not test keys!

### Step 4: Deploy

1. Click "Deploy"
2. Wait for deployment to complete (~2 minutes)
3. Your site will be live at `https://your-project.vercel.app`

### Step 5: Configure Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Wait for DNS propagation (~24 hours max)
5. Update `NEXT_PUBLIC_APP_URL` to your custom domain

### Step 6: Update External Services

1. **Supabase**:
   - Go to Authentication > URL Configuration
   - Set Site URL to your production domain
   - Add your domain to Redirect URLs

2. **Stripe**:
   - Go to Developers > Webhooks
   - Add new endpoint: `https://your-domain.com/api/stripe/webhook`
   - Select the same events as in development
   - Copy the new webhook secret
   - Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
   - Redeploy the app

3. **OpenAI**:
   - No changes needed

## Option 2: Deploy to Netlify

### Step 1: Prepare Your Code

Same as Vercel Step 1.

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" > "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Step 3: Add Environment Variables

Go to Site settings > Environment variables and add all variables from `.env`.

### Step 4: Configure Next.js

Add `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Step 5: Deploy

Push your changes and Netlify will automatically deploy.

## Option 3: Deploy to Your Own Server

### Requirements

- Ubuntu 20.04+ or similar Linux server
- Node.js 18+
- Nginx or Apache
- SSL certificate (Let's Encrypt)

### Step 1: Set Up Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Certbot (for SSL)
sudo apt install -y certbot python3-certbot-nginx
```

### Step 2: Clone and Build

```bash
# Clone your repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install dependencies
npm install

# Create .env file with production variables
nano .env

# Build the application
npm run build
```

### Step 3: Run with PM2

```bash
# Start the application
pm2 start npm --name "ai-saas" -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

### Step 4: Configure Nginx

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/your-domain
```

Add this configuration:

```nginx
server {
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/your-domain /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Set Up SSL

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Follow the prompts to set up automatic SSL renewal.

## Post-Deployment Checklist

After deploying to any platform:

- [ ] Test user registration and email confirmation
- [ ] Test login and password reset
- [ ] Test Stripe checkout with real card
- [ ] Test Stripe webhooks (create and cancel subscription)
- [ ] Test AI generation and analysis
- [ ] Test all pages load correctly
- [ ] Check mobile responsiveness
- [ ] Verify SSL certificate is working
- [ ] Test all forms and inputs
- [ ] Check error pages (404, 500)
- [ ] Monitor application logs
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Set up error tracking (Sentry)
- [ ] Set up analytics (Google Analytics, Plausible)
- [ ] Back up database
- [ ] Document your deployment process

## Monitoring and Maintenance

### Application Monitoring

1. **Vercel Analytics** (if using Vercel):
   - Automatic performance monitoring
   - Core Web Vitals tracking

2. **Sentry** (error tracking):
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard -i nextjs
   ```

3. **Uptime Monitoring**:
   - [UptimeRobot](https://uptimerobot.com) (free)
   - [Pingdom](https://pingdom.com)

### Database Backups

Supabase automatically backs up your database daily. To create manual backups:

1. Go to Supabase Dashboard
2. Database > Backups
3. Click "Create backup"

### Log Monitoring

- **Vercel**: Check Logs tab in project dashboard
- **Custom server**: Use PM2 logs: `pm2 logs ai-saas`

### Performance Optimization

1. **Enable caching** in Vercel or your CDN
2. **Optimize images** using Next.js Image component
3. **Monitor bundle size**: `npm run build` shows bundle analysis
4. **Set up CDN** for static assets

## Scaling

As your application grows:

1. **Database**:
   - Upgrade Supabase plan for more resources
   - Add database indexes for slow queries
   - Consider connection pooling

2. **API Rate Limiting**:
   - Implement rate limiting on AI endpoints
   - Add user request quotas based on plan

3. **Caching**:
   - Add Redis for session management
   - Cache frequent AI requests
   - Use CDN for static assets

4. **Load Balancing**:
   - Add multiple server instances
   - Use load balancer (AWS ELB, Nginx)

## Troubleshooting Production Issues

### Issue: Build fails on Vercel
**Solution**:
- Check build logs for errors
- Ensure all dependencies are in package.json
- Test build locally: `npm run build`

### Issue: Environment variables not working
**Solution**:
- Verify all variables are set in platform
- Redeploy after adding variables
- Check variable names match exactly

### Issue: Stripe webhooks not working
**Solution**:
- Verify webhook URL is correct
- Check webhook secret matches
- Ensure all events are selected
- Test webhook delivery in Stripe dashboard

### Issue: Database connection errors
**Solution**:
- Check Supabase service status
- Verify connection string is correct
- Check if IP is whitelisted (if using restrictions)

### Issue: Slow page loads
**Solution**:
- Enable Vercel Analytics to identify bottlenecks
- Optimize images and assets
- Check database query performance
- Consider adding caching layer

## Cost Management

### Monthly Cost Estimates:

**Starter Scale** (0-100 users):
- Vercel: Free (Hobby plan)
- Supabase: Free tier
- Stripe: Transaction fees only (2.9% + 30¢)
- OpenAI: ~$10-50 (depends on usage)
- Domain: ~$15/year
- **Total: ~$10-50/month**

**Growth Scale** (100-1,000 users):
- Vercel: $20/month (Pro plan)
- Supabase: $25/month (Pro plan)
- Stripe: Transaction fees
- OpenAI: ~$100-500
- **Total: ~$145-545/month**

**Scale** (1,000+ users):
- Vercel: $20-300/month
- Supabase: $25-599/month
- Stripe: Transaction fees
- OpenAI: $500-5,000+
- **Total: $545-6,000+/month**

## Security Best Practices

- [ ] Use environment variables for all secrets
- [ ] Enable Vercel password protection during development
- [ ] Set up rate limiting on API routes
- [ ] Enable CORS only for your domain
- [ ] Keep dependencies updated: `npm audit`
- [ ] Monitor Stripe for suspicious activity
- [ ] Set up 2FA for all service accounts
- [ ] Regular security audits
- [ ] HTTPS only (no HTTP)
- [ ] Implement CSP headers

## Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- Supabase: [supabase.com/support](https://supabase.com/support)
- Stripe: [support.stripe.com](https://support.stripe.com)

Good luck with your deployment! 🚀


