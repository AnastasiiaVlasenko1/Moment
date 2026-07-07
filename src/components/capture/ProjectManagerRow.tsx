import { useState } from "react"
import { Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import { cn } from "@/lib/utils"
import { PROJECT_COLORS } from "@/data/categories"
import type { Project } from "@/types/review"

interface ProjectManagerRowProps {
  project: Project
  onRename: (name: string) => void
  onRecolor: (color: string) => void
  onDelete: () => void
}

/** A single editable project: recolor swatch, inline-renamable name, delete-with-confirm. */
export function ProjectManagerRow({
  project,
  onRename,
  onRecolor,
  onDelete,
}: ProjectManagerRowProps) {
  const [name, setName] = useState(project.name)
  const currentColorName =
    PROJECT_COLORS.find((c) => c.value === project.color)?.name

  const commitName = () => {
    const next = name.trim()
    if (next && next !== project.name) onRename(next)
    else setName(project.name)
  }

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={
              currentColorName
                ? `Change project color (currently ${currentColorName})`
                : "Change project color"
            }
            className="group/swatch flex size-8 shrink-0 items-center justify-center rounded-full"
          >
            <span
              className="size-4 rounded-full ring-offset-background transition-shadow group-hover/swatch:ring-2 group-hover/swatch:ring-ring group-hover/swatch:ring-offset-2"
              style={{ backgroundColor: project.color }}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
          <div className="flex gap-1.5">
            {PROJECT_COLORS.map((color) => {
              const active = color.value === project.color
              return (
                <button
                  key={color.value}
                  type="button"
                  aria-label={`Use ${color.name}`}
                  aria-pressed={active}
                  onClick={() => onRecolor(color.value)}
                  className="flex size-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: color.value }}
                >
                  {active && (
                    <Check className="size-4 text-white" aria-hidden="true" />
                  )}
                </button>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>

      <Input
        value={name}
        aria-label={`Rename ${project.name}`}
        onChange={(e) => setName(e.target.value)}
        onBlur={commitName}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur()
          if (e.key === "Escape") setName(project.name)
        }}
        className="h-8"
      />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Delete ${project.name}`}
            className={cn("size-8 shrink-0 text-muted-foreground hover:text-destructive")}
          >
            <Trash2 className="size-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{project.name}”?</AlertDialogTitle>
            <AlertDialogDescription>
              Moments filed under this project won't be deleted — they'll just
              become unassigned. This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
