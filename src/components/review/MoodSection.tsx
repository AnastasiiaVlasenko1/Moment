import { format, parseISO } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { formatMomentsText, type ReviewModel } from "@/lib/assembly"
import { categoryAccentText, moodEmoji } from "@/data/categories"
import { cn } from "@/lib/utils"
import { CopyableSection } from "./CopyableSection"

export function MoodSection({ model }: { model: ReviewModel }) {
  if (model.moods.length === 0) return null

  // Distribution by feeling. Prefer the structured `mood` tag; fall back to the
  // note text for legacy moments logged before feelings were split out.
  const distribution = new Map<string, number>()
  for (const m of model.moods) {
    const key = (m.mood ?? m.text.trim()) || "Unlabeled"
    distribution.set(key, (distribution.get(key) ?? 0) + 1)
  }
  const ranked = [...distribution.entries()].sort((a, b) => b[1] - a[1])

  // Chronological timeline (oldest → newest).
  const timeline = [...model.moods].sort((a, b) =>
    a.date < b.date ? -1 : a.date > b.date ? 1 : a.createdAt - b.createdAt,
  )

  // Category-tinted label on a neutral outline, matching the moment-card tag.
  const moodAccent = categoryAccentText("mood")

  // The frequency chips only earn their place when a feeling actually repeats;
  // if every feeling appears once they just duplicate the dated timeline below.
  const hasRepeats = ranked.some(([, count]) => count > 1)

  // When nothing carries a feeling or a note, the section would collapse to a
  // single "Unlabeled" bucket and a column repeating that word — reads as a bug.
  const allUnlabeled = ranked.length === 1 && ranked[0][0] === "Unlabeled"

  return (
    <CopyableSection
      title="How the month felt"
      dataEl="review-mood"
      copyValue={formatMomentsText("How the month felt", model.moods)}
    >
      {allUnlabeled ? (
        <p data-el="review-mood-empty" className="text-sm text-muted-foreground">
          {model.moods.length} mood{" "}
          {model.moods.length === 1 ? "check-in was" : "check-ins were"} logged
          without a feeling or note.
        </p>
      ) : (
        <>
          {hasRepeats && (
            <div
              data-el="review-mood-distribution"
              className="mb-4 flex flex-wrap gap-1.5"
            >
              {ranked.map(([label, count]) => (
                <Badge
                  key={label}
                  variant="outline"
                  title={label}
                  style={moodAccent.style}
                  className={cn("max-w-full gap-1.5", moodAccent.className)}
                >
                  {moodEmoji(label) && (
                    <span aria-hidden="true">{moodEmoji(label)}</span>
                  )}
                  <span className="min-w-0 truncate">{label}</span>
                  <span className="shrink-0 rounded-full bg-black/5 px-1.5 text-xs dark:bg-white/10">
                    {count}
                  </span>
                </Badge>
              ))}
            </div>
          )}

          <ol
            data-el="review-mood-timeline"
            className="flex flex-col gap-1.5 text-sm"
          >
            {timeline.map((m) => {
              const note = m.text.trim()
              return (
                <li key={m.id} className="flex items-center gap-3">
                  <span className="w-14 shrink-0 text-xs text-muted-foreground tabular-nums">
                    {format(parseISO(m.date), "MMM d")}
                  </span>
                  <span className="flex min-w-0 items-center gap-1.5">
                    {m.mood && moodEmoji(m.mood) && (
                      <span aria-hidden="true">{moodEmoji(m.mood)}</span>
                    )}
                    <span className="font-medium">
                      {m.mood ?? (note || "Unlabeled")}
                    </span>
                    {m.mood && note && (
                      <span className="truncate text-muted-foreground">
                        — {note}
                      </span>
                    )}
                  </span>
                </li>
              )
            })}
          </ol>
        </>
      )}
    </CopyableSection>
  )
}
