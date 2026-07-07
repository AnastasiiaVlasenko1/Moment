import { AlertCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import type { ReviewModel } from "@/lib/assembly"
import { CopyableSection } from "./CopyableSection"
import { useReviewSummary } from "./useReviewSummary"

/** On-demand AI-written prose summary of the month (calls the backend Edge Function). */
export function AiSummarySection({ model }: { model: ReviewModel }) {
  const { status, summary, error, generate } = useReviewSummary(model)

  if (status === "done") {
    return (
      <CopyableSection
        title="AI summary"
        copyValue={summary}
        dataEl="review-ai-summary"
        action={
          <Button variant="ghost" size="sm" onClick={generate}>
            <Sparkles className="size-3.5" /> Regenerate
          </Button>
        }
      >
        <p
          data-el="review-ai-summary-text"
          className="text-sm leading-relaxed whitespace-pre-wrap"
        >
          {summary}
        </p>
      </CopyableSection>
    )
  }

  return (
    <Card data-el="review-ai-summary">
      <CardHeader>
        <CardTitle className="font-handwritten text-2xl leading-none">AI summary</CardTitle>
        <CardDescription>
          Turn this month's moments into a polished paragraph you can drop into
          your review.
        </CardDescription>
        <CardAction>
          <Button
            data-el="review-ai-summary-generate"
            size="sm"
            onClick={generate}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <Spinner className="size-3.5" /> Writing…
              </>
            ) : (
              <>
                <Sparkles className="size-3.5" /> Generate summary
              </>
            )}
          </Button>
        </CardAction>
      </CardHeader>
      {status === "error" && (
        <CardContent>
          <div
            data-el="review-ai-summary-error"
            className="flex items-center gap-2 text-sm text-destructive"
          >
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
