import { Download } from "lucide-react"
import { useMomentImage } from "@/components/capture/useMomentImage"
import { downloadImage } from "@/lib/download"
import type { Moment } from "@/types/review"

/** A single screenshot tile with hover-to-download. */
export function GalleryImage({
  moment,
  baseName,
}: {
  moment: Moment
  baseName: string
}) {
  const url = useMomentImage(moment.imageId)

  return (
    <figure
      data-el="review-gallery-item"
      className="group relative overflow-hidden rounded-lg border bg-muted"
    >
      {url ? (
        <img src={url} alt={moment.text || "Screenshot"} className="h-40 w-full object-cover" />
      ) : (
        <div className="h-40 w-full animate-pulse bg-muted" />
      )}
      <button
        type="button"
        onClick={() => moment.imageId && downloadImage(moment.imageId, baseName)}
        aria-label="Download screenshot"
        className="absolute top-2 right-2 rounded-md bg-background/80 p-2.5 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none hover:bg-background"
      >
        <Download className="size-4" />
      </button>
    </figure>
  )
}
