import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
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

  const label = weekRangeLabel(days)

  // Shared controls, reused across the desktop and mobile layouts below.
  const thisWeekButton = (
    <Button
      variant="outline"
      onClick={onToday}
      disabled={weekOffset === 0}
      aria-current={weekOffset === 0 ? "true" : undefined}
    >
      <TodayIcon
        key={weekOffset > 0 ? "back" : weekOffset < 0 ? "forward" : "current"}
        className="size-4 animate-in fade-in-0 duration-200"
      />
      This week
    </Button>
  )
  const prevButton = (
    <Button variant="outline" size="icon" onClick={onPrev} aria-label="Previous week">
      <ChevronLeft className="size-4" />
    </Button>
  )
  const nextButton = (
    <Button variant="outline" size="icon" onClick={onNext} aria-label="Next week">
      <ChevronRight className="size-4" />
    </Button>
  )
  // Rendered once per layout, so each instance needs a distinct id/data-el.
  const weekendsToggle = (id: string) => (
    <div className="flex items-center gap-2">
      <Switch
        id={id}
        checked={showWeekends}
        onCheckedChange={onToggleWeekends}
        className="data-[state=checked]:bg-interactive"
      />
      <Label htmlFor={id} className="text-sm text-muted-foreground">
        Weekends
      </Label>
    </div>
  )

  return (
    <div data-el="capture-week-header" className="shrink-0">
      {/* Desktop / tablet: single justified row. */}
      <div className="hidden items-center justify-between gap-3 sm:flex">
        <div className="flex items-center gap-2">
          {thisWeekButton}
          {prevButton}
          <span
            data-el="capture-week-range"
            className="min-w-32 text-center font-handwritten text-2xl leading-none text-foreground/80"
          >
            {label}
          </span>
          {nextButton}
        </div>
        {weekendsToggle("weekend-toggle")}
      </div>

      {/* Mobile: date as a centered hero with arrows at the edges, a divider,
          then "This week" and the Weekends toggle split across the row below. */}
      <div className="flex flex-col gap-4 sm:hidden">
        <div className="flex items-center justify-between gap-2">
          {prevButton}
          <span
            data-el="capture-week-range-mobile"
            className="flex-1 text-center font-handwritten text-3xl leading-none text-foreground/80"
          >
            {label}
          </span>
          {nextButton}
        </div>
        <Separator />
        <div className="flex items-center justify-between gap-2">
          {thisWeekButton}
          {weekendsToggle("weekend-toggle-mobile")}
        </div>
      </div>
    </div>
  )
}
