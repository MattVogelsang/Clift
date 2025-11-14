# 🔧 AI SaaS Platform Runbook ![CI Status](https://github.com/MattVogelsang/Clift/actions/workflows/ci.yml/badge.svg)

One file to go from zero → working environment. Work through each section in
order; every step links back to the detailed references if you need more depth.

---

## 1. Environment Prerequisites

| Tool | Why | Command |
| ---- | --- | ------- |
| Node 18+ & npm | Next.js dev server | `node -v`, `npm -v` |
| Stripe CLI | Webhook forwarding/testing | `brew install stripe/stripe-cli/stripe` |
| Supabase project | Auth, DB, SMTP | Create at https://supabase.com |
| Resend (or SMTP provider) | Lift Supabase's 4 emails/hr limit | https://resend.com |

Clone the repo and copy `.env.example` → `.env.local`, then fill in the values
as you work through the sections below.

---

## 2. Email Provider Setup (Resend recommended)

**Goal:** replace Supabase’s 4 emails/hour limit with your SMTP provider.

1. Create a Resend account → **API Keys** → `Create API Key` (name it “Supabase
   Integration”). Copy the `re_...` value immediately.
2. Supabase Dashboard → project → **Settings → Auth → SMTP Settings**.
3. Toggle **Enable Custom SMTP** and enter:

```
Host: smtp.resend.com
Port: 465 (or 587 if blocked)
Username: resend
Password: <your re_... API key>
Sender email: onboarding@resend.dev (change later)
Sender name: CareerLift
Minimum interval: 60
```

4. Save, then send a **test email** from Supabase Auth → Email Templates.

📎 Detailed reference: `EMAIL_SETUP_GUIDE.md`

✔️ **Verification checklist**
- [ ] Signup email arrives (http://localhost:3000/signup)
- [ ] Password reset email arrives

---

## 3. Local Dashboard & Database Check

1. Start the dev server:

```bash
npm install
npm run dev
```

2. Visit http://localhost:3000, sign in, and open `/dashboard`.
3. What to expect:
   - Quick stats cards show numbers (0 if no data yet).
   - Analytics tab renders metric cards + charts.
   - Applications tab shows table or an empty state.

🔧 Need sample data? Supabase → Table Editor → `applications` → “Insert row”.

✅ Dashboard checklist
- [ ] `/api/user/stats` returns 200 (check Network tab)
- [ ] Quick stats swap from `...` to numbers
- [ ] Analytics/Application sections render without errors

---

## 4. Stripe Webhooks & Billing

### 4.1 Local development flow

1. **Stripe login**
   ```bash
   stripe login
   ```
   If you see permission errors: `mkdir -p ~/.config/stripe && chmod 755 ~/.config/stripe`.

2. **Start listener**
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   Copy the printed `whsec_...` secret and keep this terminal running.

3. **Update `.env.local`** with the secret:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```
   Restart `npm run dev`.

4. **Trigger a test checkout**
   ```bash
   stripe trigger checkout.session.completed
   ```
   Watch the listener terminal for `[200] POST ...`.

5. **Verify Supabase**
   - Table Editor → `users`
   - `subscription_status` should be `active`
   - `stripe_customer_id` populated

### 4.2 Production deployment

1. Deploy to Vercel and note the live webhook URL:
   `https://your-domain.com/api/stripe/webhook`.
2. Stripe Dashboard → Developers → Webhooks → **Add endpoint**:
   - URL: production webhook
   - Events: `checkout.session.completed`, `customer.subscription.created`,
     `customer.subscription.updated`, `customer.subscription.deleted`.
3. Copy the **Signing secret** (`whsec_...`).
4. Vercel Project → Settings → Environment Variables:
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - Plan price IDs (`STRIPE_STARTER_PRICE_ID`, etc.)
5. Redeploy and run a test checkout or `stripe trigger` pointing to production.

📎 Detailed CLI tips & troubleshooting formerly in `STRIPE_WEBHOOK_SETUP.md`
are now included above.

✅ Billing checklist
- [ ] Stripe CLI installed & authenticated
- [ ] Listener running with correct `whsec`
- [ ] `stripe trigger checkout.session.completed` returns `[200]`
- [ ] Supabase `users` row updates on checkout/cancel
- [ ] Production endpoint registered in Stripe dashboard (post-deploy)

---

## 5. End-to-End Test Checklist

Condensed from `test-setup.md`. Run after any major change:

| Area | Steps | Pass? |
| ---- | ----- | ----- |
| **Email** | Signup & password reset emails arrive | ☐ |
| **Dashboard** | `/dashboard` loads stats, analytics, applications | ☐ |
| **Checkout** | `Get Started` → Stripe test card → redirected back | ☐ |
| **Webhook** | CLI listener shows `[200]`; Supabase updates status | ☐ |
| **Subscription lifecycle** | Cancel/change subscription in Stripe → Supabase reflects new status | ☐ |
| **Database seed** | Tables exist (`users`, `applications`, etc.) and auto-created rows appear | ☐ |

If any step fails, see the Troubleshooting appendix below.

---

## 6. Environment Variable Reference

Add these to `.env.local` (local) and Vercel (production):

| Key | Notes |
| --- | ----- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Supabase API settings |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only; keep private |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Test or live key |
| `STRIPE_SECRET_KEY` | Test or live secret key |
| `STRIPE_WEBHOOK_SECRET` | From `stripe listen` (local) or Stripe dashboard (prod) |
| `STRIPE_*_PRICE_ID` | Price IDs for starter/pro/enterprise plans |
| `NEXT_PUBLIC_APP_URL` | e.g., `http://localhost:3000` or production domain |
| `CRON_SECRET` | Only if cron endpoints are used |
| `OPENAI_API_KEY` | Optional; leave blank until AI features enabled |

---

## 7. Troubleshooting Appendix

| Problem | Fix |
| ------- | --- |
| Emails not sending | Recheck SMTP creds, use port 587, confirm Resend shows deliveries |
| Dashboard stuck on `...` | Inspect `/api/user/stats` response, confirm Supabase env vars |
| Webhook 400 errors | Ensure `STRIPE_WEBHOOK_SECRET` matches listener; restart `npm run dev` after edits |
| “Permission denied” running `stripe login` | `sudo mkdir -p ~/.config/stripe && sudo chown "$USER" ~/.config/stripe` |
| Subscription not updating | Check Stripe dashboard → Webhooks → Recent events; verify Supabase row exists |

---

## 8. What’s Next?

- Customize branding (logos, colors, copy).
- Configure a production SMTP domain (Resend domain or your own).
- Add job-board integrations / AI tooling once API keys are ready.
- Run the test checklist on every deploy.

Need more detail? Legacy docs (`EMAIL_SETUP_GUIDE.md`, `SETUP_GUIDE.md`,
`DEPLOYMENT.md`) are still available for deep dives, but this runbook should be
your first stop.

Good luck! 🚀

