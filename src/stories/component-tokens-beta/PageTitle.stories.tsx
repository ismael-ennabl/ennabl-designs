import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const PageTitleEl = ({ children = 'Page Title' }: { children?: React.ReactNode }) => <h1>{children}</h1>

const meta: Meta<typeof PageTitleEl> = {
  title: 'Components (Product Pages)/Page Title',
  component: PageTitleEl,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <PageTitleEl>Page Title</PageTitleEl>,
  parameters: {
    docs: { description: { story: 'h1 element. Default token for page titles.' } },
  },
}


