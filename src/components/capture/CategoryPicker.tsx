import { cn } from "@/lib/utils"
import {
  CATEGORY_CONFIG,
  CATEGORY_ORDER,
  categorySurface,
} from "@/data/categories"
import type { Category } from "@/types/review"

interface CategoryPickerProps {
  value: Category
  onChange: (category: Category) => void
  /** id of a visible label to name the group; falls back to a built-in label. */
  labelledBy?: string
}

/** A row of selectable colored category chips (Dovetail-style). */
export function CategoryPicker({ value, onChange, labelledBy }: CategoryPickerProps) {
  return (
    <div
      data-el="capture-composer-category-picker"
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : "Category"}
      className="flex flex-wrap gap-1.5"
      onKeyDown={(e) => {
        const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"]
        if (!keys.includes(e.key)) return
        e.preventDefault()
        const currentIndex = CATEGORY_ORDER.indexOf(value)
        const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1
        const nextIndex =
          (currentIndex + delta + CATEGORY_ORDER.length) % CATEGORY_ORDER.length
        onChange(CATEGORY_ORDER[nextIndex])
        const radios =
          e.currentTarget.querySelectorAll<HTMLButtonElement>("[role=radio]")
        radios[nextIndex]?.focus()
      }}
    >
      {CATEGORY_ORDER.map((id) => {
        const meta = CATEGORY_CONFIG[id]
        const Icon = meta.icon
        const active = id === value
        const surface = categorySurface(id)
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(id)}
            style={active ? surface.style : undefined}
            className={cn(
              "inline-flex items-center gap-1 rounded-md border px-2.5 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
              active
                ? cn("font-medium", surface.className)
                : "border-border text-muted-foreground hover:bg-accent",
            )}
          >
            <Icon aria-hidden="true" className="size-3.5" />
            {meta.label}
          </button>
        )
      })}
    </div>
  )
}
