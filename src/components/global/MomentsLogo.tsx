import { useId } from "react"
import { cn } from "@/lib/utils"

interface MomentsMarkProps {
  className?: string
  /** Accessible label; set to "" and add your own text when paired with a visible wordmark. */
  label?: string
}

const PETAL = "M32 31 C 26 26 26 18 32 12 C 38 18 38 26 32 31 Z"
const PETAL_COLORS = ["#b5798f", "#5f6e38", "#4e8a85", "#e6b45a", "#c2673e"]

/**
 * The Moments app icon — the "Bloom" mark: five petals (one per category)
 * ringing an open center. Renders on a transparent background (no tile) so it
 * sits cleanly on any surface; the center is a real cutout that reveals the
 * surface behind it, keeping the mark identical in light and dark. The favicon
 * (public/moments-logo.svg) keeps the cream tile since a favicon needs one.
 */
export function MomentsMark({ className, label = "Moments" }: MomentsMarkProps) {
  const maskId = useId()
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={cn("size-8 shrink-0", className)}
    >
      <mask id={maskId}>
        <rect width="64" height="64" fill="white" />
        <circle cx="32" cy="32" r="4.6" fill="black" />
      </mask>
      <g mask={`url(#${maskId})`}>
        {PETAL_COLORS.map((color, i) => (
          <path key={color} d={PETAL} fill={color} transform={`rotate(${i * 72} 32 32)`} />
        ))}
      </g>
    </svg>
  )
}

interface MomentsLogoProps {
  className?: string
  markClassName?: string
  wordmarkClassName?: string
}

/** Full brand lockup — the Moments mark next to the "Moments" wordmark in Caveat. */
export function MomentsLogo({ className, markClassName, wordmarkClassName }: MomentsLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <MomentsMark className={markClassName} label="" />
      <span className={cn("font-handwritten text-2xl leading-none text-foreground", wordmarkClassName)}>
        Moments
      </span>
    </span>
  )
}
