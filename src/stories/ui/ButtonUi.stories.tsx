import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Button> = { title: 'Design Tokens/Button', component: Button, parameters: { layout: 'centered' }, tags: ['autodocs'] }
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { args: { children: 'Button' } }

