import { useState } from "react"
import { toast } from "sonner"
import { Check, Image, Link as LinkIcon, X } from "lucide-react"
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
import { CATEGORY_CONFIG, MOOD_PRESETS } from "@/data/categories"
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
    if (values.file) imageId = await putImage(values.file)
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
          <Label>Category</Label>
          <CategoryPicker
            value={values.category}
            onChange={(c) => set("category", c)}
          />
        </div>

        {isMood && (
          <div className="flex flex-wrap gap-1.5" data-el="capture-composer-mood-presets">
            {MOOD_PRESETS.map((mood) => {
              const active = values.text === mood
              return (
                <button
                  key={mood}
                  type="button"
                  onClick={() => set("text", mood)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
                    active
                      ? cn("border-transparent font-medium", CATEGORY_CONFIG.mood.chipClass)
                      : "border-border text-muted-foreground hover:bg-accent",
                  )}
                >
                  {active && <Check className="size-3.5" aria-hidden="true" />}
                  {mood}
                </button>
              )
            })}
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
            <Label>Attachments</Label>
            <div className="relative">
              <ScreenshotInput
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
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => setShowScreenshot(true)}
              >
                <Image className="size-3.5" /> Attach screenshot
              </Button>
            )}
            {!showLink && (
              <Button
                type="button"
                variant="link"
                size="sm"
                data-el="capture-composer-add-link"
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => setShowLink(true)}
              >
                <LinkIcon className="size-3.5" /> Add link
              </Button>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label>Project</Label>
            <ProjectPicker
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
