# Source Layout

> **⚠️ Living document.** This tree must reflect the actual project structure at all times. When you create, rename, move, or delete files or directories, update this tree accordingly. Add a brief `# comment` for new entries to describe their purpose.

```
src/
├── pages/
│   ├── Capture.tsx        # Route "/" — five-day week view for logging moments (auth-guarded)
│   ├── Review.tsx         # Route "/review" — month-end assembled review (auth-guarded)
│   ├── Login.tsx          # Route "/login" — sign-in (renders LoginForm mode=signin)
│   ├── Signup.tsx         # Route "/signup" — sign-up (renders LoginForm mode=signup)
│   ├── ForgotPassword.tsx # Route "/forgot-password" — request a reset email
│   ├── ResetPassword.tsx  # Route "/reset-password" — set a new password (from email link)
│   └── NotFound.tsx       # 404 catch-all page
├── components/
│   ├── ui/                # shadcn/ui primitives (DO NOT manually edit — managed by npx shadcn)
│   ├── auth/              # Authentication (Supabase email+password)
│   │   ├── AuthProvider.tsx         # Tracks session; sign in/up/out + Google OAuth + reset/update password (wraps app in main.tsx)
│   │   ├── RequireAuth.tsx          # Route guard — redirects to /login when signed out
│   │   ├── AuthScreen.tsx           # Shared centered layout + redirect-if-authed wrapper
│   │   ├── LoginForm.tsx            # Sign-in / sign-up card UI (mode driven by route)
│   │   ├── use-login-form.ts        # Login/sign-up form state + submit logic
│   │   ├── ForgotPasswordForm.tsx   # "Request a reset email" card UI
│   │   ├── use-forgot-password-form.ts  # Forgot-password form state + submit logic
│   │   ├── ResetPasswordForm.tsx    # "Set a new password" card UI (from email link)
│   │   ├── use-reset-password-form.ts   # Reset-password form state + validation + submit
│   │   ├── GoogleButton.tsx         # "Continue with Google" OAuth button (shared by login/signup)
│   │   ├── GoogleIcon.tsx           # Inline multicolor Google "G" brand SVG
│   │   ├── PasswordInput.tsx        # Password <Input> with built-in show/hide toggle
│   │   ├── PasswordStrengthMeter.tsx    # Four-segment password strength bar
│   │   ├── password-strength.ts     # PASSWORD_MIN_LENGTH + scorePassword() heuristic
│   │   ├── CheckEmailCard.tsx       # Shared "check your email" confirmation (focus + resend)
│   │   └── auth-errors.ts           # friendlyAuthError() — maps Supabase errors to friendly copy
│   ├── data/               # Backend data loading
│   │   └── DataProvider.tsx    # Loads moments/projects from Supabase on login (spinner/retry)
│   ├── global/
│   │   ├── AppHeader.tsx    # Site-wide header + primary nav + user email / sign-out
│   │   └── MomentsLogo.tsx  # Brand logo: MomentsMark (Bloom app icon) + MomentsLogo lockup (mark + Caveat wordmark)
│   ├── shared/
│   │   └── MomentTags.tsx # CategoryChip + ProjectChip (used by capture & review)
│   ├── capture/           # Capture feature (week view + block picker)
│   │   ├── WeekView.tsx           # Composed: header + day columns + composer
│   │   ├── WeekHeader.tsx         # Week nav (prev/next/today) + weekend toggle
│   │   ├── DayColumn.tsx          # One day column with its moment cards
│   │   ├── MomentCard.tsx         # A single logged moment, diary-entry style (band + ruled note + attachment)
│   │   ├── MomentCardActions.tsx  # Edit/delete controls for a moment card (hover-revealed)
│   │   ├── CaptureBar.tsx         # Floating "+" content-type block picker
│   │   ├── MomentComposer.tsx     # Compose panel (right fly-out sheet): fields + save
│   │   ├── ScreenshotInput.tsx    # Paste/upload image zone with preview
│   │   ├── CategoryPicker.tsx     # Five colored category chips
│   │   ├── ProjectPicker.tsx      # Searchable project selector + create + "Manage projects"
│   │   ├── ProjectManager.tsx     # Project CRUD dialog (add / list) 
│   │   ├── ProjectManagerRow.tsx  # One editable project row (recolor / rename / delete)
│   │   ├── useWeekNavigation.ts   # Week anchor state + prev/next/today/weekends
│   │   ├── useMomentComposer.ts   # Compose form state (seeded once per session)
│   │   └── useMomentImage.ts      # Loads a screenshot signed URL from Supabase Storage
│   └── review/            # Month-end review assembly
│       ├── ReviewBuilder.tsx      # Composed: month picker + all sections
│       ├── MonthPicker.tsx        # Prev/next month + "This month"
│       ├── AiSummarySection.tsx   # On-demand AI prose summary (calls summarize-review edge fn)
│       ├── useReviewSummary.ts    # AI summary state (idle/loading/done/error + generate)
│       ├── WorkloadOverview.tsx   # Stat tiles + category distribution chart
│       ├── ProjectHighlights.tsx  # Per-project grouped highlights (copyable)
│       ├── LearningSection.tsx    # "What I learned" (copyable)
│       ├── MoodSection.tsx        # Mood distribution + timeline (copyable)
│       ├── ScreenshotGallery.tsx  # Screenshots grouped by project + download
│       ├── GalleryImage.tsx       # A single screenshot tile with download
│       ├── CopyableSection.tsx    # Section card wrapper with Copy button
│       ├── MomentList.tsx         # Deck-oriented bulleted moment list
│       └── useReviewAssembly.ts   # Selects a month + assembles the review model
├── data/
│   └── categories.ts      # CATEGORY_CONFIG, MOOD_PRESETS, DEFAULT_PROJECTS, color cycle
├── types/
│   └── review.ts          # Domain types: Moment, Project, Category
├── docs/
│   ├── source-layout/     # Project file structure docs
│   │   └── index.md        # Full annotated file tree (this file)
│   ├── components/         # Usage reference docs for each shadcn/ui component (.md files)
│   └── element-maps/       # Element map files — one per page
│       ├── index.md            # Index of all element maps with routes
│       ├── global.md           # Shared header/nav element map
│       ├── login.md            # Login (/login) element map
│       ├── signup.md           # Sign-up (/signup) element map
│       ├── forgot-password.md  # Forgot-password (/forgot-password) element map
│       ├── reset-password.md   # Reset-password (/reset-password) element map
│       ├── capture.md          # Capture page element map
│       ├── review.md           # Review page element map
│       └── not-found.md        # 404 page element map
├── store/
│   ├── index.ts           # Redux store: moments + projects slices + Supabase sync middleware
│   ├── sync-middleware.ts # Mirrors each mutation to Supabase (optimistic; toast on failure)
│   ├── momentsSlice.ts    # Moments slice (setMoments/add/update/move/delete)
│   ├── projectsSlice.ts   # Projects slice (setProjects/add/update/remove; starts empty)
│   └── hooks.ts           # Typed hooks: useAppDispatch(), useAppSelector()
├── assets/
│   └── fonts/
│       ├── InterVariable.woff2         # Inter variable font (weight 100–900, normal) — body text
│       ├── InterVariable-Italic.woff2  # Inter variable font (weight 100–900, italic)
│       ├── Caveat.woff2                # Caveat handwritten font (latin) — headings/dates accent
│       └── Caveat-Latin-Ext.woff2      # Caveat handwritten font (latin-ext subset)
├── styles/
│   ├── index.css          # Main stylesheet entry — imports Tailwind, shadcn, fonts, theme
│   ├── theme.css          # CSS theme tokens (light/dark), @theme inline config, base typography
│   └── fonts.css          # @font-face declarations for Inter + Caveat + base font settings
├── hooks/
│   ├── use-debounce.ts    # useDebouncedValue<T>() — generic debounce hook
│   ├── use-mobile.ts      # useIsMobile() — detects <768px viewport
│   ├── auth-context.ts    # AuthContext + AuthContextValue type (shared by provider/hook)
│   └── use-auth.ts        # useAuth() — read session + auth actions
├── lib/
│   ├── utils.ts           # cn() utility (clsx + tailwind-merge)
│   ├── dates.ts           # date-fns wrappers: work week, ISO keys, month helpers
│   ├── assembly.ts        # Pure review assembly (AI-ready seam) + text formatters
│   ├── ai-summary.ts      # Builds month text + invokes summarize-review edge fn for AI prose
│   ├── api.ts             # Supabase CRUD for moments/projects + row↔domain mapping
│   ├── image-store.ts     # Supabase Storage helper for screenshots (putImage/getImage/getImageUrl/deleteImage)
│   ├── supabase.ts        # Shared Supabase client (backend: db + auth + storage)
│   ├── clipboard.ts       # copyText() + toast
│   └── download.ts        # Download screenshot blob(s) as files
├── vite-env.d.ts          # Vite env var types (VITE_SUPABASE_* etc.)
├── main.tsx               # Entry point — wraps <App /> in <StrictMode> + Redux <Provider>
└── App.tsx                # Router: /, /review, catch-all
```

## Project root (non-`src/`)

App-icon / PWA assets that ship as static files:

```
public/
├── moments-logo.svg          # SVG favicon — Bloom mark on rounded cream tile
├── icon-source.svg           # Full-bleed square Bloom mark; source for the PNG icons below
├── apple-touch-icon.png      # 180×180 — iOS home-screen icon
├── icon-192.png              # 192×192 — manifest / Android
├── icon-512.png              # 512×512 — manifest / Android (also used maskable)
├── favicon-32.png            # 32×32 — browser tab fallback
├── favicon-16.png            # 16×16 — browser tab fallback
├── manifest.webmanifest      # PWA manifest — name "Moments", standalone, theme/bg colors
└── _redirects                # SPA fallback for the host

scripts/
└── generate-icons.mjs        # Rasterizes icon-source.svg → the PNGs above (npm run icons)
```

