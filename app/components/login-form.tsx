import * as Dialog from '@radix-ui/react-dialog'
import * as Form from '@radix-ui/react-form'
import { Button, Flex, Grid, Skeleton, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { IoClose } from 'react-icons/io5'
import { LuUser } from 'react-icons/lu'

import { loginURL } from '@config/index'

const LoginForm = () => {
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <LuUser className='cursor-pointer w-7 h-7' />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='DialogOverlay fixed inset-0' />
          <Dialog.Content className='DialogContent fixed left-1/2 top-1/2 w-[90vw] bg-white max-w-screen-sm rounded-md p-5 shadow-md focus:outline-none sm:w-11/12'>
            <Flex justify='between' align='center' className='mb-2.5 border-b pb-2.5'>
              <Dialog.Title className='DialogTitle m-0 text-lg font-bold text-gray-600'>
                登录掘金畅享更多权益
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className='cursor-pointer text-gray-900' aria-label='Close'>
                  <IoClose className='w-7 h-7' />
                </button>
              </Dialog.Close>
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

                  <Grid columns='2' width='auto' className='gap-4'>
                    <Button color='crimson' size='4'>
                      Sign In
                    </Button>
                    <Button color='crimson' size='4'>
                      Sign In
                    </Button>
                  </Grid>
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
    </>
  )
}

export default LoginForm
