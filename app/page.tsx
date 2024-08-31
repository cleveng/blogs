'use client'

import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { StarFilledIcon } from '@radix-ui/react-icons'

export default function Home() {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === 'dark' ?? false

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? 'light' : 'dark')
  }
  return (
    <div className='relative min-h-screen bg-gray-50 px-6 pb-[500px] text-gray-700 dark:bg-gray-800 dark:text-white lg:px-8'>
      <div className='mx-auto max-w-3xl pb-32 pt-20 sm:pb-40 sm:pt-48'>
        <div>
          <div>
            <h1 className='text-4xl font-bold tracking-tight sm:text-center sm:text-6xl'>Title of your website</h1>
            <p className='mt-6 text-lg leading-8 sm:text-center'>
              Long description of your website, Long description of your website, Long description of your website, Long
              description of your website, Long description of your website,
            </p>
            <div className='mt-8 flex gap-x-4 sm:justify-center'>
              <button
                className='inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700'
                onClick={toggleDarkMode}
              >
                Getting Start
                <span aria-hidden='true' className='text-indigo-200'>
                  →
                </span>
              </button>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button className='inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 ring-1 ring-gray-900/10'>
                    Read the guide
                    <span aria-hidden='true' className='text-gray-400'>
                      →
                    </span>
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className='DialogOverlay' />
                  <Dialog.Content className='DialogContent'>
                    <Dialog.Title className='DialogTitle'>Edit profile</Dialog.Title>
                    <Dialog.Description className='DialogDescription'>
                      Make changes to your profile here. Click save when you are done.
                    </Dialog.Description>
                    <fieldset className='Fieldset'>
                      <label className='Label' htmlFor='name'>
                        Name
                      </label>
                      <input className='Input' id='name' defaultValue='Pedro Duarte' />
                    </fieldset>
                    <fieldset className='Fieldset'>
                      <label className='Label' htmlFor='username'>
                        Username
                      </label>
                      <input className='Input' id='username' defaultValue='@peduarte' />
                    </fieldset>
                    <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                      <Dialog.Close asChild>
                        <button className='Button green'>Save changes</button>
                      </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                      <button className='IconButton' aria-label='Close'>
                        <Cross2Icon />
                      </button>
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto grid grid-cols-4 gap-4'>
        <div className='w-full overflow-hidden rounded-lg shadow-2xl'>
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
            <h4 className='mt-2 truncate text-lg font-semibold leading-tight'>Beautiful Home in the countryside</h4>

            <div className='mt-1'>
              <span>$1,900.00</span>
              <span className='text-sm'>/ wk</span>
            </div>
            <div className='mt-2 flex items-center'>
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
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto mt-10 grid grid-cols-2 gap-5'>
        <div className='rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg'>
          <div className='rounded-md bg-white p-7 dark:bg-gray-800'>
            <h1 className='mb-2 text-xl font-bold'>Border gradient example</h1>
            <p>Create beautfiul cards with gradient borders with Tailwind CSS.</p>
          </div>
        </div>
        <div className='rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg'>
          <div className='rounded-md bg-white p-7 dark:bg-gray-800'>
            <h1 className='mb-2 text-xl font-bold'>Border gradient example</h1>
            <p>Create beautfiul cards with gradient borders with Tailwind CSS.</p>
          </div>
        </div>

        <div className='aspect w-fit rounded-[25px] bg-white p-8 shadow-lg dark:bg-gray-700'>
          <div className='h-12'>
            <svg
              className='h-6 w-6 fill-white stroke-blue-500'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
              />
            </svg>
          </div>
          <div className='my-2'>
            <h2 className='text-4xl font-bold'>
              <span>2680</span> +
            </h2>
          </div>

          <div>
            <p className='mt-2 font-sans text-base font-medium text-gray-500'>Put The Client First</p>
          </div>
        </div>
      </div>
      <div className='container mx-auto mt-10 grid grid-cols-2 gap-5'>
        <div className='relative my-8 flex w-full max-w-screen-lg flex-col items-start space-y-4 rounded-lg border-2 border-dashed border-gray-400 px-4 py-8 shadow-lg dark:border-gray-400 sm:flex-row sm:space-x-6 sm:space-y-0 md:my-16'>
          <span className='bg-primary-100 absolute left-0 top-0 rounded-br-lg rounded-tl-lg border-b-2 border-r-2 border-dashed border-gray-400 px-2 py-1 text-xs font-medium dark:border-gray-400 dark:bg-gray-900 dark:text-gray-300'>
            author
          </span>

          <div className='flex w-full justify-center sm:w-auto sm:justify-start'>
            <Image
              className='mr-3 mt-3 h-20 w-20 rounded-full object-cover'
              width={500}
              height={500}
              priority={false}
              src='https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80'
              alt='Home in Countryside'
            />
          </div>

          <div className='flex w-full flex-col items-center sm:w-auto sm:items-start'>
            <p className='font-display mb-2 text-2xl font-semibold dark:text-gray-200'>Prajwal Hallale</p>

            <div className='mb-4 text-gray-400 md:text-lg'>
              <p>Prajwal is a versatile content writer with a strong background in web development.</p>
            </div>

            <div className='flex gap-4'>
              <a title='youtube url' href='https://www.youtube.com/@mcqmate' target='_blank' rel='noopener noreferrer'>
                <svg
                  className='h-6 w-6 dark:text-gray-300'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M20.5949 4.45999C21.5421 4.71353 22.2865 5.45785 22.54 6.40501C22.9982 8.12001 23 11.7004 23 11.7004C23 11.7004 23 15.2807 22.54 16.9957C22.2865 17.9429 21.5421 18.6872 20.5949 18.9407C18.88 19.4007 12 19.4007 12 19.4007C12 19.4007 5.12001 19.4007 3.405 18.9407C2.45785 18.6872 1.71353 17.9429 1.45999 16.9957C1 15.2807 1 11.7004 1 11.7004C1 11.7004 1 8.12001 1.45999 6.40501C1.71353 5.45785 2.45785 4.71353 3.405 4.45999C5.12001 4 12 4 12 4C12 4 18.88 4 20.5949 4.45999ZM15.5134 11.7007L9.79788 15.0003V8.40101L15.5134 11.7007Z'
                    stroke='currentColor'
                    stroke-linejoin='round'
                  ></path>
                </svg>
              </a>

              <a title='website url' href='https://mcqmate.com/' target='_blank' rel='noopener noreferrer'>
                <svg
                  className='h-6 w-6 dark:text-gray-300'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto'>
        <div className='relative max-w-sm rounded-lg border shadow'>
          <div className='flex justify-end p-2'>
            <button
              type='button'
              className='ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
            >
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </button>
          </div>

          <div className='p-6 pt-0 text-center'>
            <svg
              className='mx-auto h-20 w-20 text-red-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <h3 className='mb-6 mt-5 text-xl font-normal text-gray-500'>Are you sure you want to delete this user?</h3>
            <a
              href='#'
              className='mr-2 inline-flex items-center rounded-lg bg-red-600 px-3 py-2.5 text-center text-base font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300'
            >
              Yes, I am sure
            </a>
            <a
              href='#'
              className='inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200'
            >
              No, cancel
            </a>
          </div>
        </div>
      </div>
      <div className='container mx-auto mt-10'>
        <div className='flex items-center justify-center px-4 pb-20 pt-4 sm:block sm:p-0'>
          <div className='inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle'>
            <div className='sm:flex sm:items-start'>
              <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10'>
                <svg className='h-6 w-6 text-green-600' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                  <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'></path>
                </svg>
              </div>
              <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>Modal Title</h3>
                <div className='mt-2'>
                  <p className='text-sm leading-5 text-gray-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem mollitia inventore quod. Yay!
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
              <span className='flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto'>
                <button
                  type='button'
                  className='focus:shadow-outline-green inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium leading-6 text-white shadow-sm transition duration-150 ease-in-out hover:bg-green-500 focus:outline-none sm:text-sm sm:leading-5'
                >
                  Accept
                </button>
              </span>
              <span className='mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto'>
                <button
                  type='button'
                  className='focus:shadow-outline-blue inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium leading-6 text-gray-700 shadow-sm transition duration-150 ease-in-out hover:text-gray-500 focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5'
                >
                  Cancel
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto'>
        <div className='w-[420px] rounded-xl shadow-xl'>
          <div className='p-8'>
            <div className='space-y-4'>
              <Image
                className='w-10'
                width={500}
                height={500}
                priority={false}
                src='https://www.svgrepo.com/show/475643/dribbble-color.svg'
                alt='Home in Countryside'
              />
              <h2 className='mb-8 text-2xl font-bold'>
                Log in to unlock the <br />
                best of MyCompany.
              </h2>
            </div>
            <div className='mt-10 grid space-y-4'>
              <button className='group h-12 rounded-full bg-gray-300 px-6 transition duration-300'>
                <div className='relative flex items-center justify-center space-x-4'>
                  <Image
                    className='absolute left-0 w-5'
                    width={500}
                    height={500}
                    priority={false}
                    src='https://www.svgrepo.com/show/475656/google-color.svg'
                    alt='Home in Countryside'
                  />
                  <span className='block w-max text-sm font-semibold tracking-wide sm:text-base'>
                    Continue with Google
                  </span>
                </div>
              </button>
              <button className='group h-12 rounded-full bg-blue-400 px-6 transition duration-300'>
                <div className='relative flex items-center justify-center space-x-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    className='absolute left-0 w-5 text-gray-700'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z'></path>
                  </svg>
                  <span className='block w-max text-sm font-semibold tracking-wide text-gray-700 transition duration-300 group-hover:text-blue-600 dark:text-white sm:text-base'>
                    Continue with Github
                  </span>
                </div>
              </button>
            </div>
            <div className='mt-14 space-y-4 py-3 text-center text-gray-600 dark:text-gray-400'>
              <p className='text-xs'>
                By proceeding, you agree to our
                <a href='/privacy-policy/' className='underline'>
                  Terms of Use
                </a>
                and confirm you have read our
                <a href='/privacy-policy/' className='underline'>
                  Privacy and Cookie Statement
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto'>
        <div>
          <h2 className='tracki mt-12 text-center text-3xl font-bold sm:text-5xl'>Pricing</h2>
          <p className='mx-auto mt-4 max-w-3xl text-center text-xl'>
            Get started on our free plan and upgrade when you are ready.
          </p>
        </div>
        <div className='container mt-24 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:space-y-0'>
          <div className='relative flex flex-col rounded-2xl border border-gray-200 p-8 shadow-sm'>
            <div className='flex-1'>
              <h3 className='text-xl font-semibold'>Free</h3>
              <p className='mt-4 flex items-baseline'>
                <span className='text-5xl font-extrabold tracking-tight'>$0</span>
                <span className='ml-1 text-xl font-semibold'>/month</span>
              </p>
              <p className='mt-6'>You just want to discover</p>
              <ul role='list' className='mt-6 space-y-6'>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='h-6 w-6 flex-shrink-0 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3'>10 Credits</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='h-6 w-6 flex-shrink-0 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3'>Generate video (2 credits)</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='h-6 w-6 flex-shrink-0 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3'>Quizz (1 credits) </span>
                </li>
              </ul>
            </div>
            <a
              className='mt-8 block w-full rounded-md border border-transparent bg-emerald-50 px-6 py-3 text-center font-medium text-emerald-700 hover:bg-emerald-100'
              href='/auth/login'
            >
              Signup for free
            </a>
          </div>
          <div className='relative flex flex-col rounded-2xl border border-gray-200 p-8 shadow-sm'>
            <div className='flex-1'>
              <h3 className='text-xl font-semibold'>Pro</h3>
              <p className='absolute top-0 -translate-y-1/2 transform rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white'>
                Most popular
              </p>
              <p className='mt-4 flex items-baseline'>
                <span className='text-5xl font-extrabold tracking-tight'>$12</span>
                <span className='ml-1 text-xl font-semibold'>/month</span>
              </p>
              <p className='mt-6'>You want to learn and have a personal assistant</p>
              <ul role='list' className='mt-6 space-y-6'>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='h-6 w-6 flex-shrink-0 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3'>30 credits</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='h-6 w-6 flex-shrink-0 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3'>Powered by GPT-4 (more accurate)</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='h-6 w-6 flex-shrink-0 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3'>Generate video (2 credits)</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='h-6 w-6 flex-shrink-0 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3'>Quizz (1 credits) </span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='h-6 w-6 flex-shrink-0 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3'>Analytics on the quizz</span>
                </li>
              </ul>
            </div>
            <a
              className='mt-8 block w-full rounded-md border border-transparent bg-emerald-500 px-6 py-3 text-center font-medium text-white hover:bg-emerald-600'
              href='/auth/login'
            >
              Signup for free
            </a>
          </div>
        </div>
      </div>
      <div className='cards'>
        <div className='card red'>
          <p className='tip'>Hover Me</p>
          <p className='second-text'>Lorem Ipsum</p>
        </div>
        <div className='card blue'>
          <p className='tip'>Hover Me</p>
          <p className='second-text'>Lorem Ipsum</p>
        </div>
        <div className='card green'>
          <p className='tip'>Hover Me</p>
          <p className='second-text'>Lorem Ipsum</p>
        </div>
      </div>
      <input id='switch' type='checkbox' />
      <div className='app'>
        <div className='body max-w-[288px]'>
          <div className='phone'>
            <div className='menu'>
              <div className='time'>4:20</div>
              <div className='icons'>
                <div className='network'></div>
                <div className='battery'></div>
              </div>
            </div>

            <div className='content'>
              <div className='circle'>
                <div className='crescent'></div>
              </div>

              <label htmlFor='switch'>
                <div className='toggle'></div>
                <div className='names'>
                  <p className='light'>Light</p>
                  <p className='dark'>Dark</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-10 flex max-w-[540px] flex-col rounded-3xl bg-white shadow-lg'>
        <div className='px-6 py-8 sm:p-10 sm:pb-6'>
          <div className='grid w-full grid-cols-1 items-center justify-center text-left'>
            <div>
              <h2 className='text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl'>Starter</h2>
              <p className='mt-2 text-sm text-gray-500'>Suitable to grow steadily.</p>
            </div>
            <div className='mt-6'>
              <p>
                <span className='text-5xl font-light tracking-tight text-black'>$25</span>
                <span className='text-base font-medium text-gray-500'> /mo </span>
              </p>
            </div>
          </div>
        </div>
        <div className='flex px-6 pb-8 sm:px-8'>
          <a
            aria-describedby='tier-company'
            className='nline-flex flex w-full items-center justify-center rounded-full border-2 border-black bg-black px-6 py-2.5 text-center text-sm text-white duration-200 hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus-visible:outline-black focus-visible:ring-black'
            href='#'
          >
            Get started
          </a>
        </div>
      </div>
      <div className='max-w-[520px]'>
        <form className='form'>
          <div className='flex-column'>
            <label>Email </label>
          </div>
          <div className='inputForm'>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' viewBox='0 0 32 32' height='20'>
              <g data-name='Layer 3' id='Layer_3'>
                <path d='m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z'></path>
              </g>
            </svg>
            <input placeholder='Enter your Email' className='input' type='text' />
          </div>
          <div className='flex-column'>
            <label>Password </label>
          </div>
          <div className='inputForm'>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' viewBox='-64 0 512 512' height='20'>
              <path d='m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0'></path>
              <path d='m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0'></path>
            </svg>
            <input placeholder='Enter your Password' className='input' type='password' />
          </div>
          <div className='flex-row'>
            <div>
              <input type='radio' />
              <label>Remember me </label>
            </div>
            <span className='span'>Forgot password?</span>
          </div>
          <button className='button-submit text-center'>Sign In</button>
          <p className='p'>
            Do not have an account? <span className='span'>Sign Up</span>
          </p>
          <p className='p line'>Or With</p>

          <div className='flex-row'>
            <button className='btn google'>Google</button>
            <button className='btn apple'>Apple</button>
          </div>
        </form>
      </div>
      https://www.creative-tim.com/twcomponents/component/ai-chatbot
      <div className='main max-w-[540px]'>
        <div className='currentplaying'>
          <svg className='spotify' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='50px' height='50px'>
            <radialGradient
              id='ipdIa4~cOclR8yt_ClW93a'
              cx='33.34'
              cy='572.064'
              r='43.888'
              gradientTransform='translate(0 -534)'
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='0' stop-color='#f4e9c3'></stop>
              <stop offset='.219' stop-color='#f8eecd'></stop>
              <stop offset='.644' stop-color='#fdf4dc'></stop>
              <stop offset='1' stop-color='#fff6e1'></stop>
            </radialGradient>
            <path
              fill='url(#ipdIa4~cOclR8yt_ClW93a)'
              d='M51.03,37.34c0.16,0.98,1.08,1.66,2.08,1.66h5.39c2.63,0,4.75,2.28,4.48,4.96	C62.74,46.3,60.64,48,58.29,48H49c-1.22,0-2.18,1.08-1.97,2.34c0.16,0.98,1.08,1.66,2.08,1.66h8.39c1.24,0,2.37,0.5,3.18,1.32	C61.5,54.13,62,55.26,62,56.5c0,2.49-2.01,4.5-4.5,4.5h-49c-1.52,0-2.9-0.62-3.89-1.61C3.62,58.4,3,57.02,3,55.5	C3,52.46,5.46,50,8.5,50H14c1.22,0,2.18-1.08,1.97-2.34C15.81,46.68,14.89,44,13.89,44H5.5c-2.63,0-4.75-2.28-4.48-4.96	C1.26,36.7,3.36,35,5.71,35H8c1.71,0,3.09-1.43,3-3.16C10.91,30.22,9.45,29,7.83,29H4.5c-2.63,0-4.75-2.28-4.48-4.96	C0.26,21.7,2.37,20,4.71,20H20c0.83,0,1.58-0.34,2.12-0.88C22.66,18.58,23,17.83,23,17c0-1.66-1.34-3-3-3h-1.18	c-0.62-0.09-1.43,0-2.32,0h-9c-1.52,0-2.9-0.62-3.89-1.61S2,10.02,2,8.5C2,5.46,4.46,3,7.5,3h49c3.21,0,5.8,2.79,5.47,6.06	C61.68,11.92,60.11,14,57.24,14H52c-2.76,0-5,2.24-5,5c0,1.38,0.56,2.63,1.46,3.54C49.37,23.44,50.62,24,52,24h6.5	c3.21,0,5.8,2.79,5.47,6.06C63.68,32.92,61.11,35,58.24,35H53C51.78,35,50.82,36.08,51.03,37.34z'
            ></path>
            <linearGradient
              id='ipdIa4~cOclR8yt_ClW93b'
              x1='32'
              x2='32'
              y1='530.096'
              y2='590.253'
              gradientTransform='translate(0 -534)'
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='0' stop-color='#42d778'></stop>
              <stop offset='.428' stop-color='#3dca76'></stop>
              <stop offset='1' stop-color='#34b171'></stop>
            </linearGradient>
            <path
              fill='url(#ipdIa4~cOclR8yt_ClW93b)'
              d='M57,32c0,12.837-9.663,23.404-22.115,24.837C33.942,56.942,32.971,57,32,57	c-1.644,0-3.25-0.163-4.808-0.471C15.683,54.298,7,44.163,7,32C7,18.192,18.192,7,32,7S57,18.192,57,32z'
            ></path>
            <path
              fill='#fff'
              d='M41.683,44.394c-0.365,0-0.731-0.181-1.096-0.365c-3.471-2.009-7.674-3.105-12.24-3.105	c-2.559,0-5.116,0.364-7.491,0.912c-0.365,0-0.914,0.183-1.096,0.183c-0.914,0-1.461-0.732-1.461-1.462	c0-0.913,0.547-1.463,1.279-1.643c2.923-0.732,5.846-1.096,8.951-1.096c5.116,0,9.866,1.276,13.885,3.655	c0.548,0.364,0.914,0.73,0.914,1.642C43.145,43.847,42.414,44.394,41.683,44.394z M44.241,38.181c-0.547,0-0.912-0.18-1.279-0.364	c-3.835-2.375-9.135-3.839-15.163-3.839c-2.924,0-5.664,0.366-7.674,0.916c-0.549,0.18-0.731,0.18-1.096,0.18	c-1.096,0-1.827-0.912-1.827-1.826c0-1.096,0.549-1.645,1.461-2.009c2.74-0.73,5.481-1.279,9.317-1.279	c6.213,0,12.241,1.463,16.991,4.384c0.73,0.364,1.096,1.096,1.096,1.826C46.069,37.269,45.337,38.181,44.241,38.181z M47.165,30.876	c-0.548,0-0.731-0.182-1.279-0.364c-4.385-2.559-10.961-4.021-17.356-4.021c-3.289,0-6.577,0.366-9.5,1.096	c-0.366,0-0.731,0.182-1.279,0.182c-1.279,0.183-2.193-0.912-2.193-2.192c0-1.279,0.731-2.009,1.644-2.192	c3.471-1.096,7.125-1.462,11.327-1.462c6.943,0,14.25,1.462,19.731,4.567c0.73,0.366,1.278,1.096,1.278,2.193	C49.357,29.961,48.442,30.876,47.165,30.876z'
            ></path>
          </svg>
          <p className='heading'>Currently Playing</p>
        </div>
        <div className='loader'>
          <div className='song'>
            <p className='name'>Time in a Bottle</p>
            <p className='artist'>Jim Corce</p>
          </div>
          <div className='albumcover'></div>
          <div className='loading'>
            <div className='load'></div>
            <div className='load'></div>
            <div className='load'></div>
            <div className='load'></div>
          </div>
        </div>
        <div className='loader'>
          <div className='song'>
            <p className='name'>My Way</p>
            <p className='artist'>Frank Sinatra</p>
          </div>
          <div className='albumcover'></div>
          <div className='play'></div>
        </div>
        <div className='loader'>
          <div className='song'>
            <p className='name'>Lemon Tree</p>
            <p className='artist'>Fools Garden</p>
          </div>
          <div className='albumcover'></div>
          <div className='play'></div>
        </div>
      </div>
    </div>
  )
}
