'use client'
import { Avatar, DropdownMenu, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useUserStore } from '../store/user'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Readonly<Props>) => {
  const logout = useUserStore(state => state.logout)
  const pathname = usePathname()

  console.log(pathname)

  return (
    <>
      <Flex>
        <div className='w-[210px] flex h-auto min-h-screen bg-gray-900 p-4'>
          <ul>
            <li>
              <Link href='/dashboard/categories' className='underline text-blue-500 hover:text-blue-700'>
                文章栏目
              </Link>
            </li>
            <li>
              <Link href='/dashboard/articles' className='underline text-blue-500 hover:text-blue-700'>
                文章列表
              </Link>
            </li>
          </ul>
        </div>
        <div className='w-full'>
          <nav className='bg-gray-50 border-b p-2.5 flex justify-end items-center'>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src='https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop'
                  fallback='A'
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>个人设置</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={() => logout()}>退出</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </nav>
          <main>{children}</main>
        </div>
      </Flex>
    </>
  )
}

export default Layout
