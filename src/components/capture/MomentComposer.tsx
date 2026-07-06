import { useState } from "react"
import { toast } from "sonner"
import { Image, Link as LinkIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/store/hooks"
import { addMoment } from "@/store/momentsSlice"
import { putImage } from "@/lib/image-store"
import { MOOD_PRESETS } from "@/data/categories"
import { useMomentComposer } from "./useMomentComposer"
import { CategoryPicker } from "./CategoryPicker"
import { ProjectPicker } from "./ProjectPicker"
import { ScreenshotInput } from "./ScreenshotInput"

interface MomentComposerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialDate: string
}

export function MomentComposer({
  open,
  onOpenChange,
  initialDate,
}: MomentComposerProps) {
  const dispatch = useAppDispatch()
  const { values, set, canSubmit } = useMomentComposer({ date: initialDate })
  const [showScreenshot, setShowScreenshot] = useState(false)
  const [showLink, setShowLink] = useState(false)
  const isMood = values.category === "mood"

  const removeScreenshot = () => {
    set("file", null)
    setShowScreenshot(false)
  }
  const removeLink = () => {
    set("url", "")
    setShowLink(false)
  }

  const handleSubmit = async () => {
    if (!canSubmit) return
    let imageId: string | undefined
    if (values.file) imageId = await putImage(values.file)
    const url = values.url.trim()
    dispatch(
      addMoment({
        text: values.text.trim(),
        url: url.length > 0 ? url : undefined,
        imageId,
        projectId: values.projectId,
        category: values.category,
        date: values.date,
      }),
    )
    toast.success("Moment logged")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-el="capture-composer"
        className="sm:max-w-lg"
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit()
        }}
      >
        <DialogHeader>
          <DialogTitle>Log a moment</DialogTitle>
        </DialogHeader>

        {isMood && (
          <div className="flex flex-wrap gap-1.5" data-el="capture-composer-mood-presets">
            {MOOD_PRESETS.map((mood) => (
              <button
                key={mood}
                type="button"
                onClick={() => set("text", mood)}
                className={cn(
                  "rounded-full border px-3 py-1 text-sm transition-colors",
                  values.text === mood
                    ? "border-transparent bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                    : "border-border text-muted-foreground hover:bg-accent",
                )}
              >
                {mood}
              </button>
            ))}
          </div>
        )}

        <Textarea
          data-el="capture-composer-text"
          placeholder={isMood ? "How did the day feel?" : "What happened?"}
          value={values.text}
          onChange={(e) => set("text", e.target.value)}
          rows={3}
        />

        {/* Optional attachments — revealed on demand */}
        {showScreenshot && (
          <div className="relative">
            <ScreenshotInput file={values.file} onChange={(f) => set("file", f)} />
            <button
              type="button"
              onClick={removeScreenshot}
              aria-label="Remove screenshot field"
              className="absolute -top-1 -right-1 rounded-full border bg-background p-0.5 text-muted-foreground shadow-sm hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          </div>
        )}
        {showLink && (
          <div className="flex items-center gap-2">
            <Input
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
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {!showScreenshot && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-el="capture-composer-attach-screenshot"
              onClick={() => setShowScreenshot(true)}
            >
              <Image className="size-3.5" /> Attach screenshot
            </Button>
          )}
          {!showLink && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-el="capture-composer-add-link"
              onClick={() => setShowLink(true)}
            >
              <LinkIcon className="size-3.5" /> Add link
            </Button>
          )}
        </div>

        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label>Category</Label>
            <CategoryPicker
              value={values.category}
              onChange={(c) => set("category", c)}
            />
          </div>
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

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            data-el="capture-composer-save"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            Save moment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
