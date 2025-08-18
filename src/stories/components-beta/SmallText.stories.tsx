import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const SmallTextEl = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[0.625rem] font-normal">{children}</p>
)

const meta: Meta<typeof SmallTextEl> = {
  title: 'Components (Beta)/Small Text',
  component: SmallTextEl,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SmallTextEl>
      This is the default small paragraph text, mainly for footnotes.
    </SmallTextEl>
  ),
  parameters: {
    docs: { description: { story: 'No variants. Default only.' } },
  },
}


