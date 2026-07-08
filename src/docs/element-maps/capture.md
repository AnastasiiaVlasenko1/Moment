# Capture Page Element Map

Route: `/` — the five-day week view for logging moments.

capture
├── capture-week                           — Week-view container
│   ├── capture-week-header                — Week nav ("This week" + prev/next) + weekend toggle
│   │   ├── capture-week-range             — "Jul 6 – 10, 2026" range label (desktop/tablet layout)
│   │   └── capture-week-range-mobile      — Same range label in the stacked mobile layout
│   ├── capture-week-grid                  — Grid of day columns
│   │   └── capture-day-column             — One day (repeated); header + moment list
│   │       └── capture-moment-card        — A single logged moment, diary-entry style (repeated)
│   │           ├── capture-moment-card-band        — Category-tinted header band
│   │           │   ├── capture-moment-card-category    — Category icon + label (uppercase)
│   │           │   └── capture-moment-card-time        — Handwritten capture time (e.g. "9:14 AM")
│   │           ├── capture-moment-card-note        — The note text on ruled paper (if any)
│   │           ├── capture-moment-card-attachment  — Screenshot preview, full-width (if any)
│   │           ├── capture-moment-card-link        — External link, muted (if any)
│   │           ├── capture-moment-card-project     — Project pill (if set)
│   │           ├── capture-moment-card-edit    — Opens the composer to edit this moment
│   │           └── capture-moment-card-delete  — Deletes this moment
│   ├── capture-bar                        — Floating "Log a moment" bar
│   │   └── capture-bar-add                — Opens the compose dialog directly
│   └── capture-composer                   — Moment compose panel (right fly-out sheet)
│       ├── capture-composer-category-picker       — Five colored category chips (first block)
│       ├── capture-composer-mood-presets  — Quick mood chips (mood category)
│       ├── capture-composer-text          — Note textarea ("What happened?")
│       ├── capture-composer-screenshot-dropzone   — Upload/paste zone under "Attachments" label (revealed, optional)
│       ├── capture-composer-screenshot-preview    — Selected image preview
│       ├── capture-composer-url           — URL input (revealed, optional)
│       ├── capture-composer-attach-actions        — Subtle text-action row (attach/link)
│       │   ├── capture-composer-attach-screenshot — Reveal link for the screenshot field
│       │   └── capture-composer-add-link          — Reveal link for the link field
│       ├── capture-composer-project-trigger       — Project selector (popover; incl. "Manage projects")
│       ├── capture-composer-date          — Date input (defaults today, editable)
│       └── capture-composer-save          — Save button
└── project-manager                        — Project CRUD dialog (from the project picker)
    ├── project-manager-list               — Editable project rows (recolor / rename / delete)
    └── project-manager-add                — Add-project form
        └── project-manager-add-input      — New project name input
