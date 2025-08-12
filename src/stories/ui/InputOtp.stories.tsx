import type { Meta, StoryObj } from '@storybook/react'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'

const meta: Meta<typeof InputOTP> = {
  title: 'UI/InputOtp',
  component: InputOTP,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <InputOTP maxLength={6} containerClassName="gap-2">
      <InputOTPGroup>
        {[0,1,2].map(i => <InputOTPSlot key={i} index={i} />)}
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        {[3,4,5].map(i => <InputOTPSlot key={i} index={i} />)}
      </InputOTPGroup>
    </InputOTP>
  ),
}
