import * as Popover from '@radix-ui/react-popover'
import { useTheme } from 'next-themes'
import { IoIosBatteryCharging } from 'react-icons/io'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === 'dark' ?? false

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? 'light' : 'dark')
  }

  const now = new Date()
  const today = `${now.getHours()}:${now.getMinutes()}`

  return (
    <>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button type='button' className='relative inline-block rounded-full px-3 py-2 hover:bg-gray-200'>
            <div className='flex h-5 items-center'>{isDarkMode ? <MdDarkMode /> : <MdLightMode />}</div>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content sideOffset={5}>
            <div className='z-10 w-[288px] rounded-2xl bg-white dark:bg-[#26242e]'>
              <div className='relative flex flex-col rounded-2xl bg-inherit shadow-lg'>
                <div className='flex items-center justify-between px-7 py-3 text-sm text-gray-600 dark:text-white'>
                  <div onClick={() => toggleDarkMode()}>{today}</div>
                  <IoIosBatteryCharging />
                </div>
                <div style={{ transform: 'translateY(5%)' }} className='mx-auto flex w-[70%] flex-col text-center'>
                  <div className='relative mx-auto h-32 w-32 rounded-full bg-gradient-to-b from-yellow-500 to-red-500 dark:from-indigo-400 dark:to-sky-200'>
                    <div className='absolute right-0 h-24 w-24 origin-top-right scale-0 rounded-full bg-white ease-in-out dark:scale-100 dark:bg-[#26242e]'></div>
                  </div>

                  <div className='py-8'>
                    <div className='absolute z-10 h-11 w-1/2 cursor-pointer rounded-3xl border-2 border-gray-50 bg-gray-300/10 shadow-lg transition ease-in-out dark:translate-x-full dark:bg-white/10'></div>
                    <div className='mx-auto flex h-11 w-4/6 select-none items-center justify-between text-center text-base font-bold'>
                      <p className='cursor-pointer opacity-100 dark:opacity-50' onClick={() => setTheme('light')}>
                        Light
                      </p>
                      <p
                        className='cursor-pointer opacity-50 shadow-sm dark:text-white dark:opacity-100'
                        onClick={() => setTheme('dark')}
                      >
                        Dark
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Popover.Arrow className='fill-gray-200 dark:fill-[#26242e]' />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  )
}

export default ThemeSwitch
