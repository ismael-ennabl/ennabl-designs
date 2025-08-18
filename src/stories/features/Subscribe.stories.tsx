import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

type SubscribeArgs = {
  email?: string
  frequency?: 'Daily' | 'Weekly' | 'Monthly'
}

const SubscribeModal = ({ email = '', frequency = 'Weekly' }: SubscribeArgs) => {
  const [value, setValue] = useState(email)
  return (
    <div className="w-[420px] rounded-md border p-4 bg-card">
      <div className="mb-2 text-lg font-semibold">Subscribe</div>
      <p className="text-sm text-muted-foreground mb-4">Opens a modal to subscribe via email and select frequency.</p>
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm">Email</label>
          <input className="w-full border rounded px-2 py-1" value={value} onChange={(e) => setValue(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Frequency</label>
          <select className="w-full border rounded px-2 py-1" defaultValue={frequency}>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button className="px-3 py-1 border rounded">Cancel</button>
          <button className="px-3 py-1 border rounded bg-primary text-primary-foreground">Subscribe</button>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof SubscribeModal> = {
  title: 'Features/Subscribe',
  component: SubscribeModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    email: { control: 'text' },
    frequency: { control: 'radio', options: ['Daily', 'Weekly', 'Monthly'] },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { email: '', frequency: 'Weekly' } }


