import {
  addWeeks,
  differenceInCalendarWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameMonth,
  parseISO,
  startOfWeek,
} from "date-fns"
import type { Moment } from "@/types/review"

/** Format a Date as an ISO `yyyy-mm-dd` day key (local time, no timezone shift). */
export function toISODate(date: Date): string {
  return format(date, "yyyy-MM-dd")
}

/** Today's ISO day key. */
export function todayISO(): string {
  return toISODate(new Date())
}

/**
 * Days of the week containing `anchor`. Weeks start on Monday.
 * Returns 5 days (Mon–Fri) by default, or 7 when `showWeekends` is true.
 */
export function getWorkWeek(anchor: Date, showWeekends = false): Date[] {
  const start = startOfWeek(anchor, { weekStartsOn: 1 })
  const end = endOfWeek(anchor, { weekStartsOn: 1 })
  const all = eachDayOfInterval({ start, end })
  return showWeekends ? all : all.slice(0, 5)
}

export function shiftWeek(anchor: Date, direction: number): Date {
  return addWeeks(anchor, direction)
}

/** Whole weeks between `anchor`'s week and the current week: 0 = this week, >0 future, <0 past. */
export function weekOffsetFromToday(anchor: Date): number {
  return differenceInCalendarWeeks(anchor, new Date(), { weekStartsOn: 1 })
}

/** Label like "Jul 6 – 10, 2026" for a set of week days. */
export function weekRangeLabel(days: Date[]): string {
  if (days.length === 0) return ""
  const first = days[0]
  const last = days[days.length - 1]
  const sameMonth = isSameMonth(first, last)
  const left = format(first, "MMM d")
  const right = sameMonth ? format(last, "d") : format(last, "MMM d")
  return `${left} – ${right}, ${format(last, "yyyy")}`
}

/** Month label like "July 2026" for a `yyyy-MM` key. */
export function monthLabel(monthKey: string): string {
  return format(parseISO(`${monthKey}-01`), "MMMM yyyy")
}

/** Current month as a `yyyy-MM` key. */
export function currentMonthKey(): string {
  return format(new Date(), "yyyy-MM")
}

/** Shift a `yyyy-MM` key by a number of months. */
export function shiftMonth(monthKey: string, direction: number): string {
  const d = parseISO(`${monthKey}-01`)
  d.setMonth(d.getMonth() + direction)
  return format(d, "yyyy-MM")
}

/** Moments filed within the given `yyyy-MM` month, newest first. */
export function monthMoments(moments: Moment[], monthKey: string): Moment[] {
  return moments
    .filter((m) => m.date.startsWith(monthKey))
    .sort((a, b) => b.createdAt - a.createdAt)
}

/** Short weekday + day-of-month labels for a day, e.g. { weekday: "Mon", day: "6" }. */
export function dayLabels(date: Date): { weekday: string; day: string } {
  return { weekday: format(date, "EEE"), day: format(date, "d") }
}

/** Capture time-of-day label for a moment, e.g. "9:14 AM". */
export function formatTime(epochMs: number): string {
  return format(new Date(epochMs), "h:mm a")
}
