import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Design Tokens/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger className="border rounded-md px-3 py-2">Hover me</TooltipTrigger>
      <TooltipContent>Tooltip text</TooltipContent>
    </Tooltip>
  ),
}

