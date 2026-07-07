import { ExternalLink, ImageIcon } from "lucide-react"
import type { Moment } from "@/types/review"

/** Renders moments as a compact, deck-oriented bulleted list. A moment may carry
 * text, a link, and a screenshot together — all shown additively. */
export function MomentList({ moments }: { moments: Moment[] }) {
  return (
    <ul className="flex flex-col gap-2 text-sm">
      {moments.map((m) => (
        <li key={m.id} className="flex items-start gap-2">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
          <div className="flex min-w-0 flex-col gap-0.5">
            {m.text ? (
              <span>{m.text}</span>
            ) : (
              !m.url && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <ImageIcon className="size-3.5 shrink-0" /> Screenshot
                </span>
              )
            )}
            {m.url && (
              <a
                href={m.url}
                target="_blank"
                rel="noreferrer"
className="flex min-w-0 items-start gap-1 text-link hover:underline"
              >
                <ExternalLink className="mt-0.5 size-3.5 shrink-0" />
                <span className="break-all">{m.url}</span>
              </a>
            )}
            {m.text && m.imageId && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ImageIcon className="size-3 shrink-0" /> Screenshot attached
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
