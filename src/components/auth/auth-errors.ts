// Maps raw Supabase auth error messages to friendly, user-facing copy.
// Keeps error strings out of the UI components and gives every screen the same
// tone. Falls back to a generic message for anything unrecognised.

interface ErrorRule {
  /** Case-insensitive substring to look for in the raw Supabase message. */
  match: string
  /** The friendly message to show instead. */
  message: string
}

const RULES: ErrorRule[] = [
  {
    match: "invalid login credentials",
    message: "That email or password doesn't match our records. Please try again.",
  },
  {
    match: "email not confirmed",
    message: "Please confirm your email first — check your inbox for the link.",
  },
  {
    match: "user already registered",
    message: "An account with this email already exists. Try signing in instead.",
  },
  {
    match: "invalid format",
    message: "Please enter a valid email address.",
  },
  {
    match: "should be at least",
    message: "Your password is too short. Use at least 8 characters.",
  },
  {
    match: "different from the old password",
    message: "Your new password must be different from your current one.",
  },
  {
    match: "for security purposes",
    message: "Too many attempts. Please wait a moment and try again.",
  },
  {
    match: "rate limit",
    message: "Too many attempts. Please wait a moment and try again.",
  },
  {
    match: "failed to fetch",
    message: "We couldn't reach the server. Check your connection and try again.",
  },
]

/** Turn a raw Supabase auth error message into friendly, user-facing copy. */
export function friendlyAuthError(raw: string | null | undefined): string {
  if (!raw) {
    return "Something went wrong. Please try again."
  }
  const lower = raw.toLowerCase()
  const rule = RULES.find((r) => lower.includes(r.match))
  return rule ? rule.message : raw
}
