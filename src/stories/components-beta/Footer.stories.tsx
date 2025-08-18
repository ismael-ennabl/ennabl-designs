import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const SmallTextEl = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[0.625rem] font-normal">{children}</p>
)
const Footer = () => <footer><SmallTextEl>Composed of the Small Text.</SmallTextEl></footer>

const meta: Meta<typeof Footer> = {
  title: 'Components (Beta)/Footer',
  component: Footer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Footer />,
  parameters: {
    docs: { description: { story: 'Composed of the Small Text.' } },
  },
}


