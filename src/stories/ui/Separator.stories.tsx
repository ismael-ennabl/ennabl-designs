import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from '@/components/ui/separator'

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <div>Above</div>
      <Separator className="my-2" />
      <div>Below</div>
    </div>
  ),
}
