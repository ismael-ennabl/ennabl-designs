import type { Decorator, Preview } from '@storybook/nextjs-vite'
import React from 'react'
import { ThemeProvider } from 'next-themes'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '../src/app/globals.css'

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', icon: 'sun', title: 'Light' },
        { value: 'dark', icon: 'moon', title: 'Dark' },
      ],
      dynamicTitle: true,
    },
  },
} satisfies Preview['globalTypes']

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as 'light' | 'dark'
  return (
    <ThemeProvider attribute="class" enableSystem={false} forcedTheme={theme}>
      <Story />
    </ThemeProvider>
  )
}

export const decorators = [withTheme]

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview