import type { CSSProperties } from "react"
import { ExternalLink } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { formatTime } from "@/lib/dates"
import { CATEGORY_CONFIG } from "@/data/categories"
import type { Moment } from "@/types/review"
import { ProjectChip } from "@/components/shared/MomentTags"
import { useMomentImage } from "./useMomentImage"
import { MomentCardActions } from "./MomentCardActions"

// Notebook ruling: a hairline sits under each line of text — none above the
// first line, one closing the last — tinted with the category color.
const RULE = "color-mix(in srgb, var(--cat) 20%, var(--border))"
const ruledNote: CSSProperties = {
  lineHeight: "1.6rem",
  backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent calc(1.6rem - 1px), ${RULE} calc(1.6rem - 1px), ${RULE} 1.6rem)`,
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
  const Icon = meta.icon

  return (
    <div
      data-el="capture-moment-card"
      className="group shrink-0 overflow-hidden rounded-lg border bg-card shadow-xs transition-shadow hover:shadow-md"
      style={{ "--cat": meta.chartToken } as CSSProperties}
    >
      <div
        data-el="capture-moment-card-band"
        className="flex items-center justify-between gap-2 border-b px-2.5 py-1.5 border-[color-mix(in_srgb,var(--cat)_45%,transparent)] bg-[color-mix(in_srgb,var(--cat)_32%,var(--card))]"
      >
        <span
          data-el="capture-moment-card-category"
          className="flex min-w-0 items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-[color-mix(in_srgb,var(--cat)_80%,var(--foreground))]"
        >
          <Icon aria-hidden="true" className="size-3.5 shrink-0" />
          <span className="truncate">{meta.label}</span>
        </span>
        <span
          data-el="capture-moment-card-time"
          className="font-handwritten shrink-0 text-lg leading-none text-[color-mix(in_srgb,var(--cat)_68%,var(--foreground))]"
        >
          {formatTime(moment.createdAt)}
        </span>
      </div>

      <div className="px-2.5 pt-2 pb-2.5 text-sm">
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
              className="flex max-w-full items-center gap-1 text-muted-foreground hover:text-link hover:underline"
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
