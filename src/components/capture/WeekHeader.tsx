import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { weekRangeLabel } from "@/lib/dates"

interface WeekHeaderProps {
  days: Date[]
  showWeekends: boolean
  onToggleWeekends: () => void
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}

export function WeekHeader({
  days,
  showWeekends,
  onToggleWeekends,
  onPrev,
  onNext,
  onToday,
}: WeekHeaderProps) {
  return (
    <div
      data-el="capture-week-header"
      className="flex flex-wrap items-center justify-between gap-3"
    >
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={onPrev} aria-label="Previous week">
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onNext} aria-label="Next week">
          <ChevronRight className="size-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onToday}>
          This week
        </Button>
        <span
          data-el="capture-week-range"
          className="ml-1 font-handwritten text-xl leading-none text-foreground/80"
        >
          {weekRangeLabel(days)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="weekend-toggle"
          checked={showWeekends}
          onCheckedChange={onToggleWeekends}
        />
        <Label htmlFor="weekend-toggle" className="text-sm text-muted-foreground">
          Weekends
        </Label>
      </div>
    </div>
  )
}
