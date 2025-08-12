import type { Meta, StoryObj } from '@storybook/react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'

const meta: Meta<typeof HoverCard> = {
  title: 'UI/HoverCard',
  component: HoverCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger className="border px-3 py-2 rounded-md">Hover me</HoverCardTrigger>
      <HoverCardContent>Some content</HoverCardContent>
    </HoverCard>
  ),
}
