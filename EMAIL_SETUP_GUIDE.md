# 📧 Email Provider Setup Guide

## Why You Need This

Supabase free tier has a **4 emails/hour limit**. This means:
- ❌ Only 4 users can sign up per hour
- ❌ Only 4 password resets per hour
- ❌ Blocks production usage

## Solution: Custom SMTP Provider

Connect a custom email provider to Supabase to remove this limit.

---

## Option 1: Resend (Recommended) ⭐

**Best for:** Easy setup, good free tier, modern API

### Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up (free tier: 3,000 emails/month)
3. Verify your email

### Step 2: Get API Key

1. Go to **API Keys** in Resend dashboard
2. Click **Create API Key**
3. Name it: "Supabase Integration"
4. Copy the API key (starts with `re_...`)

### Step 3: Add Domain (Recommended)

1. Go to **Domains** in Resend
2. Click **Add Domain**
3. Add your domain (e.g., `careerlift.ai`)
4. Follow DNS setup instructions (add TXT records)
5. Wait for verification (~5-10 minutes)

**Note:** You can use Resend's test domain for development, but production should use your own domain.

### Step 4: Configure Supabase

1. Go to **Supabase Dashboard** → Your Project
2. Go to **Settings** → **Auth** → **SMTP Settings**
3. Enable **"Enable Custom SMTP"**
4. Fill in the SMTP settings:

**For Resend:**
- **Host:** `smtp.resend.com`
- **Port:** `465` (or `587` for TLS)
- **Username:** `resend`
- **Password:** Your Resend API key (`re_...`)
- **Sender email:** `noreply@yourdomain.com` (or use your verified domain)
- **Sender name:** `CareerLift`

5. Click **"Save"**

### Step 5: Test Email

1. In Supabase: **Settings** → **Auth** → **Email Templates**
2. Try sending a test email
3. Check if it arrives

---

## Option 2: SendGrid

**Best for:** High volume, enterprise features

### Step 1: Create SendGrid Account

1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up (free tier: 100 emails/day)
3. Verify your email

### Step 2: Create API Key

1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Name it: "Supabase Integration"
4. Give it **"Mail Send"** permissions
5. Copy the API key (starts with `SG....`)

### Step 3: Add Domain (Optional but Recommended)

1. Go to **Settings** → **Sender Authentication**
2. Authenticate your domain
3. Follow DNS setup instructions

### Step 4: Configure Supabase

1. Go to **Supabase Dashboard** → **Settings** → **Auth** → **SMTP Settings**
2. Enable **"Enable Custom SMTP"**
3. Fill in:

**For SendGrid:**
- **Host:** `smtp.sendgrid.net`
- **Port:** `587`
- **Username:** `apikey` (literally the word "apikey")
- **Password:** Your SendGrid API key (`SG....`)
- **Sender email:** `noreply@yourdomain.com`
- **Sender name:** `CareerLift`

4. Click **"Save"**

---

## Option 3: Mailgun

**Best for:** Developers, flexible pricing

### Step 1: Create Mailgun Account

1. Go to [mailgun.com](https://mailgun.com)
2. Sign up (free tier: 5,000 emails/month)
3. Verify your email

### Step 2: Add Domain

1. Go to **Sending** → **Domains**
2. Add your domain
3. Follow DNS setup

### Step 3: Get SMTP Credentials

1. Go to **Sending** → **Domain Settings**
2. Click on your domain
3. Go to **SMTP credentials**
4. Use provided SMTP username and password

### Step 4: Configure Supabase

1. Go to **Supabase Dashboard** → **Settings** → **Auth** → **SMTP Settings**
2. Enable **"Enable Custom SMTP"**
3. Fill in:

**For Mailgun:**
- **Host:** `smtp.mailgun.org`
- **Port:** `587`
- **Username:** Your Mailgun SMTP username
- **Password:** Your Mailgun SMTP password
- **Sender email:** `noreply@yourdomain.com`
- **Sender name:** `CareerLift`

4. Click **"Save"**

---

## Quick Comparison

| Provider | Free Tier | Setup Difficulty | Best For |
|----------|-----------|------------------|----------|
| **Resend** | 3,000/month | ⭐ Easy | Most users |
| **SendGrid** | 100/day | ⭐⭐ Medium | High volume |
| **Mailgun** | 5,000/month | ⭐⭐ Medium | Developers |

---

## After Setup

1. ✅ **Test signup** - Try creating a new account
2. ✅ **Test password reset** - Try forgot password flow
3. ✅ **Monitor emails** - Check provider dashboard for delivery
4. ✅ **Set up email templates** - Customize Supabase email templates

---

## Troubleshooting

### Emails not sending?
- Check SMTP credentials are correct
- Verify domain is authenticated (if using custom domain)
- Check spam folder
- Review provider's dashboard for errors

### Domain verification failed?
- Make sure DNS records are correct
- Wait 10-15 minutes after adding DNS records
- Check DNS propagation with `dig` or online tools

### Still hitting limits?
- Make sure custom SMTP is enabled in Supabase
- Check Supabase logs for email errors
- Verify SMTP settings are saved

---

## Recommended: Start with Resend

Resend is the easiest to set up and has a generous free tier. Perfect for getting started!


