import { useState } from "react"
import type { Category, Moment } from "@/types/review"
import { isLinkAcceptable } from "@/lib/url"

export interface ComposerValues {
  text: string
  url: string
  category: Category
  /** Selected feeling for a mood moment; kept separate from `text`. */
  mood: string | undefined
  projectId: string | undefined
  date: string
  /** Newly selected screenshot file, if one is attached this session. */
  file: File | null
  /** IndexedDB id of an already-saved screenshot (edit mode); cleared on removal. */
  existingImageId: string | undefined
}

interface ComposerInit {
  date: string
  /** When present, the form is seeded for editing this moment. */
  moment?: Moment
}

const emptyValues = (date: string): ComposerValues => ({
  text: "",
  url: "",
  category: "interesting",
  mood: undefined,
  projectId: undefined,
  date,
  file: null,
  existingImageId: undefined,
})

const seedValues = ({ date, moment }: ComposerInit): ComposerValues =>
  moment
    ? {
        text: moment.text,
        url: moment.url ?? "",
        category: moment.category,
        mood: moment.mood,
        projectId: moment.projectId,
        date: moment.date,
        file: null,
        existingImageId: moment.imageId,
      }
    : emptyValues(date)

/**
 * Form state for composing or editing a single moment: a note with optional
 * screenshot and link attachments that can coexist. Seeded once — from the given
 * date for a new moment, or from an existing moment in edit mode. The parent
 * remounts the composer (via `key`) to start a fresh session, so no reset effect
 * is needed. Submission/persistence is handled by the component.
 */
export function useMomentComposer(init: ComposerInit) {
  const [values, setValues] = useState<ComposerValues>(() => seedValues(init))

  const set = <K extends keyof ComposerValues>(
    key: K,
    value: ComposerValues[K],
  ) => setValues((v) => ({ ...v, [key]: value }))

  // A non-empty link must be a plausible web address, or it saves as a dead
  // ExternalLink on the card. Empty is fine (the link is optional).
  const urlError =
    values.url.trim().length > 0 && !isLinkAcceptable(values.url)
      ? "Enter a valid link, like example.com"
      : null

  const hasContent =
    values.text.trim().length > 0 ||
    values.file !== null ||
    values.existingImageId !== undefined ||
    values.url.trim().length > 0 ||
    // A mood moment is complete once a feeling is picked, even with no note.
    (values.category === "mood" && values.mood !== undefined)

  // Block save while an invalid link sits in the field — fix it or clear it.
  const canSubmit = hasContent && urlError === null

  return { values, set, canSubmit, urlError }
}
