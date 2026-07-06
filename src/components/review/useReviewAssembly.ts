import { useMemo, useState } from "react"
import { useAppSelector } from "@/store/hooks"
import { currentMonthKey, monthMoments, shiftMonth } from "@/lib/dates"
import { assembleReview, withMonth } from "@/lib/assembly"

/** Selects a month's moments and assembles them into a review model. */
export function useReviewAssembly() {
  const [monthKey, setMonthKey] = useState<string>(() => currentMonthKey())
  const moments = useAppSelector((s) => s.moments.items)
  const projects = useAppSelector((s) => s.projects.items)

  const model = useMemo(() => {
    const scoped = monthMoments(moments, monthKey)
    return withMonth(assembleReview(scoped, projects), monthKey)
  }, [moments, projects, monthKey])

  return {
    monthKey,
    model,
    goPrevMonth: () => setMonthKey((k) => shiftMonth(k, -1)),
    goNextMonth: () => setMonthKey((k) => shiftMonth(k, 1)),
    goThisMonth: () => setMonthKey(currentMonthKey()),
  }
}
