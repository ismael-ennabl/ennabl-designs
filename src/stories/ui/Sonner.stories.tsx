import type { Meta, StoryObj } from '@storybook/react'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Toaster> = {
  title: 'UI/Sonner',
  component: Toaster,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div>
      <Button onClick={() => toast('Hello from Sonner!')}>Show toast</Button>
      <Toaster richColors />
    </div>
  ),
}
