import { useState } from "react"
import { toast } from "sonner"
import { Image, Link as LinkIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/store/hooks"
import { addMoment, updateMoment } from "@/store/momentsSlice"
import { deleteImage, putImage } from "@/lib/image-store"
import { MOOD_PRESETS, categorySurface } from "@/data/categories"
import type { Moment } from "@/types/review"
import { useMomentComposer } from "./useMomentComposer"
import { useMomentImage } from "./useMomentImage"
import { CategoryPicker } from "./CategoryPicker"
import { ProjectPicker } from "./ProjectPicker"
import { ScreenshotInput } from "./ScreenshotInput"

interface MomentComposerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialDate: string
  /** When provided, the dialog edits this moment instead of creating a new one. */
  moment?: Moment
}

export function MomentComposer({
  open,
  onOpenChange,
  initialDate,
  moment,
}: MomentComposerProps) {
  const dispatch = useAppDispatch()
  const isEdit = moment !== undefined
  const { values, set, canSubmit } = useMomentComposer({
    date: initialDate,
    moment,
  })
  const existingImageUrl = useMomentImage(values.existingImageId)
  const [showScreenshot, setShowScreenshot] = useState(
    () => values.existingImageId !== undefined,
  )
  const [showLink, setShowLink] = useState(() => values.url.trim().length > 0)
  const isMood = values.category === "mood"

  const removeScreenshot = () => {
    set("file", null)
    set("existingImageId", undefined)
    setShowScreenshot(false)
  }
  const removeLink = () => {
    set("url", "")
    setShowLink(false)
  }

  const handleSubmit = async () => {
    if (!canSubmit) return
    const url = values.url.trim()
    // A new file wins; otherwise keep whatever existing image survived edits.
    let imageId = values.existingImageId
    try {
      if (values.file) imageId = await putImage(values.file)
    } catch {
      // Surface the failure instead of silently dropping it and closing the sheet.
      toast.error("Couldn't save the screenshot. Please try again.")
      return
    }
    // Release the previous blob if it was replaced or removed.
    if (isEdit && moment.imageId && moment.imageId !== imageId) {
      deleteImage(moment.imageId)
    }

    const fields = {
      text: values.text.trim(),
      url: url.length > 0 ? url : undefined,
      imageId,
      projectId: values.projectId,
      category: values.category,
      // Mood is a feeling tag; only carry it for mood moments.
      mood: values.category === "mood" ? values.mood : undefined,
      date: values.date,
    }

    if (isEdit) {
      dispatch(updateMoment({ id: moment.id, changes: fields }))
      toast.success("Moment updated")
    } else {
      dispatch(addMoment(fields))
      toast.success("Moment logged")
    }
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        data-el="capture-composer"
        className="w-full gap-0 p-0 sm:max-w-lg"
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit()
        }}
      >
        <SheetHeader className="border-b">
          <SheetTitle>{isEdit ? "Edit moment" : "Log a moment"}</SheetTitle>
          <SheetDescription>
            Capture a note, screenshot, or link — pick a category to file it.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <div className="grid gap-1.5">
            <Label id="composer-category-label">Category</Label>
            <CategoryPicker
              labelledBy="composer-category-label"
              value={values.category}
              onChange={(c) => set("category", c)}
            />
          </div>

          {isMood && (
            <div className="grid gap-1.5">
              <Label id="composer-mood-label">Feeling</Label>
              <div
                role="radiogroup"
                aria-labelledby="composer-mood-label"
                className="grid grid-cols-3 gap-1.5"
                data-el="capture-composer-mood-presets"
                onKeyDown={(e) => {
                  // One Tab stop; arrows move (and select) between feelings,
                  // matching the native radiogroup pattern (see CategoryPicker).
                  const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"]
                  if (!keys.includes(e.key)) return
                  e.preventDefault()
                  const labels: string[] = MOOD_PRESETS.map((m) => m.label)
                  const currentIndex = values.mood ? labels.indexOf(values.mood) : 0
                  const delta =
                    e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1
                  const nextIndex =
                    (currentIndex + delta + labels.length) % labels.length
                  set("mood", labels[nextIndex])
                  const radios =
                    e.currentTarget.querySelectorAll<HTMLButtonElement>(
                      "[role=radio]",
                    )
                  radios[nextIndex]?.focus()
                }}
              >
                {MOOD_PRESETS.map(({ label, emoji }) => {
                  const active = values.mood === label
                  // Selected tile uses the same warm mood surface as the active
                  // category chip and the moment-card header band, so the whole
                  // mood language stays in one key.
                  const surface = categorySurface("mood")
                  return (
                    <button
                      key={label}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      // Roving tabindex: the selected tile (or the first, when
                      // none is chosen) is the group's single Tab stop.
                      tabIndex={
                        active || (!values.mood && label === MOOD_PRESETS[0].label)
                          ? 0
                          : -1
                      }
                      // Tapping the selected feeling again clears it.
                      onClick={() => set("mood", active ? undefined : label)}
                      style={active ? surface.style : undefined}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
                        active
                          ? surface.className
                          : "border-border text-muted-foreground hover:bg-accent",
                      )}
                    >
                      <span aria-hidden="true" className="text-xl leading-none">
                        {emoji}
                      </span>
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="grid gap-1.5">
            <Label htmlFor="moment-note">Note</Label>
            <Textarea
              id="moment-note"
              data-el="capture-composer-text"
              placeholder={isMood ? "How did the day feel?" : "What happened?"}
              value={values.text}
              onChange={(e) => set("text", e.target.value)}
              rows={3}
            />
          </div>

          {/* Optional attachments — revealed on demand */}
          {showScreenshot && (
            <div className="grid gap-1.5">
              <Label id="composer-attachments-label">Attachments</Label>
              <div className="relative">
                <ScreenshotInput
                  labelledBy="composer-attachments-label"
                  file={values.file}
                  onChange={(f) => set("file", f)}
                  existingUrl={existingImageUrl}
                  onRemoveExisting={() => set("existingImageId", undefined)}
                />
                <button
                  type="button"
                  onClick={removeScreenshot}
                  aria-label="Remove screenshot field"
                  className="absolute -top-2 -right-2 flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          )}
          {showLink && (
            <div className="grid gap-1.5">
              <Label htmlFor="moment-url">Link</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="moment-url"
                  data-el="capture-composer-url"
                  placeholder="https://…"
                  value={values.url}
                  onChange={(e) => set("url", e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={removeLink}
                  aria-label="Remove link field"
                  className="flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          )}

          {(!showScreenshot || !showLink) && (
            <div
              data-el="capture-composer-attach-actions"
              className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground"
            >
              {!showScreenshot && (
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  data-el="capture-composer-attach-screenshot"
                  className="h-11 gap-1.5 px-0 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowScreenshot(true)}
                >
                  <Image className="size-3.5" aria-hidden="true" /> Attach screenshot
                </Button>
              )}
              {!showLink && (
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  data-el="capture-composer-add-link"
                  className="h-11 gap-1.5 px-0 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowLink(true)}
                >
                  <LinkIcon className="size-3.5" aria-hidden="true" /> Add link
                </Button>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label id="composer-project-label">Project</Label>
              <ProjectPicker
                labelledBy="composer-project-label"
                value={values.projectId}
                onChange={(p) => set("projectId", p)}
                allowNone={isMood}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="moment-date">Date</Label>
              <Input
                id="moment-date"
                data-el="capture-composer-date"
                type="date"
                value={values.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </div>
          </div>
        </div>

        <SheetFooter className="flex-row justify-end gap-2 border-t">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            data-el="capture-composer-save"
            className="bg-interactive text-interactive-foreground hover:bg-interactive/90"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {isEdit ? "Save changes" : "Save moment"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
