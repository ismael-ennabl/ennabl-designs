import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from '@/components/ui/scroll-area'

const meta: Meta<typeof ScrollArea> = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ScrollArea style={{ height: 120, width: 240 }}>
      <div className="space-y-2 p-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="bg-muted rounded px-2 py-1">Row {i + 1}</div>
        ))}
      </div>
    </ScrollArea>
  ),
}
