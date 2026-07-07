import { AppHeader } from "@/components/global/AppHeader"
import { WeekView } from "@/components/capture/WeekView"

/** Primary daily surface: log moments on a five-day week view. */
export default function Capture() {
  return (
    <div
      data-el="capture"
      className="flex min-h-svh flex-col bg-background xl:h-svh xl:overflow-hidden"
    >
      <AppHeader />
      <main className="flex flex-1 flex-col px-4 pt-6 pb-24 sm:px-6 lg:px-8 xl:min-h-0">
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
