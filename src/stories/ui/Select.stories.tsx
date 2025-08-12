import type { Meta, StoryObj } from '@storybook/react'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger style={{ width: 180 }}>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">One</SelectItem>
        <SelectItem value="2">Two</SelectItem>
        <SelectItem value="3">Three</SelectItem>
      </SelectContent>
    </Select>
  ),
}

