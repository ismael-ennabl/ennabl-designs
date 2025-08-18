import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const SectionTitleEl = ({ children = 'Section Title' }: { children?: React.ReactNode }) => <h2>{children}</h2>

const meta: Meta<typeof SectionTitleEl> = {
  title: 'Component Tokens (Beta)/Section Title',
  component: SectionTitleEl,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <SectionTitleEl>Section Title</SectionTitleEl>,
  parameters: {
    docs: { description: { story: 'h2 element. Default token for section headings.' } },
  },
}


