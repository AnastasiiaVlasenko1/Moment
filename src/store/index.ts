import { configureStore } from "@reduxjs/toolkit"
import momentsReducer from "./momentsSlice"
import projectsReducer from "./projectsSlice"
import { loadState, saveState } from "@/lib/persistence"

const persisted = loadState()

export const store = configureStore({
  reducer: {
    moments: momentsReducer,
    projects: projectsReducer,
  },
  preloadedState: {
    moments: { items: persisted.moments },
    projects: { items: persisted.projects },
  },
})

// Persist moment + project metadata to localStorage on every change.
store.subscribe(() => {
  const state = store.getState()
  saveState({
    moments: state.moments.items,
    projects: state.projects.items,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
