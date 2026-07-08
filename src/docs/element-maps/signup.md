# Sign-up Page Element Map

Route: `/signup`. Rendered by the shared `LoginForm` in `signup` mode, so
element names mirror the login page with a `signup-` prefix.

signup                                   — Page wrapper (centered auth screen)
├── signup-card                          — Sign-up card
│   ├── signup-title                     — Heading ("Create your account")
│   ├── signup-subtitle                  — Supporting text
│   ├── signup-form                      — Email + password form (aria-busy while submitting)
│   │   ├── signup-email                 — Email input
│   │   ├── signup-password              — Password input (with show/hide toggle)
│   │   ├── signup-password-strength     — Password strength meter (4 segments + label)
│   │   ├── signup-error                 — Form-level error alert (on failure)
│   │   └── signup-submit                — Submit button ("Create account")
│   └── signup-toggle                    — Link to /login ("Sign in")
└── (confirmation state — after successful sign-up)
    └── signup-confirmation-card         — Shared CheckEmailCard ("Check your email")
        ├── signup-confirmation-title    — Heading (receives focus on mount)
        ├── signup-confirmation-subtitle — Instructions text
        ├── signup-confirmation-resend   — "Resend email" button
        └── signup-confirmation-back     — "Back to sign in" link
