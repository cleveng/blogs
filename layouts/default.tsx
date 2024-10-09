'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { Theme } from '@radix-ui/themes'
import { Provider } from 'jotai'

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
