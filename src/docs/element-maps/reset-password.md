# Reset Password Page Element Map

Route: `/reset-password` — set a new password, reached from the emailed link.
Renders one of two states depending on whether a valid recovery session exists.

reset-password                              — Page wrapper (centered auth screen)
└── reset-password-card                     — Card (shared shell for both states)
    │
    ├── (valid recovery session — the form)
    │   ├── reset-password-title            — Heading ("Set a new password")
    │   ├── reset-password-subtitle         — Supporting text
    │   ├── reset-password-form             — New-password form (aria-busy while submitting)
    │   │   ├── reset-password-input        — New password input (show/hide toggle)
    │   │   ├── reset-password-strength     — Password strength meter
    │   │   ├── reset-password-confirm      — Confirm password input (show/hide toggle)
    │   │   ├── reset-password-error        — Error alert (mismatch / too short / failure)
    │   │   └── reset-password-submit       — Submit button ("Update password")
    │
    └── (missing/expired link — recovery prompt)
        ├── reset-password-invalid-title    — Heading ("Link expired")
        ├── reset-password-invalid-subtitle — Explanation text
        └── reset-password-request-again    — "Request a new link" → /forgot-password
