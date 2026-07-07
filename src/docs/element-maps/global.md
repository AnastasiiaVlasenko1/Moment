# Global Element Map

Shared chrome that appears on every page.

global-header                       — Sticky top navigation bar
├── global-nav-logo                 — App title / home link
├── global-nav-menu                 — Primary nav (Capture, Review)
└── global-nav-user                 — Signed-in user email + sign-out
    └── global-signout              — Sign-out button

auth-loading                        — Full-screen spinner while the session is verified (route guard)
data-loading                        — Full-screen spinner while moments/projects load from Supabase
data-error                          — Data-load failure screen
└── data-error-retry               — Retry button
