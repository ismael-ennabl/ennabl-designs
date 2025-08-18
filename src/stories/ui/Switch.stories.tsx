import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '@/components/ui/switch'

const meta: Meta<typeof Switch> = {
  title: 'Design Tokens/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultChecked: true },
}

