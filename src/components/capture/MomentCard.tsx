import { useState } from "react"
import { ExternalLink, Pencil, Trash2 } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { deleteMoment } from "@/store/momentsSlice"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Moment } from "@/types/review"
import { CategoryChip } from "@/components/shared/MomentTags"
import { useMomentImage } from "./useMomentImage"
import { MomentComposer } from "./MomentComposer"

/** A single logged moment: text, screenshot, or link, with its tags. */
export function MomentCard({ moment }: { moment: Moment }) {
  const dispatch = useAppDispatch()
  const project = useAppSelector((s) =>
    s.projects.items.find((p) => p.id === moment.projectId),
  )
  const imageUrl = useMomentImage(moment.imageId)
  const [editing, setEditing] = useState(false)

  return (
    <div
      data-el="capture-moment-card"
      className="group relative rounded-md border bg-card p-2.5 text-sm shadow-xs"
    >
      <div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-label="Edit moment"
          data-el="capture-moment-card-edit"
          className="flex size-9 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Pencil className="size-3.5" />
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              aria-label="Delete moment"
              data-el="capture-moment-card-delete"
              className="flex size-9 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <Trash2 className="size-3.5" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this moment?</AlertDialogTitle>
              <AlertDialogDescription>
                This removes the note, and any attached screenshot or link. This
                can't be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => dispatch(deleteMoment(moment.id))}
                className="bg-destructive text-white hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <CategoryChip
        category={moment.category}
        className="text-xs font-medium"
        data-el="capture-moment-card-category"
      />

      {project && (
        <p
          data-el="capture-moment-card-project"
          className="mt-1.5 font-semibold break-words"
        >
          {project.name}
        </p>
      )}

      {moment.text && (
        <p
          data-el="capture-moment-card-note"
          className="mt-1.5 pr-10 break-words"
        >
          {moment.text}
        </p>
      )}

      {moment.url && (
        <a
          href={moment.url}
          target="_blank"
          rel="noreferrer"
          data-el="capture-moment-card-link"
          aria-label={`${moment.url} (opens in new tab)`}
          className="mt-1.5 flex items-center gap-1 pr-10 text-link hover:underline"
        >
          <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="min-w-0 truncate">{moment.url}</span>
        </a>
      )}

      {imageUrl && (
        <img
          src={imageUrl}
          alt={moment.text || "Screenshot"}
          data-el="capture-moment-card-attachment"
          className="mt-1.5 max-h-20 rounded border object-cover"
        />
      )}

      {editing && (
        <MomentComposer
          open
          onOpenChange={setEditing}
          initialDate={moment.date}
          moment={moment}
        />
      )}
    </div>
  )
}
