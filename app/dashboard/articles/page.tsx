'use client'

import { Flex } from '@radix-ui/themes'
import Link from 'next/link'

const Page = () => {
  return (
    <>
      <Flex justify='between' align='center' className='mb-2.5 border-b pb-2.5'>
        <h2 className='DialogTitle m-0 text-lg font-bold text-gray-600'>列表</h2>
        <Link href='/dashboard/articles/create' className='underline text-blue-500 hover:text-blue-700'>
          创建
        </Link>
      </Flex>
    </>
  )
}

export default Page
