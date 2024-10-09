'use client'

import { redirect } from 'next/navigation'

import { useUserStore } from '../store/user'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Readonly<Props>) => {
  // storage use localStorage so use client
  const loggedIn = useUserStore(state => state.loggedIn)
  if (!loggedIn) {
    redirect('/')
  }

  return <>{children}</>
}

export default Layout
