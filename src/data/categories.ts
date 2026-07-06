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
      "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    chartToken: "var(--chart-4)",
  },
  challenge: {
    id: "challenge",
    label: "Challenge",
    icon: TriangleAlert,
    section: "highlights",
    chipClass:
      "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    chartToken: "var(--chart-5)",
  },
  achievement: {
    id: "achievement",
    label: "Achievement",
    icon: Trophy,
    section: "highlights",
    chipClass:
      "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    chartToken: "var(--chart-2)",
  },
  learning: {
    id: "learning",
    label: "Learning",
    icon: GraduationCap,
    section: "learning",
    chipClass:
      "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    chartToken: "var(--chart-3)",
  },
  mood: {
    id: "mood",
    label: "Mood",
    icon: HeartPulse,
    section: "mood",
    chipClass:
      "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    chartToken: "var(--chart-1)",
  },
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

/** Quick-pick mood labels that prefill the text so mood capture stays one tap. */
export const MOOD_PRESETS = [
  "Energized",
  "Focused",
  "Calm",
  "Overloaded",
  "Frustrated",
  "Stuck",
] as const

// Seed projects so a first-run app isn't empty.
export const DEFAULT_PROJECTS: Project[] = [
  { id: "proj-mobile-app", name: "Mobile App", color: "var(--chart-1)" },
  { id: "proj-design-system", name: "Design System", color: "var(--chart-2)" },
  { id: "proj-marketing", name: "Marketing Site", color: "var(--chart-3)" },
]

/** Cycles through chart tokens for newly created projects. */
export const PROJECT_COLOR_CYCLE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]
