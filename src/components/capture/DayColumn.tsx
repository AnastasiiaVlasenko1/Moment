import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { dayLabels, toISODate, todayISO } from "@/lib/dates"
import type { Moment } from "@/types/review"
import { MomentCard } from "./MomentCard"

interface DayColumnProps {
  date: Date
  moments: Moment[]
  onAdd: (isoDate: string) => void
}

/** One day of the week: header + its moment cards + an inline add button. */
export function DayColumn({ date, moments, onAdd }: DayColumnProps) {
  const iso = toISODate(date)
  const isToday = iso === todayISO()
  const { weekday, day } = dayLabels(date)

  return (
    <div
      data-el="capture-day-column"
      className="flex min-w-0 flex-col rounded-lg border bg-muted/30 xl:min-h-0"
    >
      <div className="flex shrink-0 items-center justify-between px-3 py-2">
        <div className="flex items-baseline gap-1.5">
          <span className="font-handwritten text-xl leading-none text-muted-foreground">
            {weekday}
          </span>
          <span
            className={cn(
              "text-sm font-semibold",
              isToday &&
                "flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground",
            )}
          >
            {day}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onAdd(iso)}
          aria-label={`Add moment on ${weekday} ${day}`}
          className="flex size-9 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 px-2 pb-2 xl:min-h-0 xl:overflow-y-auto">
        {moments.length === 0 ? (
          <button
            type="button"
            onClick={() => onAdd(iso)}
            className="rounded-md border border-dashed py-6 text-xs text-muted-foreground hover:bg-accent"
          >
            No moments
          </button>
        ) : (
          moments.map((moment) => (
            <MomentCard key={moment.id} moment={moment} />
          ))
        )}
      </div>
    </div>
  )
}
