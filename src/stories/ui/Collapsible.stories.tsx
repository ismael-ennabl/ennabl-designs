import type { Meta, StoryObj } from '@storybook/react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'

const meta: Meta<typeof Collapsible> = {
  title: 'Design Tokens/Collapsible',
  component: Collapsible,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger className="border px-3 py-2 rounded-md">Toggle</CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2">Hidden content</div>
      </CollapsibleContent>
    </Collapsible>
  ),
}
