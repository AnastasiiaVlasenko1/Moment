import { useMemo, useState } from "react"
import { useAppSelector } from "@/store/hooks"
import {
  momentsInRange,
  monthRange,
  rangeLabel,
  weekRange,
  type DateRange,
} from "@/lib/dates"
import { assembleReview, withRange } from "@/lib/assembly"
import type { Category } from "@/types/review"

export type RangeType = "week" | "month" | "custom"

/** Resolve the active range type (+ custom span) into concrete dates + label. */
function resolveRange(type: RangeType, custom: DateRange | undefined): {
  range: DateRange
  label: string
} {
  if (type === "week") {
    const range = weekRange()
    return { range, label: `This week · ${rangeLabel(range)}` }
  }
  if (type === "custom" && custom) {
    return { range: custom, label: rangeLabel(custom) }
  }
  const range = monthRange()
  return { range, label: `This month · ${rangeLabel(range)}` }
}

/**
 * Owns the Review tab's controls — time range (week / month / custom) plus the
 * project, category, and search filters — and assembles the matching moments
 * into a review model. All filters narrow one dataset, so the at-a-glance cards
 * and the sections below always agree.
 */
export function useReviewAssembly() {
  const [rangeType, setRangeType] = useState<RangeType>("month")
  const [customRange, setCustomRange] = useState<DateRange | undefined>()
  const [search, setSearch] = useState("")
  const [projectId, setProjectId] = useState<string>("all")
  const [category, setCategory] = useState<Category | "all">("all")

  const moments = useAppSelector((s) => s.moments.items)
  const projects = useAppSelector((s) => s.projects.items)

  const { range, label } = useMemo(
    () => resolveRange(rangeType, customRange),
    [rangeType, customRange],
  )

  const model = useMemo(() => {
    let scoped = momentsInRange(moments, range)
    if (projectId !== "all") scoped = scoped.filter((m) => m.projectId === projectId)
    if (category !== "all") scoped = scoped.filter((m) => m.category === category)
    const q = search.trim().toLowerCase()
    if (q) {
      scoped = scoped.filter((m) =>
        `${m.text} ${m.mood ?? ""} ${m.url ?? ""}`.toLowerCase().includes(q),
      )
    }
    const key = `${range.start}_${range.end}_${projectId}_${category}`
    return withRange(assembleReview(scoped, projects), key, label)
  }, [moments, projects, range, label, projectId, category, search])

  return {
    model,
    rangeType,
    customRange,
    setRange: (type: RangeType, custom?: DateRange) => {
      setRangeType(type)
      if (custom) setCustomRange(custom)
    },
    filters: { search, projectId, category },
    setSearch,
    setProjectId,
    setCategory,
  }
}
