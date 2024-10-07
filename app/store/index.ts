import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { CountSlice, createCountSlice } from './count'
import { createUserSlice, UserSlice } from './user'
import { version } from '../config'

export const useBoundStore = create<CountSlice & UserSlice>()(
  persist(
    (...a) => ({
      ...createCountSlice(...a),
      ...createUserSlice(...a)
    }),
    {
      version: parseInt(version.replaceAll('.', ''), 10),
      name: 'local-storage',
      partialize: state => ({ value: state.value, loggedIn: state.loggedIn, token: state.token }),
      storage: createJSONStorage(() => localStorage)
    }
  )
)
