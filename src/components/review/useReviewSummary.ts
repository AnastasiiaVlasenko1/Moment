// State for the on-demand AI summary: idle → loading → done / error.
// Kept out of the component so the UI just renders status + calls generate().

import { useState } from "react"
import { generateReviewSummary } from "@/lib/ai-summary"
import type { ReviewModel } from "@/lib/assembly"

type Status = "idle" | "loading" | "done" | "error"

export function useReviewSummary(model: ReviewModel) {
  const [status, setStatus] = useState<Status>("idle")
  const [summary, setSummary] = useState("")
  const [error, setError] = useState<string | null>(null)

  async function generate() {
    setStatus("loading")
    setError(null)
    try {
      const text = await generateReviewSummary(model)
      setSummary(text)
      setStatus("done")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
      setStatus("error")
    }
  }

  return { status, summary, error, generate }
}
