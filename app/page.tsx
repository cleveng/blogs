/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-return */
'use client'

import { Box, Button, Card, Container, Grid, Inset, Link, Strong, Text } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon, StarFilledIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import ThemeSwitch from '@/app/components/theme-switch'
import { Signatory } from '@cakioe/kit.js'
import { appid, version } from './config'

export default function Home() {
  const singer = new Signatory('ck069ed4223ac1660f')

  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === 'dark' ?? false

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? 'light' : 'dark')
  }

  const [socket, setSocket] = useState<WebSocket>()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<MessageEvent[]>([])
  const [isConnected, setIsConnected] = useState(false)
  let pingInterval: string | number | NodeJS.Timeout | undefined // 用于存储心跳检测定时器
  useEffect(() => {
    // Initialize WebSocket connection when the component mounts
    const client = new WebSocket('wss://echo.websocket.org') //wss://www.awish.vip/ws?appid=ds069ed4223ac1660f

    // Set the WebSocket instance to state
    setSocket(client)

    client.onopen = () => {
      console.log('Connected to the WebSocket server.')
      setIsConnected(true) // 设置连接状态为已连接
      // 开始心跳检测
      pingInterval = setInterval(() => {
        if (client.readyState === WebSocket.OPEN) {
          const payload = singer.toBase64String({ content: 'ping' })
          client.send(payload)
        }
      }, 5000) // 每 5 秒发送一个 ping
    }

    // Handle incoming locales
    client.onmessage = event => {
      setMessages(prevMessages => [...prevMessages, event.data])
    }

    // Handle WebSocket errors
    client.onerror = error => {
      console.error('WebSocket error:', error)
    }

    client.onclose = event => {
      clearInterval(pingInterval)
      console.log('Disconnected from the WebSocket server.', event)
      setIsConnected(false) // 设置连接状态为已断开
    }

    // Clean up WebSocket connection when the component unmounts
    return () => {
      client.close()
    }
  }, [])

  // Send a message to the WebSocket server
  const sendMessage = () => {
    if (socket && message) {
      const payload = singer.toBase64String({ content: message, method: 'reboot' })
      console.log(payload)
      socket.send(payload)

      setMessage('') // Clear the input field after sending a message
    }
  }

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
                <a className='inline-block rounded-full px-3 py-2 hover:bg-gray-200' href='#'>
                  <div className='relative flex cursor-pointer items-center whitespace-nowrap'>Become a host</div>
                </a>
                <div className='relative block'>
                  <button type='button' className='relative inline-block rounded-full px-3 py-2 hover:bg-gray-200'>
                    <div className='flex h-5 items-center'>
                      <div className='_xpkakx'>
                        <svg
                          viewBox='0 0 16 16'
                          xmlns='http://www.w3.org/2000/svg'
                          aria-hidden='true'
                          role='presentation'
                          focusable='false'
                          style={{ display: 'block', height: '16px', width: '16px', fill: 'currentcolor' }}
                        >
                          <path d='m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z'></path>
                        </svg>
                      </div>
                    </div>
                  </button>
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
                <a className='' href=''>
                  <svg
                    className='svg-inline--fa fa-user fa-w-14 fa-9x h-9 p-2 text-gray-500 lg:h-10'
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='far'
                    data-icon='user'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 448 512'
                  >
                    <path
                      fill='currentColor'
                      d='M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z'
                    ></path>
                  </svg>
                </a>
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
        <div className='mx-auto max-w-3xl pb-32 pt-20 sm:pb-40 sm:pt-48'>
          <div>
            <div>
              <h1 className='text-4xl font-bold tracking-tight sm:text-center sm:text-6xl'>{t('title')}</h1>
              <p className='mt-6 text-lg leading-8 sm:text-center'>
                Long description of your website, Long description of your website, Long description of your website,
                Long description of your website, Long description of your website,
                <Text>{appid}</Text>
                <Text>{version}</Text>
              </p>
              <div className='mt-8 flex gap-x-4 sm:justify-center'>
                <Button size='3' variant='solid' onClick={() => toggleDarkMode()}>
                  Getting Start
                  <span aria-hidden='true' className='text-indigo-200'>
                    →
                  </span>
                </Button>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button size='3' variant='solid'>
                      Read the guide
                      <span aria-hidden='true' className='text-indigo-200'>
                        →
                      </span>
                    </Button>
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
        <Container>
          <Grid columns='4' gap='8'>
            {Array.from({ length: 4 }, (_, i) => i + 1).map(number => (
              <Box key={number}>
                <Card className='w-full'>
                  <Inset clip='padding-box' side='top' pb='current'>
                    <img
                      src='https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
                      alt='Bold typography'
                      style={{
                        display: 'block',
                        objectFit: 'cover',
                        width: '100%',
                        height: 140,
                        backgroundColor: 'var(--gray-5)'
                      }}
                    />
                  </Inset>
                  <Text as='p' size='3'>
                    <Strong>Typography</Strong> is the art and technique of arranging type to make written language
                    legible, readable and appealing when displayed.
                  </Text>
                </Card>
              </Box>
            ))}
          </Grid>
        </Container>
        {/* Product start */}
        <section className='container mx-auto'>
          <div className='mb-20'>
            <h2 className='tracki mt-12 text-center text-3xl font-bold sm:text-5xl'>Pricing</h2>
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
        {/* Product end */}
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
                <a
                  title='youtube url'
                  href='https://www.youtube.com/@mcqmate'
                  target='_blank'
                  rel='noopener noreferrer'
                >
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
              <h3 className='mb-6 mt-5 text-xl font-normal text-gray-500'>
                Are you sure you want to delete this user?
              </h3>
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
        <div className='container mx-auto'>
          <h4>websocket</h4>
          <div>
            <input type='text' value={message} onChange={e => setMessage(e.target.value)} placeholder='Enter message' />
            <button onClick={sendMessage}>Send</button>
          </div>

          <div>
            <h2>Messages from Server: {isConnected ? 'Connected' : 'Disconnected'}</h2>
            <ul>
              {messages.map((msg: MessageEvent, index: number) => (
                <li key={index}>{msg as unknown as never}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div className='fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 h-[634px] w-[440px] rounded-lg border border-[#e5e7eb] bg-white p-6 md:hidden'>
            <div className='flex flex-col space-y-1.5 pb-6'>
              <h2 className='text-lg font-semibold tracking-tight'>Chatbot</h2>
              <p className='text-sm leading-3 text-[#6b7280]'>Powered by Mendable and Vercel</p>
            </div>
            <div className='table h-[474px] min-w-full pr-4'>
              <div className='my-4 flex flex-1 gap-3 text-sm text-gray-600'>
                <span className='relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full'>
                  <div className='rounded-full border bg-gray-100 p-1'>
                    <svg
                      stroke='none'
                      fill='black'
                      stroke-width='1.5'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                      height='20'
                      width='20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
                      ></path>
                    </svg>
                  </div>
                </span>
                <p className='leading-relaxed'>
                  <span className='block font-bold text-gray-700'>AI </span>Hi, how can I help you today?
                </p>
              </div>

              <div className='my-4 flex flex-1 gap-3 text-sm text-gray-600'>
                <span className='relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full'>
                  <div className='rounded-full border bg-gray-100 p-1'>
                    <svg
                      stroke='none'
                      fill='black'
                      stroke-width='0'
                      viewBox='0 0 16 16'
                      height='20'
                      width='20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z'></path>
                    </svg>
                  </div>
                </span>
                <p className='leading-relaxed'>
                  <span className='block font-bold text-gray-700'>You </span>fewafef
                </p>
              </div>

              <div className='my-4 flex flex-1 gap-3 text-sm text-gray-600'>
                <span className='relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full'>
                  <div className='rounded-full border bg-gray-100 p-1'>
                    <svg
                      stroke='none'
                      fill='black'
                      stroke-width='1.5'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                      height='20'
                      width='20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
                      ></path>
                    </svg>
                  </div>
                </span>
                <p className='leading-relaxed'>
                  <span className='block font-bold text-gray-700'>AI </span>Sorry, I could not find any information in
                  the documentation about that. Expect answer to be less accurateI could not find the answer to this in
                  the verified sources.
                </p>
              </div>
            </div>

            <div className='flex items-center pt-0'>
              <form className='flex w-full items-center justify-center space-x-2'>
                <input
                  className='flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#030712] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  placeholder='Type your message'
                  value=''
                />
                <button className='inline-flex h-10 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-[#f9fafb] hover:bg-[#111827E6] disabled:pointer-events-none disabled:opacity-50'>
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className='container mx-auto mt-10'>
          <ThemeSwitch />
        </div>
      </div>
    </>
  )
}
