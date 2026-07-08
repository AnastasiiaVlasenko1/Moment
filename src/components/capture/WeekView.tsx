import { useMemo, useState } from "react"
import { useAppSelector } from "@/store/hooks"
import { toISODate, todayISO } from "@/lib/dates"
import type { Moment } from "@/types/review"
import { useWeekNavigation } from "./useWeekNavigation"
import { WeekHeader } from "./WeekHeader"
import { DayColumn } from "./DayColumn"
import { CaptureBar } from "./CaptureBar"
import { MomentComposer } from "./MomentComposer"

interface ComposerState {
  open: boolean
  date: string
  /** Bumped on each open so the composer remounts with fresh form state. */
  seq: number
}

/** The five-day capture surface: week nav + day columns + floating composer. */
export function WeekView() {
  const week = useWeekNavigation()
  const moments = useAppSelector((s) => s.moments.items)
  const [composer, setComposer] = useState<ComposerState>({
    open: false,
    date: todayISO(),
    seq: 0,
  })

  const byDay = useMemo(() => {
    const map = new Map<string, Moment[]>()
    for (const m of moments) {
      const list = map.get(m.date) ?? []
      list.push(m)
      map.set(m.date, list)
    }
    for (const list of map.values()) list.sort((a, b) => b.createdAt - a.createdAt)
    return map
  }, [moments])

  const openComposer = (date: string) =>
    setComposer((c) => ({ open: true, date, seq: c.seq + 1 }))

  return (
    <div
      data-el="capture-week"
      className="flex flex-col gap-4 xl:min-h-0 xl:flex-1"
    >
      <WeekHeader
        days={week.days}
        weekOffset={week.weekOffset}
        showWeekends={week.showWeekends}
        onToggleWeekends={week.toggleWeekends}
        onPrev={week.goPrev}
        onNext={week.goNext}
        onToday={week.goToday}
      />

      <div
        data-el="capture-week-grid"
        className="grid gap-3 xl:min-h-0 xl:flex-1 xl:auto-cols-fr xl:grid-flow-col xl:grid-rows-1"
      >
        {week.days.map((date) => (
          <DayColumn
            key={toISODate(date)}
            date={date}
            moments={byDay.get(toISODate(date)) ?? []}
            onAdd={(iso) => openComposer(iso)}
          />
        ))}
      </div>

      <CaptureBar onAdd={() => openComposer(todayISO())} />

      <MomentComposer
        key={composer.seq}
        open={composer.open}
        onOpenChange={(open) => setComposer((c) => ({ ...c, open }))}
        initialDate={composer.date}
      />
    </div>
  )
}
