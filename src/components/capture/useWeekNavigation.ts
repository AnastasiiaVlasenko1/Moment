import { useMemo, useState } from "react"
import { getWorkWeek, shiftWeek } from "@/lib/dates"

/** Week-view navigation state: anchor date, prev/next/today, and weekend toggle. */
export function useWeekNavigation() {
  const [anchor, setAnchor] = useState<Date>(() => new Date())
  const [showWeekends, setShowWeekends] = useState(false)

  const days = useMemo(
    () => getWorkWeek(anchor, showWeekends),
    [anchor, showWeekends],
  )

  return {
    days,
    showWeekends,
    toggleWeekends: () => setShowWeekends((v) => !v),
    goPrev: () => setAnchor((a) => shiftWeek(a, -1)),
    goNext: () => setAnchor((a) => shiftWeek(a, 1)),
    goToday: () => setAnchor(new Date()),
  }
}
