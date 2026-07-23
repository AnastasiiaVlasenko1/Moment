import { useMemo, useState } from "react"
import { NotebookPen, Plus } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { toISODate, todayISO } from "@/lib/dates"
import type { Moment } from "@/types/review"
import { Button } from "@/components/ui/button"
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

  // The "Log a moment" button isn't tied to a specific day, so pick a date that
  // matches the week on screen: today when the current week is showing, else the
  // first day of the viewed week — never silently today while browsing Jan.
  const quickAddDate =
    week.weekOffset === 0 ? todayISO() : toISODate(week.days[0])

  // A brand-new user has logged nothing yet. Rather than five empty day
  // columns, greet them with what this is for and one clear way in — the
  // review is the payoff, so the first moment is the whole game.
  const isFirstRun = moments.length === 0

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

      {isFirstRun ? (
        <div
          data-el="capture-first-run"
          className="flex flex-1 flex-col items-center justify-center gap-6 rounded-lg border border-dashed bg-muted/20 px-6 py-16 text-center xl:min-h-0"
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-foreground">
            <NotebookPen className="size-7" aria-hidden="true" />
          </div>
          <div className="max-w-md space-y-2">
            <h2 className="font-handwritten text-3xl leading-none text-foreground">
              Your first moment
            </h2>
            <p className="text-sm text-balance text-muted-foreground">
              Jot down what happened today — something interesting, a challenge,
              a small win, a lesson, or just how it felt. At month&rsquo;s end,
              Moments gathers them into a Review you can look back on.
            </p>
          </div>
          <Button
            variant="interactive"
            size="lg"
            data-el="capture-first-run-add"
            onClick={() => openComposer(todayISO())}
          >
            <Plus aria-hidden="true" />
            Log your first moment
          </Button>
        </div>
      ) : (
        <>
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

          <CaptureBar onAdd={() => openComposer(quickAddDate)} />
        </>
      )}

      <MomentComposer
        key={composer.seq}
        open={composer.open}
        onOpenChange={(open) => setComposer((c) => ({ ...c, open }))}
        initialDate={composer.date}
      />
    </div>
  )
}
