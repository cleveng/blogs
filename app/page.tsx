'use client'

import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

export default function Home() {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === 'dark' ?? false

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? 'light' : 'dark')
  }
  return (
    <div className='relative min-h-screen bg-gray-50 px-6 text-gray-700 dark:bg-gray-800 dark:text-white lg:px-8'>
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
    </div>
  )
}
