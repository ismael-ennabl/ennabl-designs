import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from '@/components/ui/toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Design Tokens/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Toggle', defaultPressed: true },
}
