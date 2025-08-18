import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const PageTitleEl = ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>
const Header = () => <header><PageTitleEl>Composed of the Page Title.</PageTitleEl></header>

const meta: Meta<typeof Header> = {
  title: 'Components (Beta)/Header',
  component: Header,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Header />,
  parameters: {
    docs: { description: { story: 'Composed of the Page Title.' } },
  },
}


