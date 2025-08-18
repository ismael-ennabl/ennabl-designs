import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '@/components/ui/textarea'

const meta: Meta<typeof Textarea> = { title: 'Design Tokens/Textarea', component: Textarea, parameters: { layout: 'centered' }, tags: ['autodocs'] }
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { args: { placeholder: 'Type here' } }

