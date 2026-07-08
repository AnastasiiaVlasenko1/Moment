import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { monthLabel } from "@/lib/dates"

interface MonthPickerProps {
  monthKey: string
  onPrev: () => void
  onNext: () => void
  onThisMonth: () => void
}

export function MonthPicker({
  monthKey,
  onPrev,
  onNext,
  onThisMonth,
}: MonthPickerProps) {
  return (
    <div data-el="review-month-picker" className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="icon" className="size-11" onClick={onPrev} aria-label="Previous month">
        <ChevronLeft className="size-4" />
      </Button>
      <span
        data-el="review-month-label"
        className="min-w-32 text-center font-handwritten text-2xl leading-none"
      >
        {monthLabel(monthKey)}
      </span>
      <Button variant="outline" size="icon" className="size-11" onClick={onNext} aria-label="Next month">
        <ChevronRight className="size-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={onThisMonth}>
        This month
      </Button>
    </div>
  )
}
