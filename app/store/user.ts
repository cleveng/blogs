import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { version } from '../config'

export interface UserSlice {
  loggedIn: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
  profile: (payload?: unknown) => void
}

export const useUserStore = create<UserSlice>()(
  persist(
    set => ({
      loggedIn: false,
      token: null,
      login: (token: string) => {
        set({ loggedIn: true, token })
      },
      logout: () => {
        set({ loggedIn: false, token: null })
      },
      profile: (payload?: unknown) => {
        console.log(payload)
      }
    }),
    {
      name: 'user-storage',
      version: parseInt(version.replaceAll('.', ''), 10),
      partialize: state => ({ loggedIn: state.loggedIn, token: state.token }),
      storage: createJSONStorage(() => localStorage)
    }
  )
)
