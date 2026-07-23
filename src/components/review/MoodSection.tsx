import { format, parseISO } from "date-fns"
import { formatMomentsText, type ReviewModel } from "@/lib/assembly"
import { moodEmoji } from "@/data/categories"
import { CopyableSection } from "./CopyableSection"

export function MoodSection({ model }: { model: ReviewModel }) {
  if (model.moods.length === 0) return null

  // Chronological timeline (oldest → newest).
  const timeline = [...model.moods].sort((a, b) =>
    a.date < b.date ? -1 : a.date > b.date ? 1 : a.createdAt - b.createdAt,
  )

  // Nothing carries a feeling or a note — explain the sparse logging instead of
  // listing blank rows.
  const allUnlabeled = model.moods.every((m) => !m.mood && !m.text.trim())

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
      )}
    </CopyableSection>
  )
}
