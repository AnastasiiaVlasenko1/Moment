// Pure, deterministic assembly of a month's moments into a structured review
// model + copy-ready text. No React, no side effects.
//
// AI-ready seam: assembleReview accepts an optional `generator` that receives
// the deterministic model and can return an enriched one (e.g. AI-written
// prose). Callers and UI don't change when that's added later.

import type { Category, Moment, Project } from "@/types/review"
import {
  CATEGORY_CONFIG,
  HIGHLIGHT_CATEGORIES,
} from "@/data/categories"
import { monthLabel } from "@/lib/dates"

export interface CategoryCount {
  category: Category
  label: string
  count: number
}

export interface ProjectCount {
  projectId: string
  name: string
  color: string
  count: number
}

export interface HighlightGroup {
  category: Category
  moments: Moment[]
}

export interface ProjectHighlight {
  project: Project
  count: number
  groups: HighlightGroup[]
}

export interface ReviewModel {
  monthKey: string
  monthLabel: string
  totalMoments: number
  activeProjects: number
  byCategory: CategoryCount[]
  byProject: ProjectCount[]
  highlights: ProjectHighlight[]
  learning: Moment[]
  moods: Moment[]
  screenshots: Moment[]
}

export interface AssembleOptions {
  generator?: (model: ReviewModel) => ReviewModel
}

export function assembleReview(
  monthMoments: Moment[],
  projects: Project[],
  options: AssembleOptions = {},
): ReviewModel {
  const projectById = new Map(projects.map((p) => [p.id, p]))

  const byCategory: CategoryCount[] = (
    Object.keys(CATEGORY_CONFIG) as Category[]
  ).map((category) => ({
    category,
    label: CATEGORY_CONFIG[category].label,
    count: monthMoments.filter((m) => m.category === category).length,
  }))

  const projectCounts = new Map<string, number>()
  for (const m of monthMoments) {
    if (m.projectId) {
      projectCounts.set(m.projectId, (projectCounts.get(m.projectId) ?? 0) + 1)
    }
  }
  const byProject: ProjectCount[] = [...projectCounts.entries()]
    .map(([projectId, count]) => {
      const project = projectById.get(projectId)
      return {
        projectId,
        name: project?.name ?? "Unknown project",
        color: project?.color ?? "var(--muted-foreground)",
        count,
      }
    })
    .sort((a, b) => b.count - a.count)

  const highlights: ProjectHighlight[] = byProject
    .map(({ projectId }) => {
      const project = projectById.get(projectId)
      if (!project) return null
      const groups: HighlightGroup[] = HIGHLIGHT_CATEGORIES.map((category) => ({
        category,
        moments: monthMoments.filter(
          (m) => m.projectId === projectId && m.category === category,
        ),
      })).filter((g) => g.moments.length > 0)
      if (groups.length === 0) return null
      const count = groups.reduce((sum, g) => sum + g.moments.length, 0)
      return { project, count, groups }
    })
    .filter((h): h is ProjectHighlight => h !== null)

  const learning = monthMoments.filter((m) => m.category === "learning")
  const moods = monthMoments.filter((m) => m.category === "mood")
  const screenshots = monthMoments.filter((m) => m.imageId)

  const model: ReviewModel = {
    monthKey: "",
    monthLabel: "",
    totalMoments: monthMoments.length,
    activeProjects: byProject.length,
    byCategory,
    byProject,
    highlights,
    learning,
    moods,
    screenshots,
  }

  return options.generator ? options.generator(model) : model
}

/** Stamp the month key/label onto a model (kept out of assemble for purity/testing). */
export function withMonth(model: ReviewModel, monthKey: string): ReviewModel {
  return { ...model, monthKey, monthLabel: monthLabel(monthKey) }
}

// ---- Copy-ready text formatters ------------------------------------------

function momentLine(m: Moment): string {
  const text = m.text.trim()
  // Base label: the note text, or a fallback describing the attachment.
  let label = text || (m.imageId ? "[Screenshot]" : m.url ? "" : "")
  // Mood moments lead with the feeling tag; the note (if any) becomes context.
  if (m.mood) label = text ? `${m.mood} — ${text}` : m.mood
  if (m.url) label = label ? `${label} (${m.url})` : m.url
  return `- ${label}`
}

export function formatHighlightsText(highlights: ProjectHighlight[]): string {
  return highlights
    .map((h) => {
      const body = h.groups
        .map((g) => {
          const heading = CATEGORY_CONFIG[g.category].label
          const lines = g.moments.map(momentLine).join("\n")
          return `${heading}:\n${lines}`
        })
        .join("\n\n")
      return `## ${h.project.name}\n${body}`
    })
    .join("\n\n")
}

export function formatMomentsText(title: string, moments: Moment[]): string {
  return `## ${title}\n${moments.map(momentLine).join("\n")}`
}

export function formatOverviewText(model: ReviewModel): string {
  const cats = model.byCategory
    .filter((c) => c.count > 0)
    .map((c) => `- ${c.label}: ${c.count}`)
    .join("\n")
  const projects = model.byProject
    .map((p) => `- ${p.name}: ${p.count}`)
    .join("\n")
  return [
    `# ${model.monthLabel} — Review`,
    `${model.totalMoments} moments logged across ${model.activeProjects} projects.`,
    `\nBy category:\n${cats}`,
    `\nBy project:\n${projects}`,
  ].join("\n")
}
