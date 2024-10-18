'use client'

import { useMutation } from '@apollo/client'
import { Signatory } from '@cakioe/kit.js'
import * as Dialog from '@radix-ui/react-dialog'
import * as Form from '@radix-ui/react-form'
import * as Separator from '@radix-ui/react-separator'
import { Box, Button, Flex, Skeleton, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'

import { appid } from '@/app/config'
import { LoginDocument } from '@/app/generated/graphql'
import { useUserStore } from '@/app/store/user'

import { loginURL, version } from '@config/index'

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
        <Dialog.Root open modal={false}>
          <Dialog.Trigger asChild></Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className='DialogOverlay fixed inset-0' />
            <Dialog.Content className='DialogContent fixed left-1/2 top-1/2 w-[90vw] bg-white max-w-screen-sm rounded-md p-5 shadow-md focus:outline-none sm:w-11/12'>
              <Flex justify='between' align='center' className='mb-2.5 border-b pb-2.5'>
                <Dialog.Title className='DialogTitle m-0 text-lg font-bold text-gray-600'>
                  登录掘金畅享更多权益
                </Dialog.Title>
                <Link href='/' className='mx-0.5 text-blue-500 hover:text-blue-600 text-sm underline'>
                  返回首页
                </Link>
              </Flex>
              <Flex justify='between' align='start' className='pt-2.5 text-gray-600'>
                <div className='flex-auto pr-4'>
                  <Dialog.Description className='mb-4 text-base font-bold leading-none'>
                    验证码登录 / 注册
                  </Dialog.Description>
                  <Form.Root className='w-full space-y-2 text-sm'>
                    <Form.Field name='email'>
                      <div className='flex items-center justify-between text-base'>
                        <Form.Label className='mb-1.5'></Form.Label>
                        <Form.Message className='FormMessage' match='valueMissing'>
                          Please enter your email
                        </Form.Message>
                        <Form.Message className='FormMessage' match='typeMismatch'>
                          Please provide a valid email
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input className='h-12 w-full rounded-sm border bg-gray-50' type='email' required />
                      </Form.Control>
                    </Form.Field>
                    <Form.Field name='password'>
                      <div className='flex items-center justify-between text-base'>
                        <Form.Label className='mb-1.5'></Form.Label>
                        <Form.Message className='FormMessage' match='valueMissing'>
                          Please enter a question
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input className='h-12 w-full rounded-sm border bg-gray-50' type='password' required />
                      </Form.Control>
                    </Form.Field>

                    <div className='grid grid-cols-2 gap-4'>
                      <Button size='3' variant='solid'>
                        Sign In
                      </Button>
                      <Button size='3' variant='solid'>
                        Sign In
                      </Button>
                    </div>
                  </Form.Root>
                  <Flex justify='between' align='center' className='pt-3 text-sm'>
                    <Flex align='center'>
                      <Text>其它登录：</Text>
                      <a href={loginURL} target='_self' rel='noopener noreferrer'>
                        <FcGoogle className='text-xl' />
                      </a>
                    </Flex>
                    <Text>密码登录</Text>
                  </Flex>
                </div>
                <div className='flex-0 w-[250px] border-l px-4 text-sm'>
                  <Dialog.Description className='text-base leading-none'>
                    扫码登录 <Text className='text-xs'>(6.4.1及以上版本支持)</Text>
                  </Dialog.Description>
                  <div className='my-2.5 flex items-center justify-start'>
                    <Skeleton className='h-[144px] w-[144px] border bg-gray-100'></Skeleton>
                  </div>
                  <div>
                    打开 <Text className='text-blue-500'>稀土掘金APP</Text>
                  </div>
                  <p>点击“我-左上角扫一扫”登录</p>
                </div>
              </Flex>
              <div className='pt-6 text-center text-sm text-gray-600'>
                注册登录即表示同意{' '}
                <Link href='/terms' className='text-blue-500'>
                  用户协议
                </Link>{' '}
                和{' '}
                <Link href='/privacy' className='text-blue-500'>
                  隐私政策
                </Link>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <Box className='mx-auto hidden w-full max-w-[390px] rounded-lg bg-white px-6 py-8 shadow sm:p-10 sm:pb-6'>
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
            粤ICP备XXXX号
          </Link>
          <Separator.Root decorative orientation='vertical' className='mx-2 h-4 w-0.5 bg-gray-200' />
          <Link href='/' className='mx-0.5'>
            © All rights reserved. Blogs Powered by: blogs
          </Link>
          <Separator.Root decorative orientation='vertical' className='mx-2 h-4 w-0.5 bg-gray-200' />
          <Text>版本: v{version}</Text>
        </div>
      </Flex>
    </>
  )
}

export default Page
