import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Project } from "@/types/review"
import { PROJECT_COLOR_CYCLE } from "@/data/categories"

interface ProjectsState {
  items: Project[]
}

// Starts empty; projects are hydrated from Supabase on login (a brand-new user
// is seeded with the defaults — see src/lib/api.ts seedDefaultProjects).
const initialState: ProjectsState = { items: [] }

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    /** Replace all projects (used when hydrating from Supabase on login). */
    setProjects(state, action: PayloadAction<Project[]>) {
      state.items = action.payload
    },
    addProject: {
      reducer(state, action: PayloadAction<Project>) {
        state.items.push(action.payload)
      },
      prepare(name: string) {
        return {
          payload: {
            id: crypto.randomUUID(),
            name: name.trim(),
            // spread new projects across the palette by name length
            color: PROJECT_COLOR_CYCLE[name.trim().length % PROJECT_COLOR_CYCLE.length],
          } satisfies Project,
        }
      },
    },
    updateProject(
      state,
      action: PayloadAction<{ id: string; changes: Partial<Project> }>,
    ) {
      const project = state.items.find((p) => p.id === action.payload.id)
      if (project) Object.assign(project, action.payload.changes)
    },
    removeProject(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p.id !== action.payload)
    },
  },
})

export const { setProjects, addProject, updateProject, removeProject } =
  projectsSlice.actions
export default projectsSlice.reducer
