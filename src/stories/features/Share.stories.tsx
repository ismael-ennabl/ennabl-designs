import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const ShareModal = () => (
  <div className="w-[420px] rounded-md border p-4 bg-card">
    <div className="mb-2 text-lg font-semibold">Share</div>
    <p className="text-sm text-muted-foreground mb-4">Modal layout for sharing options.</p>
    <div className="flex gap-2">
      <button className="px-3 py-1 border rounded">Copy Link</button>
      <button className="px-3 py-1 border rounded">Email</button>
      <button className="px-3 py-1 border rounded">Slack</button>
    </div>
  </div>
)

const meta: Meta<typeof ShareModal> = {
  title: 'Features/Share',
  component: ShareModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <ShareModal />,
}


