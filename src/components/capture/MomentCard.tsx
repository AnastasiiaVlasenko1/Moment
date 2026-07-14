import type { CSSProperties } from "react"
import { ExternalLink } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { formatTime } from "@/lib/dates"
import { cn } from "@/lib/utils"
import {
  CATEGORY_CONFIG,
  categoryAccentText,
  categorySurface,
  moodEmoji,
} from "@/data/categories"
import type { Moment } from "@/types/review"
import { ProjectChip } from "@/components/shared/MomentTags"
import { useMomentImage } from "./useMomentImage"
import { MomentCardActions } from "./MomentCardActions"

// Notebook ruling: a hairline sits under each line of text — none above the
// first line, one closing the last — tinted with the category color.
const RULE = "color-mix(in srgb, var(--cat) 20%, var(--border))"
// An integer-pixel period is essential: a fractional line-height (e.g. 1.6rem =
// 25.6px) lets Safari's per-line pixel snapping drift away from the continuous
// gradient, so rules stop sitting under the text further down the card.
const ruledNote: CSSProperties = {
  lineHeight: "26px",
  backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 25px, ${RULE} 25px, ${RULE} 26px)`,
}

/** A single logged moment as a diary entry: a category-tinted header band with
 * the capture time, the note on ruled paper, then any link, screenshot, and
 * project. Hovering reveals edit/delete. */
export function MomentCard({ moment }: { moment: Moment }) {
  const project = useAppSelector((s) =>
    s.projects.items.find((p) => p.id === moment.projectId),
  )
  const imageUrl = useMomentImage(moment.imageId)
  const meta = CATEGORY_CONFIG[moment.category]
  const surface = categorySurface(moment.category)
  const Icon = meta.icon

  return (
    <div
      data-el="capture-moment-card"
      className="group shrink-0 overflow-hidden rounded-lg border bg-card transition-shadow shadow-[0_2px_8px_-4px_rgba(90,70,45,0.10)] hover:shadow-[0_10px_28px_-10px_rgba(90,70,45,0.18)] dark:shadow-[0_2px_8px_-4px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_12px_32px_-10px_rgba(0,0,0,0.55)]"
      style={surface.style}
    >
      <div
        data-el="capture-moment-card-band"
        className={cn(
          "flex items-center justify-between gap-2 border-b px-2.5 py-1.5",
          surface.className,
        )}
      >
        <span
          data-el="capture-moment-card-category"
          className="flex min-w-0 items-center gap-1.5 text-xs font-bold tracking-wide uppercase"
        >
          <Icon aria-hidden="true" className="size-3.5 shrink-0" />
          <span className="truncate">{meta.label}</span>
        </span>
        <span
          data-el="capture-moment-card-time"
          className="font-handwritten shrink-0 text-lg leading-tight"
        >
          {formatTime(moment.createdAt)}
        </span>
      </div>

      <div className="px-2.5 pt-2 pb-2.5 text-sm">
        {moment.mood && (
          <span
            data-el="capture-moment-card-mood"
            // Outline tag: transparent fill + neutral border, with only the
            // label tinted in the category color — lighter than the header band.
            style={categoryAccentText(moment.category).style}
            className={cn(
              "mb-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-transparent px-2.5 py-1 text-xs font-medium",
              categoryAccentText(moment.category).className,
            )}
          >
            <span aria-hidden="true">{moodEmoji(moment.mood)}</span>
            {moment.mood}
          </span>
        )}

        {moment.text && (
          <p
            data-el="capture-moment-card-note"
            className="m-0 break-words"
            style={ruledNote}
          >
            {moment.text}
          </p>
        )}

        {imageUrl && (
          <img
            src={imageUrl}
            alt={moment.text || "Screenshot"}
            data-el="capture-moment-card-attachment"
            className="mt-2 aspect-[16/10] w-full rounded-md border object-cover"
          />
        )}

        <div className="mt-3 flex flex-col items-start gap-2">
          {moment.url && (
            <a
              href={moment.url}
              target="_blank"
              rel="noreferrer"
              data-el="capture-moment-card-link"
              className="flex max-w-full items-center gap-1 rounded-sm text-muted-foreground hover:text-link hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate" title={moment.url}>
                {moment.url}
              </span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
          )}

          <div className="flex w-full items-center justify-between gap-2">
            {project ? (
              <ProjectChip
                project={project}
                data-el="capture-moment-card-project"
              />
            ) : (
              <span />
            )}
            <MomentCardActions moment={moment} />
          </div>
        </div>
      </div>
    </div>
  )
}
