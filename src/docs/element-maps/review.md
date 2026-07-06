# Review Page Element Map

Route: `/review` — month-end assembled, copy-ready review.

review
└── review-builder                         — Composed review container
    ├── review-month-picker                — Prev/next month + "This month"
    │   └── review-month-label             — "July 2026"
    ├── review-empty                        — Empty state (no moments this month)
    ├── review-overview                     — Activity overview section
    │   ├── review-overview-stats          — Stat tiles (moments, projects, screenshots, moods)
    │   └── review-overview-chart          — Category distribution bar chart
    ├── review-highlights                    — Per-project highlights (copyable)
    │   └── review-highlights-project       — One project's grouped moments (repeated)
    ├── review-learning                      — "What I learned" section (copyable)
    ├── review-mood                          — "How the month felt" section (copyable)
    │   ├── review-mood-distribution        — Mood label chips with counts
    │   └── review-mood-timeline            — Chronological mood list
    └── review-gallery                       — Grouped screenshots
        └── review-gallery-group            — Screenshots for one project (repeated)
            └── review-gallery-item         — A single screenshot tile (repeated)
