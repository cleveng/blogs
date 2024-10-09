'use client'

import { useMutation } from '@apollo/client'
import { Signatory } from '@cakioe/kit.js'
import * as Separator from '@radix-ui/react-separator'
import { Box, Flex, Skeleton, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'

import { appid } from '@/app/config'
import { LoginDocument } from '@/app/generated/graphql'

import { loginURL, version } from '@config/index'

import { useUserStore } from '../store/user'

const Page = () => {
  const login = useUserStore(state => state.login)

  const signer = new Signatory(appid)
  const [fetch, { loading, data }] = useMutation(LoginDocument)

  const params = useSearchParams()
  const code = params.get('code')
  useEffect(() => {
    const init = async () => {
      const payload = signer.toBase64String({ app: 'gg', code: code })
      try {
        const res = await fetch({
          variables: { input: payload },
          context: {
            headers: {
              appid: appid
            }
          }
        })
        if (res?.data) {
          login(res.data?.login)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (code) {
      void init()
    }
  }, [code])
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
          <div className='my-5 flex justify-center items-center'>
            <Separator.Root className='w-full h-px bg-gray-200' />
            <span className='mx-2.5 text-gray-500 text-xs'>或</span>
            <Separator.Root className='w-full h-px bg-gray-200' />
          </div>
          {loading && <p>Loading ...</p>}
          {data?.login && <p>{data.login}</p>}
          <a
            target='_self'
            href={loginURL}
            className='w-full uppercase rounded-sm flex items-center justify-center border border-gray-400 hover:border-gray-500 hover:shadow bg-white px-3.5 py-2.5 focus:outline-none'
          >
            <FcGoogle className='text-xl mr-2' /> Sign In with Google
          </a>
          <div className='pt-10 text-center text-gray-600 dark:text-gray-400'>
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
        <div className='my-1 flex items-center justify-center text-sm text-gray-600'>
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
