import { useMemo, useState } from "react"
import { getWorkWeek, shiftWeek, weekOffsetFromToday } from "@/lib/dates"

/** Week-view navigation state: anchor date, prev/next/today, and weekend toggle. */
export function useWeekNavigation() {
  const [anchor, setAnchor] = useState<Date>(() => new Date())
  const [showWeekends, setShowWeekends] = useState(false)

  const days = useMemo(
    () => getWorkWeek(anchor, showWeekends),
    [anchor, showWeekends],
  )

  /** Weeks between the viewed week and today: 0 = current, >0 future, <0 past. */
  const weekOffset = useMemo(() => weekOffsetFromToday(anchor), [anchor])

  return {
    days,
    weekOffset,
    showWeekends,
    toggleWeekends: () => setShowWeekends((v) => !v),
    goPrev: () => setAnchor((a) => shiftWeek(a, -1)),
    goNext: () => setAnchor((a) => shiftWeek(a, 1)),
    goToday: () => setAnchor(new Date()),
  }
}
