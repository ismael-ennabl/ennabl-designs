import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

type TabletProps = { note?: string }
const TabletLayout = ({ note = 'Full-page layout for medium screens.' }: TabletProps) => (
  <div className="w-[768px] h-[600px] border rounded-md p-6">
    <h2 className="text-xl font-semibold mb-2">Tablet</h2>
    <p className="text-sm text-muted-foreground">{note}</p>
  </div>
)

const meta: Meta<typeof TabletLayout> = {
  title: 'Layouts/Tablet',
  component: TabletLayout,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <TabletLayout />,
  parameters: {
    docs: { description: { story: 'Full-page layout for medium screens.' } },
  },
}


