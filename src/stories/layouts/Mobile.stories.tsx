import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

type MobileProps = { note?: string }
const MobileLayout = ({ note = 'Full-page layout for small screens.' }: MobileProps) => (
  <div className="w-[375px] h-[640px] border rounded-md p-6">
    <h2 className="text-xl font-semibold mb-2">Mobile</h2>
    <p className="text-sm text-muted-foreground">{note}</p>
  </div>
)

const meta: Meta<typeof MobileLayout> = {
  title: 'Layouts/Mobile',
  component: MobileLayout,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <MobileLayout />,
  parameters: {
    docs: { description: { story: 'Full-page layout for small screens.' } },
  },
}


