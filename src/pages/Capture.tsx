import { AppHeader } from "@/components/global/AppHeader"
import { WeekView } from "@/components/capture/WeekView"

/** Primary daily surface: log moments on a five-day week view. */
export default function Capture() {
  return (
    <div data-el="capture" className="min-h-svh bg-background pb-28">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div data-el="capture-intro" className="mb-5">
          <h1 className="text-2xl font-semibold tracking-tight">This week</h1>
          <p className="text-sm text-muted-foreground">
            Capture a quick moment — a note, screenshot, or link — as it happens.
          </p>
        </div>
        <WeekView />
      </main>
    </div>
  )
}
