import { useMemo } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAppSelector } from "@/store/hooks"
import { downloadImages } from "@/lib/download"
import type { Moment } from "@/types/review"
import type { ReviewModel } from "@/lib/assembly"
import { GalleryImage } from "./GalleryImage"

interface Group {
  key: string
  name: string
  color: string
  moments: Moment[]
}

export function ScreenshotGallery({ model }: { model: ReviewModel }) {
  const projects = useAppSelector((s) => s.projects.items)

  const groups = useMemo<Group[]>(() => {
    const byProject = new Map<string, Moment[]>()
    for (const m of model.screenshots) {
      const key = m.projectId ?? "__none__"
      byProject.set(key, [...(byProject.get(key) ?? []), m])
    }
    return [...byProject.entries()].map(([key, moments]) => {
      const project = projects.find((p) => p.id === key)
      return {
        key,
        name: project?.name ?? "Unassigned",
        color: project?.color ?? "var(--muted-foreground)",
        moments,
      }
    })
  }, [model.screenshots, projects])

  if (model.screenshots.length === 0) return null

  const downloadGroup = (group: Group) =>
    downloadImages(
      group.moments
        .filter((m) => m.imageId)
        .map((m, i) => ({ imageId: m.imageId!, baseName: `${group.name}-${i + 1}` })),
    )

  return (
    <Card data-el="review-gallery">
      <CardHeader>
        <CardTitle>Screenshots</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group.key} data-el="review-gallery-group">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: group.color }}
                />
                <h3 className="font-medium">{group.name}</h3>
                <span className="text-xs text-muted-foreground">
                  {group.moments.length} image
                  {group.moments.length === 1 ? "" : "s"}
                </span>
              </div>
              <CardAction>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadGroup(group)}
                >
                  <Download className="size-3.5" /> Download all
                </Button>
              </CardAction>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {group.moments.map((m) => (
                <GalleryImage
                  key={m.id}
                  moment={m}
                  baseName={`${group.name}-${m.id.slice(0, 6)}`}
                />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
