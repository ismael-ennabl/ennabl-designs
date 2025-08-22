import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const SectionTitleEl = ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>

const meta: Meta<typeof SectionTitleEl> = {
  title: 'Component Tokens (Beta)/Section Title',
  component: SectionTitleEl,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SectionTitleEl>
      This is the default h2 heading used for dividing sections.
    </SectionTitleEl>
  ),
  parameters: {
    docs: { description: { story: 'No variants. Default only.' } },
  },
}


