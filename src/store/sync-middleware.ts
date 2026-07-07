// Mirrors local Redux mutations to Supabase. The UI updates optimistically
// (the reducer runs first via next(action)); the matching database write then
// happens in the background. On failure we surface a toast so the user knows a
// change didn't reach the cloud, mirroring the app's best-effort persistence.
//
// Hydration actions (setMoments/setProjects) and unassignProject are ignored:
// they either originate FROM the database, or (for project deletion) the
// database handles the cascade via the moments.project_id foreign key.

import type { Middleware } from "@reduxjs/toolkit"
import { toast } from "sonner"
import * as api from "@/lib/api"
import {
  addMoment,
  updateMoment,
  moveMomentToDate,
  deleteMoment,
} from "@/store/momentsSlice"
import {
  addProject,
  updateProject,
  removeProject,
} from "@/store/projectsSlice"

/** Returns the remote write for a given action, or null if nothing to sync. */
function mirror(action: unknown): Promise<void> | null {
  if (addMoment.match(action)) return api.insertMoment(action.payload)
  if (updateMoment.match(action))
    return api.updateMomentRow(action.payload.id, action.payload.changes)
  if (moveMomentToDate.match(action))
    return api.updateMomentRow(action.payload.id, { date: action.payload.date })
  if (deleteMoment.match(action)) return api.deleteMomentRow(action.payload)

  if (addProject.match(action)) return api.insertProject(action.payload)
  if (updateProject.match(action))
    return api.updateProjectRow(action.payload.id, action.payload.changes)
  if (removeProject.match(action)) return api.deleteProjectRow(action.payload)

  return null
}

export const syncMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action)
  const write = mirror(action)
  if (write) {
    write.catch((err) => {
      console.error("Cloud sync failed:", err)
      toast.error("Couldn't save that change to the cloud. Check your connection.")
    })
  }
  return result
}
