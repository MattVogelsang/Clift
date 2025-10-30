# 🤖 Job Automation Implementation Guide

## Overview

CareerLift now includes the complete automation backend that powers job searching and auto-applying. Here's how it all works together.

## 🏗️ Architecture

### Core Components

1. **Job Scraper** (`lib/job-scraper.ts`)
   - Searches multiple job boards
   - Calculates match scores
   - Returns relevant job listings

2. **Auto-Apply Engine** (`lib/auto-apply.ts`)
   - Submits applications automatically
   - Generates personalized cover letters
   - Handles different job board formats

3. **Cron Service** (`lib/cron-job-search.ts`)
   - Runs automated job search for all users
   - Respects subscription limits
   - Applies to high-match jobs

4. **API Routes**
   - `/api/jobs/search` - Manual job search
   - `/api/jobs/apply` - Manual application
   - `/api/cron/job-search` - Automated cron trigger

## 📊 Database Schema

### New Tables:

**user_profiles**
- Stores resume, skills, job preferences
- Links to auth.users

**job_listings**
- Scraped jobs with match scores
- Tracks if already applied

**applications**
- All submitted applications
- Status tracking (applied, viewed, response, offer, rejected)
- Cover letter storage

## 🔄 Automation Flow

### How It Works (Every 3 Hours):

1. **Cron Triggers** → `/api/cron/job-search`
2. **Get Active Users** → Query users with active subscriptions
3. **For Each User:**
   - Get their job preferences
   - Search job boards (Indeed, LinkedIn, etc.)
   - Calculate match scores
   - Filter jobs with 85%+ match
   - Check application limit for month
   - Auto-apply to top matches
   - Generate personalized cover letter
   - Record in database
   - Wait 10 seconds between applications (to seem human)

### Subscription Limits:
- **Basic** ($29.99): 50 applications/month
- **Professional** ($79.99): 150 applications/month
- **Premium** ($129.99): Unlimited applications

## 🚀 Setting Up Automation

### Step 1: Configure Cron Service

#### Option A: Vercel Cron (Easiest)
Already configured in `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/job-search",
    "schedule": "0 */3 * * *"
  }]
}
```

Runs every 3 hours automatically on Vercel Pro plan.

#### Option B: External Cron Service (Free)

Use [cron-job.org](https://cron-job.org):
1. Create account
2. Add new cron job
3. URL: `https://your-domain.com/api/cron/job-search`
4. Schedule: Every 3 hours
5. Add header: `Authorization: Bearer your-cron-secret`

#### Option C: GitHub Actions

Create `.github/workflows/cron.yml`:
```yaml
name: Automated Job Search
on:
  schedule:
    - cron: '0 */3 * * *'  # Every 3 hours
jobs:
  job-search:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger job search
        run: |
          curl -X GET https://your-domain.com/api/cron/job-search \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

### Step 2: Add Cron Secret

Add to `.env`:
```
CRON_SECRET=your-secure-random-string-here
```

Generate secure secret:
```bash
openssl rand -base64 32
```

### Step 3: Implement Job Board Integrations

Currently uses placeholder data. To make it functional:

#### For Indeed:
```typescript
// Install: npm install indeed-scraper
import Indeed from 'indeed-scraper'

const jobs = await Indeed.query({
  query: criteria.jobTitle,
  location: criteria.location,
  maxAge: '7',
})
```

#### For LinkedIn:
```typescript
// Install: npm install puppeteer
import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto(`https://www.linkedin.com/jobs/search/?keywords=${criteria.jobTitle}`)
// ... scrape job listings
```

#### Using Job APIs:
- **RapidAPI Job Search APIs**
- **SerpAPI** (Google Jobs)
- **Adzuna API**
- **The Muse API**

### Step 4: Implement Auto-Apply

Current `lib/auto-apply.ts` has placeholders. To implement:

```typescript
import puppeteer from 'puppeteer'

async function applyLinkedIn(job, userApp) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  
  // Login to LinkedIn
  await page.goto('https://www.linkedin.com/login')
  await page.type('#username', process.env.LINKEDIN_EMAIL)
  await page.type('#password', process.env.LINKEDIN_PASSWORD)
  await page.click('[type="submit"]')
  
  // Go to job
  await page.goto(job.url)
  
  // Click Easy Apply
  await page.click('.jobs-apply-button')
  
  // Fill form
  // ... handle multi-step application
  
  await browser.close()
  return { success: true }
}
```

## 📦 Required Dependencies

Add these for full automation:

```bash
npm install puppeteer        # Browser automation
npm install indeed-scraper   # Indeed job search
npm install @supabase/supabase-js  # Already installed
npm install openai          # AI cover letters
```

## ⚠️ Important Considerations

### Legal & Ethical:
- ✅ Check job board Terms of Service
- ✅ Rate limit requests (don't spam)
- ✅ Use delays between actions
- ✅ Respect robots.txt
- ✅ User is responsible for applications

### Technical:
- Use headless browser for scraping
- Implement retry logic for failed applications
- Handle CAPTCHA (may need solving service)
- Monitor for job board changes
- Log all activities

### Scalability:
- Use job queues (BullMQ, etc.)
- Implement rate limiting
- Cache job listings
- Use multiple IP addresses if needed

## 🎯 Testing

### Test Manual Job Search:
```bash
curl -X POST http://localhost:3000/api/jobs/search \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-uuid",
    "criteria": {
      "jobTitle": "Software Engineer",
      "location": "San Francisco",
      "remote": true
    }
  }'
```

### Test Cron Job:
```bash
curl -X GET http://localhost:3000/api/cron/job-search \
  -H "Authorization: Bearer your-cron-secret"
```

## 📈 Monitoring

Track these metrics:
- Jobs scraped per hour
- Application success rate
- API errors and failures
- User response rates
- System performance

## 🔐 Security

- Store LinkedIn/job board credentials securely
- Use environment variables for all secrets
- Implement rate limiting on API routes
- Validate all user inputs
- Encrypt sensitive data

## 🚀 Next Steps

1. Choose job board integration method (API vs scraping)
2. Set up Puppeteer for automation
3. Implement one job board at a time
4. Test thoroughly before automating
5. Monitor results and iterate

## 💡 Alternative Approaches

### Use Existing Job APIs:
- **RapidAPI** - Multiple job search APIs
- **Adzuna** - Free job search API
- **The Muse** - Tech-focused jobs
- **GitHub Jobs** - Developer positions

### No-Code Automation:
- **Zapier** - Connect job boards to your app
- **Make.com** - Automation workflows
- **n8n** - Self-hosted automation

### Hire Contractors:
- Upwork/Fiverr developers
- Specialize in web scraping
- Can build custom scrapers for each job board

---

**Current Status**: Backend logic is ready, just needs job board integrations plugged in!


