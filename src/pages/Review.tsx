import { AppHeader } from "@/components/global/AppHeader"
import { ReviewBuilder } from "@/components/review/ReviewBuilder"

/** Month-end review: assembled, copy-ready sections + grouped screenshots. */
export default function Review() {
  return (
    <div data-el="review" className="min-h-svh bg-background">
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <ReviewBuilder />
      </main>
    </div>
  )
}
