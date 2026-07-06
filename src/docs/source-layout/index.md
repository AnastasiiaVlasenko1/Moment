# Source Layout

> **⚠️ Living document.** This tree must reflect the actual project structure at all times. When you create, rename, move, or delete files or directories, update this tree accordingly. Add a brief `# comment` for new entries to describe their purpose.

```
src/
├── pages/
│   ├── Capture.tsx        # Route "/" — five-day week view for logging moments
│   ├── Review.tsx         # Route "/review" — month-end assembled review
│   └── NotFound.tsx       # 404 catch-all page
├── components/
│   ├── ui/                # shadcn/ui primitives (DO NOT manually edit — managed by npx shadcn)
│   ├── global/
│   │   └── AppHeader.tsx  # Site-wide header + primary nav (Capture / Review)
│   ├── shared/
│   │   └── MomentTags.tsx # CategoryChip + ProjectChip (used by capture & review)
│   ├── capture/           # Capture feature (week view + block picker)
│   │   ├── WeekView.tsx           # Composed: header + day columns + composer
│   │   ├── WeekHeader.tsx         # Week nav (prev/next/today) + weekend toggle
│   │   ├── DayColumn.tsx          # One day column with its moment cards
│   │   ├── MomentCard.tsx         # A single logged moment (text/screenshot/link)
│   │   ├── CaptureBar.tsx         # Floating "+" content-type block picker
│   │   ├── MomentComposer.tsx     # Compose panel (right fly-out sheet): fields + save
│   │   ├── ScreenshotInput.tsx    # Paste/upload image zone with preview
│   │   ├── CategoryPicker.tsx     # Five colored category chips
│   │   ├── ProjectPicker.tsx      # Searchable project selector + create + "Manage projects"
│   │   ├── ProjectManager.tsx     # Project CRUD dialog (add / list) 
│   │   ├── ProjectManagerRow.tsx  # One editable project row (recolor / rename / delete)
│   │   ├── useWeekNavigation.ts   # Week anchor state + prev/next/today/weekends
│   │   ├── useMomentComposer.ts   # Compose form state (seeded once per session)
│   │   └── useMomentImage.ts      # Loads a screenshot object URL from IndexedDB
│   └── review/            # Month-end review assembly
│       ├── ReviewBuilder.tsx      # Composed: month picker + all sections
│       ├── MonthPicker.tsx        # Prev/next month + "This month"
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
│       ├── index.md        # Index of all element maps with routes
│       ├── global.md       # Shared header/nav element map
│       ├── capture.md      # Capture page element map
│       ├── review.md       # Review page element map
│       └── not-found.md    # 404 page element map
├── store/
│   ├── index.ts           # Redux store: moments + projects slices, localStorage persistence
│   ├── momentsSlice.ts    # Moments slice (add/update/move/delete)
│   ├── projectsSlice.ts   # Projects slice (add/update/remove; seeded with defaults)
│   └── hooks.ts           # Typed hooks: useAppDispatch(), useAppSelector()
├── assets/
│   └── fonts/
│       ├── InterVariable.woff2         # Inter variable font (weight 100–900, normal)
│       └── InterVariable-Italic.woff2  # Inter variable font (weight 100–900, italic)
├── styles/
│   ├── index.css          # Main stylesheet entry — imports Tailwind, shadcn, fonts, theme
│   ├── theme.css          # CSS theme tokens (light/dark), @theme inline config, base typography
│   └── fonts.css          # @font-face declarations for Inter + base font settings
├── hooks/
│   ├── use-debounce.ts    # useDebouncedValue<T>() — generic debounce hook
│   └── use-mobile.ts      # useIsMobile() — detects <768px viewport
├── lib/
│   ├── utils.ts           # cn() utility (clsx + tailwind-merge)
│   ├── dates.ts           # date-fns wrappers: work week, ISO keys, month helpers
│   ├── assembly.ts        # Pure review assembly (AI-ready seam) + text formatters
│   ├── persistence.ts     # localStorage load/save for moment + project metadata
│   ├── image-store.ts     # IndexedDB helper for screenshot blobs
│   ├── clipboard.ts       # copyText() + toast
│   └── download.ts        # Download screenshot blob(s) as files
├── main.tsx               # Entry point — wraps <App /> in <StrictMode> + Redux <Provider>
└── App.tsx                # Router: /, /review, catch-all
```
