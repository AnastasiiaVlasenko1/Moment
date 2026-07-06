import { cn } from "@/lib/utils"
import { CATEGORY_CONFIG, CATEGORY_ORDER } from "@/data/categories"
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
      className="flex flex-wrap gap-1.5"
    >
      {CATEGORY_ORDER.map((id) => {
        const meta = CATEGORY_CONFIG[id]
        const Icon = meta.icon
        const active = id === value
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-sm transition-colors",
              active
                ? cn("border-transparent font-medium", meta.chipClass)
                : "border-border text-muted-foreground hover:bg-accent",
            )}
          >
            <Icon className="size-3.5" />
            {meta.label}
          </button>
        )
      })}
    </div>
  )
}
