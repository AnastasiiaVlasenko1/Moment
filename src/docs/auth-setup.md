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

> **If the reset link isn't on the allow-list**, Supabase falls back to the
> **Site URL** (usually `/`). The app handles this gracefully — a recovery
> session landing anywhere in the app is detected (via the `PASSWORD_RECOVERY`
> event) and redirected to `/reset-password` so the user can still set a new
> password. Allow-listing the exact `/reset-password` URL is still preferred so
> the link lands there directly.

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

## 5. Google sign-in (OAuth) — required for the "Continue with Google" button

The login/sign-up screens show a **Continue with Google** button. Until the
Google provider is enabled, clicking it lands on a Supabase error page
(`"Unsupported provider: provider is not enabled"`). Two places to configure:

**a) Google Cloud Console** (console.cloud.google.com)
1. Create an OAuth 2.0 Client ID (type: Web application).
2. Under **Authorized redirect URIs**, add your Supabase callback:
   `https://<your-project-ref>.supabase.co/auth/v1/callback`
3. Copy the generated **Client ID** and **Client secret**.

**b) Supabase → Authentication → Providers → Google**
1. Toggle **Enable**.
2. Paste the Client ID and Client secret from step (a).
3. Save.

The app calls `signInWithOAuth({ provider: "google", redirectTo: origin })`, so
Google returns the user to the app root — make sure your app origins are on the
**Redirect URLs** allow-list (see section 1). New Google users are created
automatically; no email confirmation step is needed for OAuth.

---

That's it. No server code lives in this repo — auth is handled entirely by the
Supabase client (`src/lib/supabase.ts`) plus these dashboard settings.
