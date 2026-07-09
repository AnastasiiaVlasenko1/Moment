# Forgot Password Page Element Map

Route: `/forgot-password` — request a password-reset email.

forgot-password                          — Page wrapper (centered auth screen)
├── forgot-password-card                 — Request card
│   ├── forgot-password-title            — Heading ("Reset your password")
│   ├── forgot-password-subtitle         — Supporting text
│   ├── forgot-password-form             — Email form (aria-busy while submitting)
│   │   ├── forgot-password-email        — Email input
│   │   ├── forgot-password-error        — Field error alert (on failure)
│   │   └── forgot-password-submit       — Submit button ("Send reset link")
│   └── forgot-password-back             — "Back to sign in" link
└── (sent state — after the email is dispatched)
    └── forgot-confirmation-card         — Shared CheckEmailCard ("Check your email")
        ├── forgot-confirmation-title    — Heading (receives focus on mount)
        ├── forgot-confirmation-subtitle — Instructions text
        ├── forgot-confirmation-resend   — "Resend email" button
        └── forgot-confirmation-back     — "Back to sign in" link
