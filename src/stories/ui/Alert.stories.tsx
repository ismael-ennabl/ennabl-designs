import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

const meta: Meta<typeof Alert> = {
  title: 'Design Tokens/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>This is an example alert.</AlertDescription>
    </Alert>
  ),
}

