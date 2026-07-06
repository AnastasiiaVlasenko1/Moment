import { CATEGORY_CONFIG } from "@/data/categories"
import { formatHighlightsText, type ReviewModel } from "@/lib/assembly"
import { CopyableSection } from "./CopyableSection"
import { MomentList } from "./MomentList"

export function ProjectHighlights({ model }: { model: ReviewModel }) {
  if (model.highlights.length === 0) return null

  return (
    <CopyableSection
      title="Project highlights"
      dataEl="review-highlights"
      copyValue={formatHighlightsText(model.highlights)}
    >
      <div className="flex flex-col gap-6">
        {model.highlights.map((h) => (
          <div key={h.project.id} data-el="review-highlights-project">
            <div className="mb-2 flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: h.project.color }}
              />
              <h3 className="font-medium">{h.project.name}</h3>
              <span className="text-xs text-muted-foreground">
                {h.count} moment{h.count === 1 ? "" : "s"}
              </span>
            </div>
            <div className="flex flex-col gap-3 pl-4">
              {h.groups.map((g) => (
                <div key={g.category}>
                  <div className="mb-1 text-xs font-medium text-muted-foreground uppercase">
                    {CATEGORY_CONFIG[g.category].label}
                  </div>
                  <MomentList moments={g.moments} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CopyableSection>
  )
}
