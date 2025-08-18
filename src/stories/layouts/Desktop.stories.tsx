import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

type DesktopProps = { note?: string }
const DesktopLayout = ({ note = 'Full-page layout for large screens.' }: DesktopProps) => (
  <div className="w-[1024px] h-[640px] border rounded-md p-6">
    <h2 className="text-xl font-semibold mb-2">Desktop</h2>
    <p className="text-sm text-muted-foreground">{note}</p>
  </div>
)

const meta: Meta<typeof DesktopLayout> = {
  title: 'Layouts/Desktop',
  component: DesktopLayout,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <DesktopLayout />,
  parameters: {
    docs: { description: { story: 'Full-page layout for large screens.' } },
  },
}


