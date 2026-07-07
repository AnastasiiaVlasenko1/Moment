import { format, parseISO } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { formatMomentsText, type ReviewModel } from "@/lib/assembly"
import { CATEGORY_CONFIG } from "@/data/categories"
import { cn } from "@/lib/utils"
import { CopyableSection } from "./CopyableSection"

export function MoodSection({ model }: { model: ReviewModel }) {
  if (model.moods.length === 0) return null

  // Distribution by mood descriptor.
  const distribution = new Map<string, number>()
  for (const m of model.moods) {
    const key = m.text.trim() || "Unlabeled"
    distribution.set(key, (distribution.get(key) ?? 0) + 1)
  }
  const ranked = [...distribution.entries()].sort((a, b) => b[1] - a[1])

  // Chronological timeline (oldest → newest).
  const timeline = [...model.moods].sort((a, b) =>
    a.date < b.date ? -1 : a.date > b.date ? 1 : a.createdAt - b.createdAt,
  )

  return (
    <CopyableSection
      title="How the month felt"
      dataEl="review-mood"
      copyValue={formatMomentsText("How the month felt", model.moods)}
    >
      <div data-el="review-mood-distribution" className="mb-4 flex flex-wrap gap-1.5">
        {ranked.map(([label, count]) => (
          <Badge
            key={label}
            className={cn("gap-1.5 border-transparent", CATEGORY_CONFIG.mood.chipClass)}
          >
            {label}
            <span className="rounded-full bg-black/5 px-1.5 text-[11px] dark:bg-white/10">
              {count}
            </span>
          </Badge>
        ))}
      </div>

      <ol data-el="review-mood-timeline" className="flex flex-col gap-1.5 text-sm">
        {timeline.map((m) => (
          <li key={m.id} className="flex items-center gap-3">
            <span className="w-14 shrink-0 text-xs text-muted-foreground tabular-nums">
              {format(parseISO(m.date), "MMM d")}
            </span>
            <span>{m.text || "Unlabeled"}</span>
          </li>
        ))}
      </ol>
    </CopyableSection>
  )
}
