import { create, StateCreator } from 'zustand'

import { UserSlice } from './user'

export interface CountSlice {
  value: number
  increase: (by?: number) => void
}

export const createCountSlice: StateCreator<CountSlice & UserSlice, [], [], CountSlice> = create<CountSlice>()(
  (set, get) => ({
    value: 0,
    increase: (by = 1) => set({ value: get().value + by })
  })
)
