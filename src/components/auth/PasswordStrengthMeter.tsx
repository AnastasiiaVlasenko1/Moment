// A four-segment strength bar shown under the password field on sign-up / reset.
// Purely advisory; the level comes from scorePassword() in password-strength.ts.

import { cn } from "@/lib/utils"
import { scorePassword } from "@/components/auth/password-strength"

// Segment fill colours per level (1–4). Strength meters read best on a
// red→green ramp, so these intentionally step outside the neutral theme tokens.
const SEGMENT_COLORS: Record<number, string> = {
  1: "bg-destructive",
  2: "bg-orange-500",
  3: "bg-amber-500",
  4: "bg-emerald-500",
}

interface PasswordStrengthMeterProps {
  password: string
  "data-el"?: string
}

export function PasswordStrengthMeter({
  password,
  "data-el": dataEl,
}: PasswordStrengthMeterProps) {
  const { level, label } = scorePassword(password)

  if (!password) {
    return null
  }

  return (
    <div data-el={dataEl} className="flex flex-col gap-1.5">
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4].map((segment) => (
          <span
            key={segment}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              segment <= level ? SEGMENT_COLORS[level] : "bg-muted",
            )}
          />
        ))}
      </div>
      <p className="text-muted-foreground text-xs" aria-live="polite">
        Password strength: <span className="font-medium">{label}</span>
      </p>
    </div>
  )
}
