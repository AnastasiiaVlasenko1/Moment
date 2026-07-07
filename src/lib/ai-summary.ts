// Builds the deterministic month text from the review formatters and asks the
// Supabase Edge Function (summarize-review) to rewrite it as AI prose. The
// Anthropic API key never touches the browser — it lives only in the function.

import { supabase } from "@/lib/supabase"
import {
  formatHighlightsText,
  formatMomentsText,
  formatOverviewText,
  type ReviewModel,
} from "@/lib/assembly"

export async function generateReviewSummary(model: ReviewModel): Promise<string> {
  const sections = [
    formatOverviewText(model),
    model.highlights.length > 0 ? formatHighlightsText(model.highlights) : "",
    model.learning.length > 0 ? formatMomentsText("Learning", model.learning) : "",
    model.moods.length > 0 ? formatMomentsText("Mood", model.moods) : "",
  ].filter(Boolean)

  const { data, error } = await supabase.functions.invoke<{
    summary?: string
    error?: string
  }>("summarize-review", {
    body: { monthLabel: model.monthLabel, content: sections.join("\n\n") },
  })

  if (error) throw error
  if (data?.error) throw new Error(data.error)
  if (!data?.summary) throw new Error("The AI didn't return a summary. Please try again.")
  return data.summary
}
