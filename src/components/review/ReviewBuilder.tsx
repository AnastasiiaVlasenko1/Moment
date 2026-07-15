import { Link } from "react-router"
import { CalendarPlus, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { copyText } from "@/lib/clipboard"
import { formatReviewSummary } from "@/lib/assembly"
import { useReviewAssembly } from "./useReviewAssembly"
import { TimeRangeControl } from "./TimeRangeControl"
import { ReviewFilters } from "./ReviewFilters"
import { StatsOverview } from "./StatsOverview"
import { AiSummarySection } from "./AiSummarySection"
import { ProjectHighlights } from "./ProjectHighlights"
import { LearningSection } from "./LearningSection"
import { MoodSection } from "./MoodSection"
import { ScreenshotGallery } from "./ScreenshotGallery"

/** Composed review dashboard: range + filters, at-a-glance cards, then sections. */
export function ReviewBuilder() {
  const {
    model,
    rangeType,
    customRange,
    setRange,
    filters,
    setSearch,
    setProjectId,
    setCategory,
  } = useReviewAssembly()

  return (
    <div data-el="review-builder" className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="font-handwritten text-4xl leading-none">Monthly review</h1>
        <div className="flex items-center gap-2">
          <TimeRangeControl
            rangeType={rangeType}
            customRange={customRange}
            onChange={setRange}
          />
          <Button
            variant="interactive"
            size="sm"
            data-el="review-copy-summary"
            disabled={model.totalMoments === 0}
            onClick={() =>
              copyText(formatReviewSummary(model), "Summary copied")
            }
          >
            <Copy className="size-3.5" /> Copy summary
          </Button>
        </div>
      </div>

      <ReviewFilters
        search={filters.search}
        onSearch={setSearch}
        projectId={filters.projectId}
        onProject={setProjectId}
        category={filters.category}
        onCategory={setCategory}
      />

      {model.totalMoments === 0 ? (
        <Empty data-el="review-empty" className="rounded-xl border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CalendarPlus />
            </EmptyMedia>
            <EmptyTitle>No moments here</EmptyTitle>
            <EmptyDescription>
              Nothing matches {model.monthLabel}
              {filters.search || filters.projectId !== "all" || filters.category !== "all"
                ? " with the current filters"
                : ""}
              . Capture a few moments — or widen the range.
            </EmptyDescription>
          </EmptyHeader>
          <Button asChild variant="interactive">
            <Link to="/">Go to capture</Link>
          </Button>
        </Empty>
      ) : (
        <>
          <StatsOverview model={model} />
          <AiSummarySection key={model.monthKey} model={model} />
          <ProjectHighlights model={model} />
          <LearningSection model={model} />
          <MoodSection model={model} />
          <ScreenshotGallery model={model} />
        </>
      )}
    </div>
  )
}
