import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CATEGORY_CONFIG } from "@/data/categories"
import type { Category, Project } from "@/types/review"

export function CategoryChip({
  category,
  className,
  ...props
}: {
  category: Category
  className?: string
} & React.ComponentProps<typeof Badge>) {
  const meta = CATEGORY_CONFIG[category]
  const Icon = meta.icon
  return (
    <Badge
      className={cn("gap-1 border-transparent", meta.chipClass, className)}
      {...props}
    >
      <Icon data-icon="inline-start" aria-hidden="true" />
      {meta.label}
    </Badge>
  )
}

export function ProjectChip({
  project,
  className,
}: {
  project: Project | undefined
  className?: string
}) {
  if (!project) return null
  return (
    <Badge variant="outline" className={cn("gap-1.5", className)}>
      <span
        aria-hidden="true"
        className="size-2 rounded-full"
        style={{ backgroundColor: project.color }}
      />
      {project.name}
    </Badge>
  )
}
