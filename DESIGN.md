---
name: Moments
description: A warm personal diary for capturing weekly moments and assembling month-end reviews.
colors:
  amber: "#d8a24a"
  amber-ink: "#8c5e18"
  sage: "#a7bd7f"
  action-ring: "#6f8043"
  moss: "#5f6e38"
  cream-bg: "#f7f3ec"
  card-paper: "#fffdf8"
  ink: "#3b342b"
  secondary: "#efe6d6"
  muted: "#ede6da"
  muted-ink: "#736550"
  accent: "#ede0c8"
  accent-ink: "#5c4a2e"
  destructive: "#b3452f"
  border-warm: "#5a462d26"
  input-stroke: "#e3d8c4"
  input-fill: "#f2eadd"
  espresso-bg: "#241e19"
  cat-mood: "#b5798f"
  cat-achievement: "#5f6e38"
  cat-learning: "#4e8a85"
  cat-interesting: "#c28a2e"
  cat-challenge: "#c2673e"
typography:
  display:
    fontFamily: "Caveat, ui-rounded, cursive"
    fontSize: "1.875rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "normal"
  heading:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.05em"
rounded:
  sm: "10px"
  md: "12px"
  lg: "14px"
  xl: "18px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
  button-interactive:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-outline:
    backgroundColor: "{colors.cream-bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-link:
    backgroundColor: "{colors.cream-bg}"
    textColor: "{colors.amber-ink}"
    padding: "0"
  card:
    backgroundColor: "{colors.card-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input:
    backgroundColor: "{colors.input-fill}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    height: "36px"
  moment-card:
    backgroundColor: "{colors.card-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  nav-pill-active:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0 16px"
    height: "40px"
---

# Design System: Moments

## 1. Overview

**Creative North Star: "The Warm Diary"**

Moments is a personal journal you actually want to open. The whole system is built to feel like cream paper under a warm desk lamp: unhurried, tactile, and quietly personal. It is not a productivity dashboard wearing a friendly skin — the diary metaphor is literal. Moments are logged as diary entries on ruled paper, dates and times are set in a handwritten hand, and the surface everywhere reads as warm paper rather than cold UI chrome. The two surfaces the app is built around — **Capture** (a five-day work-week view for logging moments) and **Review** (the month-end assembled reflection) — both inherit this calm: capture should feel like jotting a note, review should feel like reading back through the month.

The palette is a committed warm neutral: a cream body (`#f7f3ec`), off-white paper cards (`#fffdf8`), and soft brown-black ink (`#3b342b`), with **amber** (`#d8a24a`) as the identity color and a **pastel sage green** (`#a7bd7f`) reserved for interactive actions. Warmth here is carried by the paper, the ink, and the handwritten accent — never by shouting. The dark theme is not an inversion but a second scene: deep espresso (`#241e19`) with the same amber warming it, as if the same diary were open at night.

This system explicitly rejects the SaaS-tool aesthetic: no cold blue-grays, no neon, no glassmorphism, no gradient text, no hero-metric template. Where a generic app would reach for a stark white card and a blue primary button, Moments reaches for warm paper and a hand-lettered date. Restraint is the rule — color and motion are spent deliberately, not sprinkled.

**Key Characteristics:**
- Warm cream-paper surfaces with soft brown-black ink; amber is identity, sage green is action — the two never blur.
- A handwritten accent font (Caveat) used *only* for dates, times, greetings, and the wordmark — never body text.
- Diary-entry moment cards: a category-tinted header band, the note printed on genuinely ruled paper, and a hover-revealed edit/delete affordance.
- Five warm categorical accents (mood, achievement, learning, interesting, challenge) that stay muted and legible in both themes.
- Flat by default; shadow appears only as a response to elevation or hover.

## 2. Colors

A committed warm-neutral palette — cream and paper carry the surface, amber carries identity, and a single sage green is reserved so "you can act here" always reads the same way.

### Primary
- **Amber** (`#d8a24a`): The identity color and the `primary` button fill. It appears on the wordmark theme color, the primary CTA, and sidebar-primary. Kept for identity moments, not scattered as decoration. Brightened to `#e0b15e` in dark mode.
- **Amber Ink** (`#8c5e18`): A deepened amber used *only for link text on cream*, because the bright amber fails 4.5:1 as small text. In dark mode, link text can safely match the bright amber (`#e0b15e`), which already clears contrast on espresso.

### Secondary
- **Sage** (`#a7bd7f`): The `interactive` color — a lightened take on the logo's moss green. This is the app's action language: "Log a moment", the Weekends toggle, Save, and the active navigation pill. It is deliberately *not* the amber, so identity and action never collide. Brightened to `#a9c07a` in dark mode.
- **Action Ring** (`#6f8043`): The focus ring, a deepened sage so it stays visible (≥3:1) against cream. Brightens to sage in dark mode.
- **Moss** (`#5f6e38`): The logo's true green; the source hue the sage and ring are lightened from.

### Tertiary — Categorical Accents
Five warm accents, one per capture category. Each is defined as a `--chart-N` token that shifts hue slightly between light and dark so it stays legible on either background. Used for the moment-card header band, category chips, and mood/stat charts — never as UI chrome.
- **Mood** (`#b5798f`): muted mauve-rose (`--chart-1`).
- **Achievement** (`#5f6e38`): moss green (`--chart-2`).
- **Learning** (`#4e8a85`): muted teal (`--chart-3`).
- **Interesting** (`#c28a2e`): warm ochre (`--chart-4`).
- **Challenge** (`#c2673e`): terracotta (`--chart-5`).

### Neutral
- **Cream** (`#f7f3ec`): The body background. The scene, not a "warm-tinted white" — the warmth is committed. Espresso (`#241e19`) in dark mode.
- **Paper** (`#fffdf8`): Card, popover, and composer surface — a near-white warmer than the body so cards lift off the page without a shadow.
- **Ink** (`#3b342b`): Primary text and headings — a soft brown-black, never pure `#000`. Warm off-white (`#ede3d2`) in dark mode.
- **Muted Ink** (`#736550`): Secondary/metadata text, cleared to ≥4.5:1 on cream.
- **Warm Border** (`#5a462d26`, i.e. `rgba(90,70,45,0.15)`): A brown hairline at 15% opacity — dividers, card outlines, input strokes. Never a hard gray line.
- **Input Fill** (`#f2eadd`) / **Input Stroke** (`#e3d8c4`): Form fields sit slightly recessed and warmer than paper.
- **Destructive** (`#b3452f`): A brick red for delete/error — warm, not fire-engine.

### Named Rules
**The Two-Voice Rule.** Amber is *identity*; sage is *action*. A user must never have to wonder which color means "click me" — filled sage always does. Amber fills are reserved for the single primary CTA and brand moments. Never use amber and sage interchangeably.

**The No-Gray Rule.** There are no true grays in this system. Every "gray" is a warm brown mixed toward the cream (borders derive from `rgba(90,70,45,…)`, muted text from the brown-ink ramp). A cold `#888` anywhere is a bug.

## 3. Typography

**Display / Accent Font:** Caveat (with `ui-rounded, cursive` fallback) — a handwritten hand.
**Body & UI Font:** Inter (variable, weight 100–900, with `system-ui, sans-serif` fallback).

**Character:** A high-contrast pairing on purpose — a warm, informal handwritten script against a neutral, highly legible workhorse sans. Inter does all the reading work; Caveat supplies the diary's personal handwriting for the few moments that should feel written by a person, not rendered by an app.

### Hierarchy
- **Display / Handwritten** (Caveat, ~1.1–1.9rem, line-height ~1.1): The wordmark, capture times on moment cards, dates, and greetings. Applied via the `font-handwritten` utility. Decorative-personal, never structural.
- **Heading / h1** (Inter medium 500, 1.5rem / `text-2xl`, line-height 1.5): Page and section titles.
- **h2** (Inter medium 500, 1.25rem / `text-xl`, line-height 1.5): Sub-sections.
- **h3** (Inter medium 500, 1.125rem / `text-lg`, line-height 1.5): Card and group titles.
- **Body** (Inter regular 400, 1rem / `text-base`, line-height 1.5): Notes, descriptions, form values. Base `font-size` is `16px`.
- **Label** (Inter bold 700, 0.75rem / `text-xs`, uppercase, letter-spacing 0.05em): The category name on a moment-card band and other typed micro-labels.

### Named Rules
**The Handwriting-Is-Sacred Rule.** Caveat is *only* for dates, times, greetings, and the wordmark. It never sets body copy, button labels, form fields, or paragraphs. Handwriting that carries functional content breaks legibility and cheapens the accent.

**The One-Weight-Family Rule.** Hierarchy comes from Inter's weight (400 → 500 → 700) and size, not from a third font. Do not introduce a second sans.

## 4. Elevation

The system is **flat by default and lifts on interaction**. Cards separate from the page primarily through *tonal layering* — paper (`#fffdf8`) sitting on cream (`#f7f3ec`) — rather than through drop shadows. Where shadows exist they are warm and low-contrast, tinted with the same brown (`rgba(90,70,45,…)`) as the ink rather than neutral black, so nothing ever casts a cold gray shadow onto warm paper. shadcn primitives keep their subtle `shadow-xs`/`shadow-sm` resting elevation; the signature elevation moment is the moment card, which rests almost flat and rises on hover.

### Shadow Vocabulary
- **Resting (moment card)** (`box-shadow: 0 2px 8px -4px rgba(90,70,45,0.10)`): A barely-there warm lift so a logged moment reads as a physical slip of paper.
- **Hover (moment card)** (`box-shadow: 0 10px 28px -10px rgba(90,70,45,0.18)`): The card rises toward the reader on hover; transition is `transition-shadow` only (no layout shift).
- **Dark-theme equivalents** use `rgba(0,0,0,0.35)` resting / `rgba(0,0,0,0.55)` hover — the one place true-black shadow is allowed, because espresso needs it to read.

### Named Rules
**The Warm-Shadow Rule.** In light mode, every shadow is tinted brown (`rgba(90,70,45,…)`), never `rgba(0,0,0,…)`. A neutral-black shadow on cream paper looks like a bruise.

**The Flat-At-Rest Rule.** Surfaces are flat or near-flat at rest. Shadow is a *response* to state (hover, elevation, focus), not a default decoration.

## 5. Components

### Buttons
- **Shape:** Gently curved (`rounded-md`, 12px). Default height 36px (`h-9`), padding `8px 16px`.
- **Primary (`default`):** Amber fill (`#d8a24a`), ink text, `hover:bg-primary/90`. The single most-important action on a surface.
- **Interactive:** Sage fill (`#a7bd7f`), ink text, `hover:bg-interactive/90`. The app's true "act here" button — logging, saving, toggles.
- **Outline / Secondary / Ghost:** Background or warm-secondary fills with `hover:bg-accent`; used for lower-priority actions.
- **Link:** Amber-ink text (`#8c5e18`) with underline-on-hover; the only button that uses the deepened amber for contrast.
- **Focus:** A 3px `ring-ring/50` ring in the sage/action-ring green, plus `focus-visible:border-ring`. Sizes range from `xs` (24px) through `lg` (40px) plus square `icon` variants.

### Chips
- **Category Chip:** A category-tinted pill. In its active/surface form it uses `color-mix` to tint the background ~32% toward the category's chart token, darken the text ~40% toward ink for contrast, and border ~45% of the token. An outline variant tints *only the label* over a transparent fill with a neutral border (the mood tag on a card).
- **Project Chip:** A small labeled tag colored from the project's assigned chart token.

### Cards / Containers
- **Corner Style:** `rounded-xl` (18px) for shadcn cards; `rounded-lg` (14px) for the signature moment card.
- **Background:** Paper (`#fffdf8`) on the cream body.
- **Shadow Strategy:** Flat-at-rest; see Elevation. Moment cards lift on hover, generic cards keep a subtle `shadow-sm`.
- **Border:** The warm hairline (`rgba(90,70,45,0.15)`).
- **Internal Padding:** 24px for standard cards; the moment card uses tighter `~10px` band/body padding to read as a compact slip.

### Inputs / Fields
- **Style:** Recessed warm fill (`#f2eadd`) with a warm stroke (`#e3d8c4`), `rounded-md` (12px), 36px tall.
- **Focus:** 3px sage ring + border shift to the action-ring green — the same focus language as buttons.
- **Error / Disabled:** `aria-invalid` shows a destructive (brick-red) ring/border; disabled drops to 50% opacity. Browser autofill styling is neutralized so Chrome/Safari's pale-blue never bleeds into the warm fields.

### Navigation
- **Style:** A sticky, semi-transparent header (`bg-background/80` + `backdrop-blur`) with a hairline bottom border. Primary nav is a **pill group** — a `rounded-full` sage-tinted track holding Capture/Review pills.
- **States:** The active pill fills with sage (`bg-interactive`) + `shadow-sm`; inactive pills are quiet secondary-ink text that darken on hover. Focus shows the sage ring with a 2px offset.
- **Mobile:** The header reflows via named grid areas — logo + sign-out on the top row, nav centered below (`<768px`); a single 14px-tall bar with logo · nav · sign-out on desktop.

### Signature Component — The Moment Card
The heart of the system. A single logged moment rendered as a diary entry: a **category-tinted header band** carrying the uppercase category label (with its Lucide icon) and the capture time in *handwritten Caveat*, above the note printed on **genuinely ruled paper** — a `repeating-linear-gradient` hairline under each text line, tinted with the category color, on a strict 26px integer period (a fractional line-height lets Safari's pixel-snapping drift the rules off the text). Below the note: an optional mood tag, screenshot attachment (16:10, `rounded-md`), external link, and project chip. Edit/delete controls are hover-revealed via the `group` pattern. This one component embodies every rule: warm paper, category color used with restraint, handwriting for the timestamp only, flat-at-rest with a warm hover lift.

## 6. Do's and Don'ts

### Do:
- **Do** keep amber for *identity* and sage green for *action*. Filled sage (`#a7bd7f`) is always "act here"; amber (`#d8a24a`) is the brand and the single primary CTA.
- **Do** reserve Caveat handwriting for dates, times, greetings, and the wordmark only.
- **Do** make every surface warm paper (`#fffdf8`) on cream (`#f7f3ec`) with soft brown-black ink (`#3b342b`).
- **Do** tint shadows and borders brown (`rgba(90,70,45,…)`) in light mode.
- **Do** keep body and metadata text at or above 4.5:1 — use `muted-ink` (`#736550`) for secondary text, never a lighter warm gray, and use `amber-ink` (`#8c5e18`) for amber link text on cream.
- **Do** use the category chart tokens (`--chart-1`…`--chart-5`) for all categorical color, so mood/achievement/learning/interesting/challenge stay consistent across cards, chips, and charts.
- **Do** keep surfaces flat at rest; let shadow be a response to hover/focus/elevation.
- **Do** use an integer-pixel line-height period for the ruled-note gradient (26px), or Safari drifts the rules off the text.

### Don't:
- **Don't** introduce cold grays, blue-grays, or a `#000` shadow on light surfaces — this is the SaaS-tool look the diary rejects.
- **Don't** use the bright amber (`#d8a24a`) for small text on cream; it fails contrast. Use `amber-ink`.
- **Don't** set body copy, buttons, or form fields in Caveat.
- **Don't** blur amber and sage into one "accent" — the two-voice separation is the point.
- **Don't** reach for gradient text, `background-clip: text`, glassmorphism, or a big-number hero-metric block.
- **Don't** add drop shadows as default decoration; flat-at-rest is the rule.
- **Don't** use `border-left`/`border-right` colored stripes on cards or list items; the category color lives in the header band and ruled lines, not a side stripe.
- **Don't** invent a third font or a second sans; hierarchy comes from Inter's weights and Caveat's single accent role.
