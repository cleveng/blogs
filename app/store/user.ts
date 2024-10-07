import { create, StateCreator } from 'zustand'

import { CountSlice } from './count'

export interface UserSlice {
  loggedIn: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
  profile: (payload?: any) => void
}

export const createUserSlice: StateCreator<CountSlice & UserSlice, [], [], UserSlice> = create<UserSlice>()(
  (set, get) => ({
    loggedIn: false,
    token: null,
    login: (token: string) => {
      set({ loggedIn: true, token })
    },
    logout: () => {
      set({ loggedIn: false, token: null })
    },
    profile: (payload?: any) => {
      if (payload) {
        set({ ...payload })
      }

      return get()
    }
  })
)
