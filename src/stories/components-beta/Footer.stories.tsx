import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Footer as FooterComp } from '@/components/ui/footer'

const meta: Meta<typeof FooterComp> = {
  title: 'Components (Product Pages)/Footer',
  component: FooterComp,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <FooterComp note="Small footer note." />,
  parameters: {
    docs: { description: { story: 'Footer with small text note.' } },
  },
}


