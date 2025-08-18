import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '@/components/ui/checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Design Tokens/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultChecked: true },
}

