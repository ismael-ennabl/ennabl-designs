import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof RadioGroup> = {
  title: 'Design Tokens/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem id="r1" value="option-1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="r2" value="option-2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
    </RadioGroup>
  ),
}

