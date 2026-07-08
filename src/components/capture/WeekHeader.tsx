import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { weekRangeLabel } from "@/lib/dates"

interface WeekHeaderProps {
  days: Date[]
  weekOffset: number
  showWeekends: boolean
  onToggleWeekends: () => void
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}

export function WeekHeader({
  days,
  weekOffset,
  showWeekends,
  onToggleWeekends,
  onPrev,
  onNext,
  onToday,
}: WeekHeaderProps) {
  // Icon reflects the direction back to the current week: a calendar when
  // already there, else an arrow pointing the way "This week" would jump.
  const TodayIcon =
    weekOffset > 0 ? ArrowLeft : weekOffset < 0 ? ArrowRight : Calendar

  return (
    <div
      data-el="capture-week-header"
      className="flex shrink-0 flex-wrap items-center justify-between gap-3"
    >
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onToday}
          disabled={weekOffset === 0}
          aria-current={weekOffset === 0 ? "true" : undefined}
        >
          <TodayIcon className="size-4" />
          This week
        </Button>
        <Button variant="outline" size="icon" onClick={onPrev} aria-label="Previous week">
          <ChevronLeft className="size-4" />
        </Button>
        <span
          data-el="capture-week-range"
          className="min-w-32 text-center font-handwritten text-2xl leading-none text-foreground/80"
        >
          {weekRangeLabel(days)}
        </span>
        <Button variant="outline" size="icon" onClick={onNext} aria-label="Next week">
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="weekend-toggle"
          checked={showWeekends}
          onCheckedChange={onToggleWeekends}
          className="data-[state=checked]:bg-interactive"
        />
        <Label htmlFor="weekend-toggle" className="text-sm text-muted-foreground">
          Weekends
        </Label>
      </div>
    </div>
  )
}
