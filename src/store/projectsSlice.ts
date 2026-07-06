import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit"
import type { Project } from "@/types/review"
import { DEFAULT_PROJECTS, PROJECT_COLOR_CYCLE } from "@/data/categories"

interface ProjectsState {
  items: Project[]
}

const initialState: ProjectsState = { items: DEFAULT_PROJECTS }

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: {
      reducer(state, action: PayloadAction<Project>) {
        state.items.push(action.payload)
      },
      prepare(name: string) {
        return {
          payload: {
            id: nanoid(),
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

export const { addProject, updateProject, removeProject } =
  projectsSlice.actions
export default projectsSlice.reducer
