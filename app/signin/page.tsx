import { Link, Skeleton, Text } from '@radix-ui/themes'

const Page = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gray-50'>
      <div className='max-w-[390px] rounded-lg bg-white px-6 py-8 shadow sm:p-10 sm:pb-6'>
        <div>
          <h2 className='text-lg font-medium tracking-tighter text-gray-600 lg:text-2xl'>同心异构环形</h2>
          <Text className='mt-2 text-sm text-gray-500'>请打开微信『扫一扫』进行登录。</Text>
        </div>

        <div className='my-8 flex items-center justify-center'>
          <Skeleton className='h-[250px] w-[250px] bg-gray-100'></Skeleton>
        </div>

        <div className='pt-3 text-center text-gray-600 dark:text-gray-400'>
          <p className='text-xs'>
            By proceeding, you agree to our
            <Link href='/privacy-policy/' className='mx-1'>
              Terms of Use
            </Link>
            and confirm you have read our
            <Link href='/privacy-policy/' className='mx-1'>
              Privacy and Cookie Statement
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
