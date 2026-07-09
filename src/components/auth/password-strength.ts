// Password rules + a light-weight strength estimator used by the sign-up and
// reset-password screens. This is UX guidance only — the real minimum is also
// enforced by the input `minLength` and by Supabase server-side.

/** Minimum password length we ask users for (bumped from Supabase's default 6). */
export const PASSWORD_MIN_LENGTH = 8

export type StrengthLevel = 0 | 1 | 2 | 3 | 4

export interface PasswordStrength {
  /** 0 = empty, 1 = weak … 4 = strong. */
  level: StrengthLevel
  /** Short label for the current level (empty string when level is 0). */
  label: string
}

const LABELS: Record<StrengthLevel, string> = {
  0: "",
  1: "Weak",
  2: "Fair",
  3: "Good",
  4: "Strong",
}

/** Estimate how strong a password looks based on length + character variety. */
export function scorePassword(password: string): PasswordStrength {
  if (!password) {
    return { level: 0, label: LABELS[0] }
  }

  // Passwords under the minimum length are always "Weak", regardless of variety.
  if (password.length < PASSWORD_MIN_LENGTH) {
    return { level: 1, label: LABELS[1] }
  }

  let points = 1 // meets the minimum length
  if (password.length >= 12) points++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) points++
  if (/\d/.test(password)) points++
  if (/[^A-Za-z0-9]/.test(password)) points++

  const level = Math.min(4, points) as StrengthLevel
  return { level, label: LABELS[level] }
}
