import type { Meta, StoryObj } from '@storybook/react'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const meta: Meta<typeof AspectRatio> = {
  title: 'UI/AspectRatio',
  component: AspectRatio,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9}>
      <div className="bg-muted flex h-full w-full items-center justify-center rounded-md">
        16:9
      </div>
    </AspectRatio>
  ),
}
