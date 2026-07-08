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
}

/** A row of selectable colored category chips (Dovetail-style). */
export function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  return (
    <div
      data-el="capture-composer-category-picker"
      role="radiogroup"
      aria-label="Category"
      className="flex flex-wrap gap-1.5"
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
            onClick={() => onChange(id)}
            style={active ? surface.style : undefined}
            className={cn(
              "inline-flex items-center gap-1 rounded-md border px-2.5 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
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
