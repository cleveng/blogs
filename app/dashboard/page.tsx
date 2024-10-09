'use client'

import { Button } from '@radix-ui/themes'

import { useUserStore } from '../store/user'

const Page = () => {
  const logout = useUserStore(state => state.logout)
  return (
    <div>
      Page
      <Button size='3' variant='solid' className='mt-10' onClick={logout}>
        Sign out
      </Button>
    </div>
  )
}

export default Page
