import type { Meta, StoryObj } from '@storybook/react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Design Tokens/ToggleGroup',
  component: ToggleGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  ),
}
