import { ExternalLink, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { deleteMoment } from "@/store/momentsSlice"
import { CATEGORY_CONFIG } from "@/data/categories"
import type { Moment } from "@/types/review"
import { CategoryChip, ProjectChip } from "@/components/shared/MomentTags"
import { useMomentImage } from "./useMomentImage"

/** A single logged moment: text, screenshot, or link, with its tags. */
export function MomentCard({ moment }: { moment: Moment }) {
  const dispatch = useAppDispatch()
  const project = useAppSelector((s) =>
    s.projects.items.find((p) => p.id === moment.projectId),
  )
  const imageUrl = useMomentImage(moment.imageId)
  const accent = CATEGORY_CONFIG[moment.category].chartToken

  return (
    <div
      data-el="capture-moment-card"
      className="group relative rounded-md border bg-card p-2.5 text-sm shadow-xs"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      <button
        type="button"
        onClick={() => dispatch(deleteMoment(moment.id))}
        aria-label="Delete moment"
        className="absolute top-1.5 right-1.5 rounded p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
      >
        <Trash2 className="size-3.5" />
      </button>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={moment.text || "Screenshot"}
          className="mb-2 max-h-32 w-full rounded object-cover"
        />
      )}

      {moment.text && (
        <p className="pr-4 break-words">{moment.text}</p>
      )}

      {moment.url && (
        <a
          href={moment.url}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "flex items-start gap-1 pr-4 text-primary hover:underline",
            moment.text && "mt-1",
          )}
        >
          <ExternalLink className="mt-0.5 size-3.5 shrink-0" />
          <span className="break-all">{moment.url}</span>
        </a>
      )}

      <div className="mt-2 flex flex-wrap gap-1">
        <CategoryChip category={moment.category} className="text-[11px]" />
        <ProjectChip project={project} className="text-[11px]" />
      </div>
    </div>
  )
}
