import { useEffect, useMemo, useRef } from "react"
import { ImagePlus, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScreenshotInputProps {
  file: File | null
  onChange: (file: File | null) => void
  /** Object URL for an already-saved screenshot (edit mode), shown when no new file is chosen. */
  existingUrl?: string | null
  /** Called when the user removes the already-saved screenshot. */
  onRemoveExisting?: () => void
}

/** Paste-or-upload image drop zone with a live preview. */
export function ScreenshotInput({
  file,
  onChange,
  existingUrl,
  onRemoveExisting,
}: ScreenshotInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  // Only the newly-selected file owns an object URL that needs revoking here;
  // `existingUrl` is owned by the caller.
  const filePreview = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  )

  // Revoke the object URL when it changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview)
    }
  }, [filePreview])

  const preview = filePreview ?? existingUrl ?? null
  const removePreview = () => (file ? onChange(null) : onRemoveExisting?.())

  const handlePaste = (e: React.ClipboardEvent) => {
    const item = Array.from(e.clipboardData.items).find((i) =>
      i.type.startsWith("image/"),
    )
    const pasted = item?.getAsFile()
    if (pasted) onChange(pasted)
  }

  if (preview) {
    return (
      <div
        data-el="capture-composer-screenshot-preview"
        className="relative overflow-hidden rounded-lg border"
      >
        <img src={preview} alt="Screenshot preview" className="max-h-56 w-full object-contain" />
        <button
          type="button"
          onClick={removePreview}
          className="absolute top-2 right-2 rounded-md bg-background/80 p-1 text-foreground shadow-sm hover:bg-background"
          aria-label="Remove screenshot"
        >
          <X className="size-4" />
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onPaste={handlePaste}
      data-el="capture-composer-screenshot-dropzone"
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-8 text-sm text-muted-foreground",
        "hover:bg-accent focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
      )}
    >
      <ImagePlus className="size-6" />
      <span>Click to upload, or paste an image here</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </button>
  )
}
