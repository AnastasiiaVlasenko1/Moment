// Link-field validation for the moment composer. A moment's URL is optional and
// user-typed, so we accept the common shorthand ("example.com/path") by adding a
// scheme, and reject anything that isn't a plausible web address before it can be
// saved as a dead link.

/**
 * Normalize a user-typed link. Returns a fully-qualified URL string, or `null`
 * when the input can't be a real web address.
 *
 * - Empty / whitespace → `null` (caller treats "no link" separately).
 * - Missing scheme → assumes `https://`.
 * - Requires a dotted host (rejects "notaurl", "foo bar").
 */
export function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null

  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  try {
    const url = new URL(withScheme)
    // Reject scheme-only or dotless hosts so "notaurl" doesn't slip through.
    if (!url.hostname.includes(".") || url.hostname.endsWith(".")) return null
    return url.toString()
  } catch {
    return null
  }
}

/** True when `raw` is empty or a valid link — i.e. safe to save. */
export function isLinkAcceptable(raw: string): boolean {
  return raw.trim().length === 0 || normalizeUrl(raw) !== null
}
