# Capture Page Element Map

Route: `/` — the five-day week view for logging moments.

capture
├── capture-intro                          — Heading + subtitle
├── capture-week                           — Week-view container
│   ├── capture-week-header                — Week nav + weekend toggle
│   │   └── capture-week-range             — "Jul 6 – 10, 2026" range label
│   ├── capture-week-grid                  — Grid of day columns
│   │   └── capture-day-column             — One day (repeated); header + moment list
│   │       └── capture-moment-card        — A single logged moment (repeated)
│   │           ├── capture-moment-card-edit    — Opens the composer to edit this moment
│   │           └── capture-moment-card-delete  — Deletes this moment
│   ├── capture-bar                        — Floating "Log a moment" bar
│   │   └── capture-bar-add                — Opens the compose dialog directly
│   └── capture-composer                   — Moment compose dialog
│       ├── capture-composer-mood-presets  — Quick mood chips (mood category)
│       ├── capture-composer-text          — Note textarea ("What happened?")
│       ├── capture-composer-attach-screenshot     — Reveal button for the screenshot field
│       ├── capture-composer-screenshot-dropzone   — Upload/paste zone (revealed, optional)
│       ├── capture-composer-screenshot-preview    — Selected image preview
│       ├── capture-composer-add-link      — Reveal button for the link field
│       ├── capture-composer-url           — URL input (revealed, optional)
│       ├── capture-composer-category-picker       — Five colored category chips
│       ├── capture-composer-project-trigger       — Project selector (popover)
│       ├── capture-composer-date          — Date input (defaults today, editable)
│       └── capture-composer-save          — Save button
