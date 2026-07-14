import type { CSSProperties } from "react"
import {
  Lightbulb,
  TriangleAlert,
  Trophy,
  GraduationCap,
  HeartPulse,
  type LucideIcon,
} from "lucide-react"
import type { Category, Project, SectionKey } from "@/types/review"

export interface CategoryMeta {
  id: Category
  label: string
  icon: LucideIcon
  section: SectionKey
  /** Tailwind classes for the category chip (light + dark). */
  chipClass: string
  /** A `--chart-N` token used for charts/accents. */
  chartToken: string
}

// The five capture categories, in picker order.
export const CATEGORY_CONFIG: Record<Category, CategoryMeta> = {
  interesting: {
    id: "interesting",
    label: "Interesting",
    icon: Lightbulb,
    section: "highlights",
    chipClass:
      "bg-amber-100/70 text-amber-700 dark:bg-amber-950/60 dark:text-amber-200",
    chartToken: "var(--chart-4)",
  },
  challenge: {
    id: "challenge",
    label: "Challenge",
    icon: TriangleAlert,
    section: "highlights",
    chipClass:
      "bg-rose-100/70 text-rose-700 dark:bg-rose-950/60 dark:text-rose-200",
    chartToken: "var(--chart-5)",
  },
  achievement: {
    id: "achievement",
    label: "Achievement",
    icon: Trophy,
    section: "highlights",
    chipClass:
      "bg-emerald-100/70 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-200",
    chartToken: "var(--chart-2)",
  },
  learning: {
    id: "learning",
    label: "Learning",
    icon: GraduationCap,
    section: "learning",
    chipClass:
      "bg-teal-100/70 text-teal-700 dark:bg-teal-950/60 dark:text-teal-200",
    chartToken: "var(--chart-3)",
  },
  mood: {
    id: "mood",
    label: "Mood",
    icon: HeartPulse,
    section: "mood",
    chipClass:
      "bg-violet-100/70 text-violet-700 dark:bg-violet-950/60 dark:text-violet-200",
    chartToken: "var(--chart-1)",
  },
}

/**
 * Category-tinted surface — the moment-card header band and the active
 * category chip / feeling tile, kept visually identical. Sets `--cat` to the
 * category's chart token; the classes tint the background, darken the text for
 * contrast, and color the border off that same token.
 */
export function categorySurface(category: Category): {
  style: CSSProperties
  className: string
} {
  return {
    style: { "--cat": CATEGORY_CONFIG[category].chartToken } as CSSProperties,
    className:
      "bg-[color-mix(in_srgb,var(--cat)_32%,var(--card))] text-[color-mix(in_srgb,var(--cat)_40%,var(--foreground))] border-[color-mix(in_srgb,var(--cat)_45%,transparent)]",
  }
}

/**
 * Category-colored text only — for outline tags such as the feeling chip on a
 * moment card and the mood distribution badges. The element supplies its own
 * transparent fill and neutral border; this just tints the label so the
 * category stays legible without another colored block.
 */
export function categoryAccentText(category: Category): {
  style: CSSProperties
  className: string
} {
  return {
    style: { "--cat": CATEGORY_CONFIG[category].chartToken } as CSSProperties,
    className: "text-[color-mix(in_srgb,var(--cat)_45%,var(--foreground))]",
  }
}

export const CATEGORY_ORDER: Category[] = [
  "interesting",
  "challenge",
  "achievement",
  "learning",
  "mood",
]

/** Categories that roll up into the Per-Project Highlights section, in display order. */
export const HIGHLIGHT_CATEGORIES: Category[] = [
  "achievement",
  "interesting",
  "challenge",
]

/**
 * Quick-pick feelings for a `mood` moment. Each is stored on the moment as its
 * own `mood` tag (not dumped into the note), so mood stays queryable and the
 * Note is free for optional context. The emoji makes them recognisable at a
 * glance in the composer, on cards, and in the month-end review.
 */
export const MOOD_PRESETS = [
  { label: "Energized", emoji: "⚡" },
  { label: "Focused", emoji: "🎯" },
  { label: "Calm", emoji: "🌿" },
  { label: "Overloaded", emoji: "🌀" },
  { label: "Frustrated", emoji: "😤" },
  { label: "Stuck", emoji: "🧱" },
] as const

const MOOD_EMOJI: Record<string, string> = Object.fromEntries(
  MOOD_PRESETS.map((m) => [m.label, m.emoji]),
)

/** The emoji for a feeling label, or an empty string for custom/legacy labels. */
export function moodEmoji(label: string | undefined): string {
  return label ? (MOOD_EMOJI[label] ?? "") : ""
}

// Seed projects so a first-run app isn't empty.
export const DEFAULT_PROJECTS: Project[] = [
  { id: "proj-mobile-app", name: "Mobile App", color: "var(--chart-1)" },
  { id: "proj-design-system", name: "Design System", color: "var(--chart-2)" },
  { id: "proj-marketing", name: "Marketing Site", color: "var(--chart-3)" },
]

/**
 * Named project color palette. Names surface in accessible labels — the chart
 * tokens shift hue between light/dark, so positional names stay honest.
 */
export const PROJECT_COLORS = [
  { name: "Color 1", value: "var(--chart-1)" },
  { name: "Color 2", value: "var(--chart-2)" },
  { name: "Color 3", value: "var(--chart-3)" },
  { name: "Color 4", value: "var(--chart-4)" },
  { name: "Color 5", value: "var(--chart-5)" },
] as const

/** Cycles through chart tokens for newly created projects. */
export const PROJECT_COLOR_CYCLE = PROJECT_COLORS.map((c) => c.value)
