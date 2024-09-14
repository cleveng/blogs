import { Skeleton, Text, Box, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import * as Separator from '@radix-ui/react-separator'
import { version } from '@config/index'

const Page = () => {
  return (
    <>
      <Flex justify='between' className='h-screen w-screen flex-col bg-gray-50'>
        <div className='invisible text-center'>#</div>
        <Box className='mx-auto w-full max-w-[390px] rounded-lg bg-white px-6 py-8 shadow sm:p-10 sm:pb-6'>
          <div>
            <h2 className='text-lg font-medium tracking-tighter text-gray-600 lg:text-2xl'>开放平台</h2>
            <Text className='mt-2.5 text-sm text-gray-500'>请打开微信『扫一扫』进行登录。</Text>
          </div>

          <div className='my-8 flex items-center justify-center'>
            <Skeleton className='h-[250px] w-[250px] bg-gray-100'></Skeleton>
          </div>

          <div className='pt-3 text-center text-gray-600 dark:text-gray-400'>
            <p className='text-xs'>
              继续操作即表示您同意我们的
              <Link href='/' className='mx-0.5 text-blue-500 underline hover:text-blue-700'>
                使用条款
              </Link>
              并确认您已阅读我们的
              <Link href='/' className='mx-0.5 text-blue-500 underline hover:text-blue-700'>
                隐私和Cookie声明
              </Link>
              .
            </p>
          </div>
        </Box>
        <div className='mb-1 flex items-center justify-center text-sm text-gray-600'>
          <Link href='/' className='mx-0.5 text-blue-500 underline hover:text-blue-700'>
            回到首页
          </Link>
          <Separator.Root decorative orientation='vertical' className='mx-2 h-4 w-0.5 bg-gray-500' />
          <Text>当前版本: v{version}</Text>
        </div>
      </Flex>
    </>
  )
}

export default Page
