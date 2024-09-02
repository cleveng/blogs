import React from 'react'
import * as Popover from '@radix-ui/react-popover'

import { ContainerIcon } from '@radix-ui/react-icons'
const ThemeSwitch = () => {
  return (
    <>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className='mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            切换
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content sideOffset={5}>
            <input id='switch' type='checkbox' />
            <div className='app'>
              <div className='body z-10 w-[288px]'>
                <div className='relative flex flex-col rounded-3xl bg-inherit shadow-lg'>
                  <div className='flex items-center justify-between px-7 py-3 text-sm text-gray-600 dark:text-white'>
                    <div>4:20</div>
                    <ContainerIcon />
                  </div>
                  <div
                    style={{ transform: 'translateY(5%)' }}
                    className='content mx-auto flex w-[70%] flex-col text-center'
                  >
                    <div className='circle'>
                      <div className='crescent'></div>
                    </div>

                    <label htmlFor='switch'>
                      <div className='toggle h-11'></div>
                      <div className='mx-auto flex h-11 w-4/6 select-none items-center justify-between text-center text-base font-bold'>
                        <p className='light'>Light</p>
                        <p className='dark opacity-50'>Dark</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <Popover.Arrow className='PopoverArrow' />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  )
}

export default ThemeSwitch
