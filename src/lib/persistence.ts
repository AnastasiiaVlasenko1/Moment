// localStorage persistence for moment + project metadata. Image blobs live in
// IndexedDB (see image-store.ts); only lightweight JSON is stored here.

import type { Moment, Project } from "@/types/review"
import { DEFAULT_PROJECTS } from "@/data/categories"

const KEY = "mrb-state-v1"

export interface PersistedState {
  moments: Moment[]
  projects: Project[]
}

/** Read persisted state, or return sensible defaults on first run / parse error. */
export function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { moments: [], projects: DEFAULT_PROJECTS }
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    return {
      moments: Array.isArray(parsed.moments) ? parsed.moments : [],
      projects:
        Array.isArray(parsed.projects) && parsed.projects.length > 0
          ? parsed.projects
          : DEFAULT_PROJECTS,
    }
  } catch {
    return { moments: [], projects: DEFAULT_PROJECTS }
  }
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // Quota or serialization failure — non-fatal for a client-side prototype.
  }
}
