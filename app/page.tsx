'use client'

import * as Dialog from '@radix-ui/react-dialog'
import * as Form from '@radix-ui/react-form'
import { Cross2Icon, StarFilledIcon } from '@radix-ui/react-icons'
import { Button, Flex, Skeleton, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { FcGoogle } from 'react-icons/fc'
import { LuUser } from 'react-icons/lu'

import ThemeSwitch from '@/app/components/theme-switch'

import { loginURL } from '@config/index'

export default function Home() {
  const t = useTranslations('HomePage')

  return (
    <>
      <div className='bg-white'>
        <nav className='container relative mx-auto flex h-20 items-center justify-between px-4 py-8'>
          <div className='inline-flex'>
            <a className='_o6689fn' href='/'>
              <div className='hidden md:block'>
                <svg width='102' height='32' fill='currentcolor' style={{ display: 'block' }}>
                  <path d='M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5zM41.54 24.12a5.02 5.02 0 01-3.95-1.83 6.55 6.55 0 01-1.6-4.48 6.96 6.96 0 011.66-4.58 5.3 5.3 0 014.08-1.86 4.3 4.3 0 013.7 1.92l.1-1.57h2.92V23.8h-2.93l-.1-1.76a4.52 4.52 0 01-3.88 2.08zm.76-2.88c.58 0 1.09-.16 1.57-.45.44-.32.8-.74 1.08-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.55.45zM53.45 8.46c0 .35-.06.67-.22.93-.16.25-.38.48-.67.64-.29.16-.6.22-.92.22-.32 0-.64-.06-.93-.22a1.84 1.84 0 01-.67-.64 1.82 1.82 0 01-.22-.93c0-.36.07-.68.22-.93.16-.3.39-.48.67-.64.29-.16.6-.23.93-.23a1.84 1.84 0 011.6.86 2 2 0 01.21.94zm-3.4 15.3V11.7h3.18v12.08h-3.19zm11.68-8.9v.04c-.15-.07-.35-.1-.5-.13-.2-.04-.36-.04-.55-.04-.89 0-1.56.26-2 .8-.48.55-.7 1.32-.7 2.31v5.93h-3.19V11.69h2.93l.1 1.83c.32-.64.7-1.12 1.24-1.48a3.1 3.1 0 011.81-.5c.23 0 .45.02.64.06.1.03.16.03.22.06v3.2zm1.28 8.9V6.74h3.18v6.5c.45-.58.96-1.03 1.6-1.38a5.02 5.02 0 016.08 1.31 6.55 6.55 0 011.6 4.49 6.96 6.96 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.1 1.57-2.92.03zm6.15-2.52c.57 0 1.08-.16 1.56-.45.44-.32.8-.74 1.08-1.25.26-.51.38-1.12.38-1.8 0-.67-.12-1.28-.38-1.79a3.75 3.75 0 00-1.08-1.25 2.95 2.95 0 00-3.12 0c-.45.32-.8.74-1.09 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.56.45zm7.51 2.53V11.69h2.93l.1 1.57a3.96 3.96 0 013.54-1.89 4.1 4.1 0 013.82 2.44c.35.76.54 1.7.54 2.75v7.24h-3.19v-6.82c0-.84-.19-1.5-.57-1.99-.38-.48-.9-.74-1.56-.74-.48 0-.9.1-1.27.32-.35.23-.64.52-.86.93a2.7 2.7 0 00-.32 1.35v6.92h-3.16zm12.52 0V6.73h3.19v6.5a4.67 4.67 0 013.73-1.89 5.02 5.02 0 013.95 1.83 6.57 6.57 0 011.59 4.48 6.95 6.95 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.09 1.57-2.93.03zm6.18-2.53c.58 0 1.09-.16 1.56-.45.45-.32.8-.74 1.09-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a3.63 3.63 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.95.45 1.55.45z'></path>
                </svg>
              </div>
              <div className='block md:hidden'>
                <svg width='30' height='32' fill='currentcolor' style={{ display: 'block' }}>
                  <path d='M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5z'></path>
                </svg>
              </div>
            </a>
          </div>

          <div className='hidden flex-shrink flex-grow-0 justify-start px-2 sm:block'>
            <div className='inline-block'>
              <div className='inline-flex max-w-full items-center'>
                <button
                  className='relative flex w-60 flex-shrink flex-grow-0 items-center rounded-full border px-1 py-1 pl-2'
                  type='button'
                >
                  <div className='block flex-shrink flex-grow overflow-hidden'>Start your search</div>
                  <div className='relative flex h-8 w-8 items-center justify-center rounded-full'>
                    <svg
                      viewBox='0 0 32 32'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                      role='presentation'
                      focusable='false'
                      style={{
                        display: 'block',
                        fill: 'none',
                        height: '12px',
                        width: '12px',
                        stroke: 'currentcolor',
                        strokeWidth: '5.33333',
                        overflow: 'visible'
                      }}
                    >
                      <g fill='none'>
                        <path d='m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9'></path>
                      </g>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className='flex-initial'>
            <div className='relative flex items-center justify-end'>
              <div className='mr-4 flex items-center'>
                <Link className='inline-block rounded-full px-3 py-2 hover:bg-gray-200' href='/signin'>
                  <Text className='relative flex cursor-pointer items-center whitespace-nowrap'>Become a host</Text>
                </Link>
                <div className='relative block'>
                  <ThemeSwitch />
                </div>
              </div>

              <div className='block'>
                <div className='relative inline'>
                  <button
                    type='button'
                    className='relative inline-flex items-center rounded-full border px-2 hover:shadow-lg'
                  >
                    <div className='pl-1'>
                      <svg
                        viewBox='0 0 32 32'
                        xmlns='http://www.w3.org/2000/svg'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                        style={{
                          display: 'block',
                          height: '16px',
                          width: '16px',
                          fill: 'currentcolor',
                          stroke: 'currentcolor',
                          strokeWidth: '3',
                          overflow: 'visible'
                        }}
                      >
                        <g fill='none' fill-rule='nonzero'>
                          <path d='m2 16h28'></path>
                          <path d='m2 24h28'></path>
                          <path d='m2 8h28'></path>
                        </g>
                      </svg>
                    </div>

                    <div className='inline-flex h-10 w-12 flex-shrink-0 flex-grow-0 items-center pl-5'>
                      <svg
                        viewBox='0 0 32 32'
                        xmlns='http://www.w3.org/2000/svg'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                        style={{ display: 'block', height: '16px', width: '16px', fill: 'currentcolor' }}
                      >
                        <path d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <header className='bg-white'>
        <div className='container mx-auto flex items-center px-4 py-8'>
          <div className='mr-auto flex-shrink-0 md:w-48'>
            <img className='h-8 md:h-10' src='https://i.ibb.co/98pHdFq/2021-10-27-15h51-15.png' alt='' />
          </div>

          <div className='hidden w-full max-w-xs items-center rounded-md bg-gray-100 xl:flex xl:max-w-lg 2xl:max-w-2xl'>
            <select className='mr-4 bg-transparent p-4 text-sm font-bold uppercase' name='' id=''>
              <option>all categories</option>
            </select>
            <input
              className='border-l border-gray-300 bg-transparent pl-4 text-sm font-semibold'
              type='text'
              placeholder="I'm searching for ..."
            />
            <svg
              className='svg-inline--fa fa-search fa-w-16 fa-9x ml-auto h-5 px-4 text-gray-500'
              aria-hidden='true'
              focusable='false'
              data-prefix='far'
              data-icon='search'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
            >
              <path
                fill='currentColor'
                d='M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z'
              ></path>
            </svg>
          </div>

          <div className='ml-auto hidden flex-col place-items-end sm:flex md:w-48'>
            <span className='font-bold md:text-xl'>8 800 332 65-66</span>
            <span className='text-sm font-semibold text-gray-400'>Support 24/7</span>
          </div>

          <nav className='contents'>
            <ul className='ml-4 flex items-center justify-end xl:w-48'>
              <li className='relative ml-2 inline-block lg:ml-4'>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <LuUser className='cursor-pointer w-7 h-7' />
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className='DialogOverlay fixed inset-0' />
                    <Dialog.Content className='DialogContent fixed left-1/2 top-1/2 w-[90vw] max-w-screen-sm rounded-md bg-white p-5 shadow-md focus:outline-none sm:w-11/12'>
                      <Flex justify='between' align='center' className='mb-2.5 border-b pb-2.5'>
                        <Dialog.Title className='DialogTitle m-0 text-lg font-bold text-gray-600'>
                          登录掘金畅享更多权益
                        </Dialog.Title>
                        <Dialog.Close asChild>
                          <Button className='inline-flex items-center justify-center' aria-label='Close'>
                            <Cross2Icon className='text-3xl' />
                          </Button>
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
              </li>
              <li className='relative ml-2 inline-block lg:ml-4'>
                <a className='' href=''>
                  <div className='absolute -top-1 right-0 z-10 rounded-sm bg-yellow-400 px-1 py-0.5 text-xs font-bold'>
                    3
                  </div>
                  <svg
                    className='svg-inline--fa fa-heart fa-w-16 fa-9x h-9 p-2 text-gray-500 lg:h-10'
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='far'
                    data-icon='heart'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                  >
                    <path
                      fill='currentColor'
                      d='M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z'
                    ></path>
                  </svg>
                </a>
              </li>
              <li className='relative ml-2 inline-block lg:ml-4'>
                <a className='' href=''>
                  <div className='absolute -top-1 right-0 z-10 rounded-sm bg-yellow-400 px-1 py-0.5 text-xs font-bold'>
                    12
                  </div>
                  <svg
                    className='svg-inline--fa fa-shopping-cart fa-w-18 fa-9x h-9 p-2 text-gray-500 lg:h-10'
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='far'
                    data-icon='shopping-cart'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 576 512'
                  >
                    <path
                      fill='currentColor'
                      d='M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z'
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>

          <div className='ml-4 hidden flex-col font-bold sm:flex'>
            <span className='text-xs text-gray-400'>Your Cart</span>
            <span>$2,650,59</span>
          </div>
        </div>

        <hr />
      </header>

      <div className='bg-gray-50 px-6 pb-[500px] text-gray-700 dark:bg-gray-800 dark:text-white lg:px-8'>
        <section className='container mx-auto'>
          <div className='mb-20'>
            <h2 className='tracki mt-12 text-center text-3xl font-bold sm:text-5xl'>{t('title')} Pricing</h2>
            <p className='mx-auto mt-4 max-w-3xl text-center text-xl'>
              Get started on our free plan and upgrade when you are ready.
            </p>
          </div>

          <div className='mx-auto grid grid-cols-4 gap-8'>
            {Array.from({ length: 4 }, (_, i) => i + 1).map(number => (
              <div className='w-full overflow-hidden rounded-lg shadow-2xl' key={number}>
                <Image
                  className='object-end h-48 w-full object-cover'
                  width={500}
                  height={500}
                  priority={false}
                  src='https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80'
                  alt='Home in Countryside'
                />
                <div className='p-6'>
                  <div className='flex items-baseline'>
                    <span className='inline-block rounded-full bg-teal-200 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-teal-800'>
                      New
                    </span>
                    <div className='ml-2 text-xs font-semibold uppercase tracking-wide'>3 beds &bull; 2 baths</div>
                  </div>
                  <h4 className='mt-2 truncate text-lg font-semibold leading-tight'>
                    <Link href='#'>Beautiful Home in the countryside</Link>
                  </h4>

                  <div className='mt-1'>
                    <span>$1,900.00</span>
                    <span className='text-sm'>/ wk</span>
                  </div>
                  <div className='mt-2 flex items-center justify-between'>
                    <div className='flex items-center justify-start font-semibold text-teal-600'>
                      <div className='inline-flex items-center justify-start'>
                        <StarFilledIcon />
                        <StarFilledIcon />
                        <StarFilledIcon />
                        <StarFilledIcon />
                        <StarFilledIcon />
                      </div>
                      <span className='ml-2 text-sm text-gray-600'>34 reviews</span>
                    </div>
                    <span className='inline-block rounded-full bg-teal-200 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-teal-800'>
                      New
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
