# Login Page Element Map

Route: `/login` (sign-in). The same `LoginForm` component also renders `/signup`
with a `signup-` prefix — see `signup.md`.

login                                   — Page wrapper (centered auth screen)
├── login-card                          — Sign-in card
│   ├── login-title                     — Heading ("Welcome back")
│   ├── login-subtitle                  — Supporting text
│   ├── auth-google-button              — "Continue with Google" OAuth button (shared with signup)
│   ├── login-oauth-divider             — "or continue with email" divider
│   ├── login-form                      — Email + password form (aria-busy while submitting)
│   │   ├── login-email                 — Email input
│   │   ├── login-forgot-link           — "Forgot password?" link → /forgot-password
│   │   ├── login-password              — Password input (with show/hide toggle)
│   │   ├── login-error                 — Form-level error alert (on failure)
│   │   └── login-submit                — Submit button ("Sign in")
│   └── login-toggle                    — Link to /signup ("Create one")
└── (confirmation state — only after a sign-up needing email confirmation)
    └── login-confirmation-card         — Shared CheckEmailCard ("Check your email")
        ├── login-confirmation-title    — Heading (receives focus on mount)
        ├── login-confirmation-subtitle — Instructions text
        ├── login-confirmation-resend   — "Resend email" button
        └── login-confirmation-back     — "Back to sign in" link
