import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppSelector } from "@/store/hooks"
import { CATEGORY_CONFIG, CATEGORY_ORDER } from "@/data/categories"
import type { Category } from "@/types/review"

interface ReviewFiltersProps {
  search: string
  onSearch: (value: string) => void
  projectId: string
  onProject: (value: string) => void
  category: Category | "all"
  onCategory: (value: Category | "all") => void
}

/** Search + project + category filters that narrow everything on the page. */
export function ReviewFilters({
  search,
  onSearch,
  projectId,
  onProject,
  category,
  onCategory,
}: ReviewFiltersProps) {
  const projects = useAppSelector((s) => s.projects.items)

  return (
    <div className="flex flex-wrap items-center gap-2" data-el="review-filters">
      <div className="relative min-w-52 flex-1">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search moments…"
          aria-label="Search moments"
          className="pl-9"
        />
      </div>
      <Select value={projectId} onValueChange={onProject}>
        <SelectTrigger className="w-40" aria-label="Filter by project">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All projects</SelectItem>
          {projects.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={category}
        onValueChange={(value) => onCategory(value as Category | "all")}
      >
        <SelectTrigger className="w-40" aria-label="Filter by category">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {CATEGORY_ORDER.map((c) => (
            <SelectItem key={c} value={c}>
              {CATEGORY_CONFIG[c].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
