import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from '@/components/ui/progress'

const meta: Meta<typeof Progress> = {
  title: 'Design Tokens/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: 66 },
}
