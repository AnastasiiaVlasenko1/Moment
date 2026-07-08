import { Link } from "react-router"
import { CalendarPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useReviewAssembly } from "./useReviewAssembly"
import { MonthPicker } from "./MonthPicker"
import { AiSummarySection } from "./AiSummarySection"
import { WorkloadOverview } from "./WorkloadOverview"
import { ProjectHighlights } from "./ProjectHighlights"
import { LearningSection } from "./LearningSection"
import { MoodSection } from "./MoodSection"
import { ScreenshotGallery } from "./ScreenshotGallery"

/** Composed month-end review: month picker + assembled, copy-ready sections. */
export function ReviewBuilder() {
  const { monthKey, model, goPrevMonth, goNextMonth, goThisMonth } =
    useReviewAssembly()

  return (
    <div data-el="review-builder" className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-handwritten text-4xl leading-none">Monthly review</h1>
          <p className="text-sm text-muted-foreground">
            Copy each section into your Figma Slides template.
          </p>
        </div>
        <MonthPicker
          monthKey={monthKey}
          onPrev={goPrevMonth}
          onNext={goNextMonth}
          onThisMonth={goThisMonth}
        />
      </div>

      {model.totalMoments === 0 ? (
        <Empty data-el="review-empty" className="rounded-xl border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CalendarPlus />
            </EmptyMedia>
            <EmptyTitle>No moments this month</EmptyTitle>
            <EmptyDescription>
              Nothing was logged for {model.monthLabel}. Capture a few moments and
              they'll assemble here.
            </EmptyDescription>
          </EmptyHeader>
          <Button asChild variant="interactive">
            <Link to="/">Go to capture</Link>
          </Button>
        </Empty>
      ) : (
        <>
          <WorkloadOverview model={model} />
          <AiSummarySection key={monthKey} model={model} />
          <ProjectHighlights model={model} />
          <LearningSection model={model} />
          <MoodSection model={model} />
          <ScreenshotGallery model={model} />
        </>
      )}
    </div>
  )
}
