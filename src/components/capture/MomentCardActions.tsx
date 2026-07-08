import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { useAppDispatch } from "@/store/hooks"
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
import { MomentComposer } from "./MomentComposer"

/** Edit / delete controls for a moment card. Hidden until the card is hovered
 * or focused (the parent card owns the `group` that reveals this). */
export function MomentCardActions({ moment }: { moment: Moment }) {
  const dispatch = useAppDispatch()
  const [editing, setEditing] = useState(false)

  return (
    <div className="flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
      <button
        type="button"
        onClick={() => setEditing(true)}
        aria-label="Edit moment"
        data-el="capture-moment-card-edit"
        className="flex size-11 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <Pencil className="size-3.5" />
      </button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            aria-label="Delete moment"
            data-el="capture-moment-card-delete"
            className="flex size-11 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
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
              variant="destructive"
              onClick={() => dispatch(deleteMoment(moment.id))}
            >
              Delete moment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
