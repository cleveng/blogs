'use client'

import { Theme } from '@radix-ui/themes'
import { Provider } from 'jotai'
import { ThemeProvider } from 'next-themes'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: Readonly<Props>) => {
  return (
    <>
      <Provider>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <Theme accentColor='violet' grayColor='mauve' panelBackground='translucent' radius='small'>
            {children}
          </Theme>
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default DefaultLayout
