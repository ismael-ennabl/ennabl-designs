import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const SmallTextEl = ({ children = 'Small Text' }: { children?: React.ReactNode }) => (
  <p className="text-[0.625rem] font-normal">{children}</p>
)

const meta: Meta<typeof SmallTextEl> = {
  title: 'Component Tokens (Beta)/Small Text',
  component: SmallTextEl,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <SmallTextEl>Small Text</SmallTextEl>,
  parameters: {
    docs: { description: { story: 'p element at 0.625rem, normal weight. Default token for small paragraph text.' } },
  },
}


