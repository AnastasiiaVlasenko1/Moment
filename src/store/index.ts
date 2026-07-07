import { configureStore } from "@reduxjs/toolkit"
import momentsReducer from "./momentsSlice"
import projectsReducer from "./projectsSlice"
import { syncMiddleware } from "./sync-middleware"

// The store starts empty and is hydrated from Supabase after login
// (see src/components/data/DataProvider.tsx). Every mutation is mirrored back
// to Supabase by syncMiddleware.
export const store = configureStore({
  reducer: {
    moments: momentsReducer,
    projects: projectsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(syncMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
