import type { Meta, StoryObj } from '@storybook/react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Design Tokens/Resizable',
  component: ResizablePanelGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ width: 600, height: 200 }}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div className="bg-muted h-full w-full" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div className="bg-accent h-full w-full" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}
