---
target: Capture page (route /)
total_score: 29
p0_count: 1
p1_count: 3
timestamp: 2026-07-21T17-43-45Z
slug: src-pages-capture-tsx
---
# Critique — Capture page (route "/")

Method: dual-agent (A: design review · B: deterministic detector + screenshot evidence)
Inspection: live render of the real Capture components via a temporary mock-store harness (no auth/network), screenshotted at desktop 1440w, mobile 390w, and dark mode; contrast measured in both themes.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Save toast + today-pill + disabled "This week" are good; composer shows no draft/unsaved-state indication |
| 2 | Match System / Real World | 4 | Diary language ("What happened?", plain category words); direction-aware "This week" icon |
| 3 | User Control and Freedom | 3 | Edit / Cancel / delete-confirm / Cmd+Enter present, but destructive delete has no undo |
| 4 | Consistency and Standards | 3 | `categorySurface()` reused everywhere (excellent); but the "This week" icon changes meaning (calendar↔arrow) |
| 5 | Error Prevention | 3 | Delete confirm, submit gating, screenshot-error caught; native date picker |
| 6 | Recognition Rather Than Recall | 2 | Edit/delete hover-revealed (`opacity-0 group-hover`) — hidden affordances |
| 7 | Flexibility and Efficiency | 3 | Per-day "+", global button, Cmd+Enter, roving-tabindex radiogroups |
| 8 | Aesthetic and Minimalist Design | 4 | Restrained; attachments hidden until requested; genuinely calm |
| 9 | Error Recovery | 2 | Screenshot error is specific/good, but the Link field accepts any string with no feedback |
| 10 | Help and Documentation | 2 | Composer has a description, but no first-run / empty-week guidance anywhere |
| **Total** | | **29/40** | **Good (upper end of the typical 20–32 band)** |

## Anti-Patterns Verdict

**Does this look AI-generated? No — it genuinely escapes the reflex.** The committed warm-diary system (cream paper `#f7f3ec`, Caveat handwriting on dates/times, a real notebook-ruling gradient under note text, category-tinted header bands) is neither the dark+purple/glass/gradient-text AI-tool look nor the SaaS-cream default. None of the absolute bans are present: no side-stripe borders, no gradient text, no glassmorphism-as-default (the sticky header's `backdrop-blur` is a thin bar, not a glass motif), no hero-metric template, no eyebrow kickers, no numbered scaffolding, no visible overflow. The 5-equal-column grid is the only thing that *could* read as an identical-card-grid, but the columns are literally the weekdays — justified IA, not filler. Handwriting flirts with twee but stays on the right side because body copy and labels remain plain sans.

**Deterministic scan:** `detect.mjs` ran clean over `src/components/capture`, `Capture.tsx`, `AppHeader.tsx`, `MomentTags.tsx`, `theme.css`, and `index.html` — exit 0, `[]`, zero rule hits. The "warm-neutral body bg" AI-tell rule did NOT fire. (Caveat: for a React SPA the CLI detector has limited JSX signal; the real evidence came from the live render.)

**Screenshot evidence (Assessment B):** corroborates three design findings objectively — the mobile floating button occludes card content ("Overloaded" mood tag clipped behind it), the composer drawer has no backdrop scrim and overlaps the Thu/Fri columns, and several tap targets (per-day "+", date chevrons) read as under the 44px comfortable threshold. Desktop day-column width truncates long URLs with an ellipsis (behaves correctly).

## Overall Impression

The populated week delivers exactly what PRODUCT.md asks for: warm, calm, personal — a real notebook rather than a tracking tool. The color language is the standout: one `--cat` token drives the card band, the active category chip, and the mood tile, so category is learned once and always carried by icon+label+color (a11y-clean). The single biggest opportunity is the **whole lifecycle around a moment beyond creating it** — editing/deleting is invisible on touch, the empty/first-run week is cold and unguided, and the payoff (the Review the moments feed) is never surfaced on the page that asks for the work. Capture nails the happy path and under-serves the edges.

## What's Working

1. **One coherent color language.** `categorySurface()` unifies card band, active chip, and mood tile from the same token — category identity is recognized everywhere, always icon+label+color, satisfying the color-blind requirement cleanly.
2. **Genuinely frictionless minimum path.** Pre-selected category + optional-everything-else + Cmd+Enter = ~2 real decisions to log a moment; screenshot/link are progressively disclosed so the composer opens calm.
3. **Craft that reads as care, not decoration.** Integer-pixel notebook ruling (with the documented Safari line-height fix), the direction-aware "This week" icon, the today-pill — restrained, specific touches.

## Priority Issues

- **[P0] Edit/Delete are unreachable on touch.** `MomentCardActions` is `opacity-0` until `group-hover`/`group-focus-within`; touch devices have no hover and cards aren't focusable, so on mobile a user can create moments but effectively cannot edit or delete their own data — a dead end. **Fix:** on coarse-pointer / small viewports, render actions persistently (or a card overflow menu / long-press). **Command: `/impeccable adapt`.**
- **[P1] The floating "Log a moment" button occludes content on mobile.** `CaptureBar` is `fixed bottom-6`; it sits on top of a real moment's mood tag and no scroll gutter is reserved. **Fix:** reserve bottom padding equal to the bar height on the scroll container, or dock the bar in normal flow on mobile. **Command: `/impeccable layout`.**
- **[P1] The empty / first-run week is dead and unguided.** A new user sees five identical "No moments" boxes — no welcome, no example, no mention that this feeds the monthly Review. This undercuts the core principle (the review is the payoff) exactly when the habit is forming. **Fix:** a warm first-run empty state — one line of purpose + one inviting CTA; keep per-day "No moments" quiet for partially-filled weeks. **Command: `/impeccable onboard`.**
- **[P1] The global button silently logs to *today* regardless of the week on screen.** `CaptureBar onAdd={() => openComposer(todayISO())}` — navigate to last/next week, hit the big button, and the composer opens dated today; the date field is easy to miss. **Fix:** default the composer date to a day within the viewed week, or surface the target date prominently in the sheet header. **Command: `/impeccable clarify`.**
- **[P2] The composer sheet does not dim the page (overlay is `rgba(0,0,0,0)`).** The modal state is ambiguous — unclear the rest of the page is inert — and the right sheet visually overlaps Thu/Fri, reading like a rendering glitch. **Fix:** a light warm-tinted scrim (10–20%) or a clear elevation/shadow edge that detaches the sheet. **Command: `/impeccable polish`.**
- **[P2] The Link field accepts any string with no validation.** `moment-url` takes free text; "not a url" saves and later renders as a dead external link. **Fix:** validate on blur/submit with inline feedback, gate save, or auto-prefix `https://`. **Command: `/impeccable harden`.**

## Persona Red Flags

**Casey (distracted mobile maker):** cannot edit/delete a mislogged moment (hover-only actions); the floating button covers their entries; tapping "Log a moment" from a past week logs to today by surprise.

**Sam (accessibility / keyboard + screen reader):** *Positives* — `group-focus-within` reveals actions for keyboard users, roving-tabindex radiogroups (category + mood), icon+label categories, `aria-current`, a live region in ProjectManager. *Red flags* — those same actions stay touch-inaccessible; the direction-changing "This week" icon has no textual cue; the Link field offers no error to recover from.

**Riley (stress-tester):** unvalidated URL saves silently; a brand-new all-empty week is a bleak wall of five identical boxes; long content truncates correctly (URLs, project names) — no overflow.

**Individual maker logging mid-work (project persona):** the frictionless path is real and good, but "Log a moment" always meaning "today" fights the mental model when reviewing other weeks, and there's no autosave/draft — an accidental Cancel/Esc loses an in-progress note with no recovery.

## Minor Observations

- The "No moments" placeholder is actually a button (good — it's an add target) but doesn't look tappable and doesn't say "Add"; a faint "+ Add a moment" would help.
- Desktop empty days are very tall dead rectangles (`auto-cols-fr` stretched to viewport height); let empty columns be shorter or fill the void with a subtle prompt.
- Default category "Interesting" is a semantic (not neutral) default — every un-thought log becomes "Interesting," which may skew the Review.
- The disabled "Save moment" state on the sage CTA is low-contrast enough to risk looking broken; verify it reads as intentionally disabled.
- Delete is destructive with no undo — for a warm personal journal, an undo toast would feel kinder than a hard confirm.
- Cognitive load: 2 decision points exceed 4 options (Category = 5 chips, mood Feeling = 6 presets), but both are single-glance icon+label chip rows, so felt cost is low. Overall load is low.

## Questions to Consider

1. If the review is the payoff, why does Capture never *show* it accruing (e.g. "6 moments this week, 2 weeks to your Review")? Reassurance, not gamification.
2. Should the big floating button exist at all, given every day already has a "+" and its always-today behavior is a footgun? A single contextual CTA anchored to the viewed week could be calmer and safer.
3. The diary metaphor is committed on the *card*, but the composer is a standard right-hand SaaS form sheet — does the register break the moment a user goes to write? Should capture feel more like writing in the notebook?
