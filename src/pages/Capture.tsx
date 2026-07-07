import { AppHeader } from "@/components/global/AppHeader"
import { WeekView } from "@/components/capture/WeekView"

/** Primary daily surface: log moments on a five-day week view. */
export default function Capture() {
  return (
    <div data-el="capture" className="min-h-svh bg-background pb-28">
      <AppHeader />
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div data-el="capture-intro" className="mb-5">
          <h1 className="font-handwritten text-4xl leading-none">This week</h1>
          <p className="text-sm text-muted-foreground">
            Capture a quick moment at work — challenges, achievements, learnings
            and your feelings.
          </p>
        </div>
        <WeekView />
      </main>
    </div>
  )
}
