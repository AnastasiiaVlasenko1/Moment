# Auth Setup — Supabase Dashboard

The sign-in / sign-up / password-reset UI is fully built in the app. For the
password-reset and email-confirmation emails to actually work, a few settings in
the Supabase dashboard need to match this app's routes. Everything below is
one-time configuration in **Supabase → Authentication**.

## 1. Redirect URLs (required for password reset)

The reset flow emails a link that must return the user to `/reset-password` on
this app. Supabase only allows redirects to URLs on an allow-list.

**Authentication → URL Configuration → Redirect URLs** — add:

- `http://localhost:5173/reset-password` (local dev — match your Vite port)
- `https://<your-production-domain>/reset-password`

Also set **Site URL** to your production origin (e.g. `https://app.example.com`).

> The app builds the redirect as `${window.location.origin}/reset-password`, so
> whatever origin the user is on must be on this list.

## 2. Email templates (optional but recommended)

**Authentication → Email Templates** — two templates matter:

- **Confirm signup** — sent when a new user signs up (the "Check your email"
  screen). Only sent if email confirmation is enabled (see below).
- **Reset password** — sent by the "Forgot password?" flow. The default template
  works; you can customise the copy/branding here.

## 3. Email confirmation toggle

**Authentication → Providers → Email → "Confirm email"**

- **ON** (default): new sign-ups must click a link before they can sign in. The
  app shows the "Check your email" card and offers a **Resend** button.
- **OFF**: sign-up logs the user straight in (the app then navigates to `/`).

The app handles both — no code change needed either way.

## 4. Rate limits

Supabase rate-limits reset/confirmation emails per address. The app surfaces a
friendly "Too many attempts — please wait a moment" message when this triggers
(see `auth-errors.ts`).

---

That's it. No server code lives in this repo — auth is handled entirely by the
Supabase client (`src/lib/supabase.ts`) plus these dashboard settings.
