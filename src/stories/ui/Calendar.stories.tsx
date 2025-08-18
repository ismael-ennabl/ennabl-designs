import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from '@/components/ui/calendar'

const meta: Meta<typeof Calendar> = {
  title: 'Design Tokens/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { numberOfMonths: 1 },
}

