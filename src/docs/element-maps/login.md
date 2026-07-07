# Login Page Element Map

login                                   — Page wrapper (centered auth screen)
└── login-card                          — Sign-in / sign-up card (also the "check your email" state)
    ├── login-title                     — Heading ("Welcome back" / "Create your account")
    ├── login-subtitle                  — Supporting text under the heading
    ├── login-form                      — Email + password form
    │   ├── login-email                 — Email input
    │   ├── login-password              — Password input
    │   ├── login-error                 — Inline error message (on failure)
    │   └── login-submit                — Submit button (Sign in / Create account)
    ├── login-toggle                    — Switch between sign-in and sign-up
    ├── login-confirmation-title        — "Check your email" heading (post sign-up)
    └── login-confirmation-subtitle     — Confirmation instructions text
