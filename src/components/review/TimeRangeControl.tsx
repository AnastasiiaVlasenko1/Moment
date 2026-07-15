import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import type { DateRange as CalendarRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { rangeLabel, toISODate, type DateRange } from "@/lib/dates"
import type { RangeType } from "./useReviewAssembly"

interface TimeRangeControlProps {
  rangeType: RangeType
  customRange: DateRange | undefined
  onChange: (type: RangeType, custom?: DateRange) => void
}

const PRESETS: { value: RangeType; label: string }[] = [
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
]

/** Dropdown: This week / This month / Custom…; picking Custom reveals a calendar. */
export function TimeRangeControl({
  rangeType,
  customRange,
  onChange,
}: TimeRangeControlProps) {
  const [open, setOpen] = useState(false)
  const [picking, setPicking] = useState(false)
  const [draft, setDraft] = useState<CalendarRange | undefined>(
    customRange
      ? { from: new Date(customRange.start), to: new Date(customRange.end) }
      : undefined,
  )

  const triggerLabel =
    rangeType === "week"
      ? "This week"
      : rangeType === "custom" && customRange
        ? rangeLabel(customRange)
        : "This month"

  const choosePreset = (type: RangeType) => {
    onChange(type)
    setOpen(false)
    setPicking(false)
  }
  const applyCustom = () => {
    if (!draft?.from) return
    onChange("custom", {
      start: toISODate(draft.from),
      end: toISODate(draft.to ?? draft.from),
    })
    setOpen(false)
    setPicking(false)
  }

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) setPicking(false)
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-44 justify-between"
          data-el="review-range-trigger"
        >
          <span className="truncate">{triggerLabel}</span>
          <ChevronDown className="size-4 shrink-0 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0">
        {picking ? (
          <div data-el="review-range-calendar">
            <Calendar
              mode="range"
              numberOfMonths={1}
              selected={draft}
              onSelect={setDraft}
              autoFocus
            />
            <div className="flex items-center justify-end gap-2 border-t p-2">
              <Button variant="ghost" size="sm" onClick={() => setPicking(false)}>
                Back
              </Button>
              <Button
                variant="interactive"
                size="sm"
                disabled={!draft?.from}
                onClick={applyCustom}
              >
                Apply
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex min-w-40 flex-col p-1" data-el="review-range-menu">
            {PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => choosePreset(preset.value)}
                className="hover:bg-accent flex items-center justify-between gap-6 rounded-md px-3 py-2 text-sm"
              >
                {preset.label}
                {rangeType === preset.value && <Check className="size-4" />}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPicking(true)}
              className="hover:bg-accent flex items-center justify-between gap-6 rounded-md px-3 py-2 text-sm"
            >
              Custom…
              {rangeType === "custom" && <Check className="size-4" />}
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
