import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { CATEGORY_CONFIG } from "@/data/categories"
import { formatHighlightsText, type ReviewModel } from "@/lib/assembly"
import type { Category, Moment } from "@/types/review"
import { CopyableSection } from "./CopyableSection"

const TOP_N = 3

interface Entry {
  moment: Moment
  category: Category
}

/** Flatten a project's category groups into a single newest-first line list. */
function flatten(groups: { category: Category; moments: Moment[] }[]): Entry[] {
  return groups
    .flatMap((g) => g.moments.map((moment) => ({ moment, category: g.category })))
    .sort((a, b) => b.moment.createdAt - a.moment.createdAt)
}

function HighlightLine({ moment, category }: Entry) {
  return (
    <div className="flex items-start gap-2 py-1 text-sm">
      <span
        aria-hidden="true"
        className="mt-1.5 size-2 shrink-0 rounded-full"
        style={{ backgroundColor: CATEGORY_CONFIG[category].chartToken }}
        title={CATEGORY_CONFIG[category].label}
      />
      <span className="min-w-0 break-words">{moment.text || "Screenshot"}</span>
    </div>
  )
}

/** Per-project highlights, trimmed to the 3 most recent with a "Show more" reveal. */
export function ProjectHighlights({ model }: { model: ReviewModel }) {
  if (model.highlights.length === 0) return null

  return (
    <CopyableSection
      title="Project highlights"
      dataEl="review-highlights"
      copyValue={formatHighlightsText(model.highlights)}
    >
      <div className="flex flex-col gap-5">
        {model.highlights.map((h) => {
          const entries = flatten(h.groups)
          const top = entries.slice(0, TOP_N)
          const rest = entries.slice(TOP_N)
          return (
            <div key={h.project.id} data-el="review-highlights-project">
              <div className="mb-1 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: h.project.color }}
                />
                <h3 className="font-medium">{h.project.name}</h3>
                <span className="text-muted-foreground text-xs">
                  {h.count} moment{h.count === 1 ? "" : "s"}
                </span>
              </div>
              <div className="pl-4">
                {top.map((e) => (
                  <HighlightLine key={e.moment.id} {...e} />
                ))}
                {rest.length > 0 && (
                  <Collapsible>
                    <CollapsibleContent>
                      {rest.map((e) => (
                        <HighlightLine key={e.moment.id} {...e} />
                      ))}
                    </CollapsibleContent>
                    <CollapsibleTrigger
                      data-el="review-highlights-more"
                      className="text-muted-foreground hover:text-foreground focus-visible:ring-ring mt-1 inline-flex items-center gap-1 rounded text-xs font-medium focus-visible:ring-2 focus-visible:outline-none [&[data-state=open]>svg]:rotate-90 [&[data-state=open]_.more]:hidden [&[data-state=closed]_.less]:hidden"
                    >
                      <ChevronRight className="size-3.5 transition-transform" />
                      <span className="more">Show {rest.length} more</span>
                      <span className="less">Show less</span>
                    </CollapsibleTrigger>
                  </Collapsible>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </CopyableSection>
  )
}
