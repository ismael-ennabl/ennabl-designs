import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Header as HeaderComp } from '@/components/ui/header'

const meta: Meta<typeof HeaderComp> = {
  title: 'Components (Product Pages)/Header',
  component: HeaderComp,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <HeaderComp title="Page Title" />,
  parameters: {
    docs: { description: { story: 'Header with a medium page title.' } },
  },
}


