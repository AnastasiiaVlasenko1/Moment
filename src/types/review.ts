// Shared domain types for the Monthly Review Builder.
// Used across the capture surface and the month-end review assembly.

export type Category =
  | "interesting"
  | "challenge"
  | "achievement"
  | "learning"
  | "mood"

/** Which review section a category feeds into. */
export type SectionKey = "highlights" | "learning" | "mood"

export interface Project {
  id: string
  name: string
  /** A `chart-N` token key used for the project's accent color. */
  color: string
}

export interface Moment {
  id: string
  /** The primary note text. May be empty when only a screenshot or link is attached. */
  text: string
  /** Optional attached link URL — independent of `imageId`. */
  url?: string
  /** Optional attached screenshot — IndexedDB key. Independent of `url`. */
  imageId?: string
  /** Optional for `mood` moments (mood is often about the day, not a project). */
  projectId?: string
  category: Category
  /**
   * The selected feeling for a `mood` moment (e.g. "Calm"), stored as its own
   * structured tag — independent of `text`, which stays free for optional
   * context. Undefined for non-mood moments (and legacy mood moments logged
   * before feelings were split out of the note).
   */
  mood?: string
  /** ISO `yyyy-mm-dd` — the day the moment is filed under. Defaults to today, editable. */
  date: string
  /** Epoch ms, used for stable ordering. */
  createdAt: number
}

/** A draft input for creating a moment (id/createdAt are assigned by the store). */
export type MomentDraft = Omit<Moment, "id" | "createdAt">
