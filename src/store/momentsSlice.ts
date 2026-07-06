import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit"
import type { Moment, MomentDraft } from "@/types/review"

interface MomentsState {
  items: Moment[]
}

const initialState: MomentsState = { items: [] }

const momentsSlice = createSlice({
  name: "moments",
  initialState,
  reducers: {
    addMoment: {
      reducer(state, action: PayloadAction<Moment>) {
        state.items.push(action.payload)
      },
      prepare(draft: MomentDraft) {
        return {
          payload: {
            ...draft,
            id: nanoid(),
            createdAt: Date.now(),
          } satisfies Moment,
        }
      },
    },
    updateMoment(
      state,
      action: PayloadAction<{ id: string; changes: Partial<Moment> }>,
    ) {
      const moment = state.items.find((m) => m.id === action.payload.id)
      if (moment) Object.assign(moment, action.payload.changes)
    },
    moveMomentToDate(
      state,
      action: PayloadAction<{ id: string; date: string }>,
    ) {
      const moment = state.items.find((m) => m.id === action.payload.id)
      if (moment) moment.date = action.payload.date
    },
    deleteMoment(state, action: PayloadAction<string>) {
      state.items = state.items.filter((m) => m.id !== action.payload)
    },
  },
})

export const { addMoment, updateMoment, moveMomentToDate, deleteMoment } =
  momentsSlice.actions
export default momentsSlice.reducer
