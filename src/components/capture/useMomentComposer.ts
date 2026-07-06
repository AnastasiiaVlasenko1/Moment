import { useState } from "react"
import type { Category } from "@/types/review"

export interface ComposerValues {
  text: string
  url: string
  category: Category
  projectId: string | undefined
  date: string
  /** Selected screenshot file, if one is attached. */
  file: File | null
}

interface ComposerInit {
  date: string
}

const emptyValues = (date: string): ComposerValues => ({
  text: "",
  url: "",
  category: "interesting",
  projectId: undefined,
  date,
  file: null,
})

/**
 * Form state for composing a single moment: a note with optional screenshot and
 * link attachments that can coexist. Seeded once from the given date — the
 * parent remounts the composer (via `key`) to start a fresh session, so no reset
 * effect is needed. Submission/persistence is handled by the component.
 */
export function useMomentComposer({ date }: ComposerInit) {
  const [values, setValues] = useState<ComposerValues>(() => emptyValues(date))

  const set = <K extends keyof ComposerValues>(
    key: K,
    value: ComposerValues[K],
  ) => setValues((v) => ({ ...v, [key]: value }))

  const canSubmit =
    values.text.trim().length > 0 ||
    values.file !== null ||
    values.url.trim().length > 0

  return { values, set, canSubmit }
}
