import { Plus } from "lucide-react"

/** Floating "Log a moment" button docked at the bottom. */
export function CaptureBar({ onAdd }: { onAdd: () => void }) {
  return (
    <div
      data-el="capture-bar"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center"
    >
      <button
        data-el="capture-bar-add"
        onClick={onAdd}
        className="pointer-events-auto flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Plus className="size-5" />
        <span className="font-medium">Log a moment</span>
      </button>
    </div>
  )
}
