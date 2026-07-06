import { useEffect, useMemo, useRef } from "react"
import { ImagePlus, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScreenshotInputProps {
  file: File | null
  onChange: (file: File | null) => void
}

/** Paste-or-upload image drop zone with a live preview. */
export function ScreenshotInput({ file, onChange }: ScreenshotInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const preview = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  )

  // Revoke the object URL when it changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

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
          onClick={() => onChange(null)}
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
