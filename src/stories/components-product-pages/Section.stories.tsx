import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Section } from '../../components/ui/section'

const meta: Meta<typeof Section> = {
  title: 'Components (Product Pages)/Section',
  component: Section,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Section title="Section Title">
      <div className="p-4 text-sm text-muted-foreground">Card content goes here (tables, forms, etc.).</div>
    </Section>
  ),
  parameters: {
    docs: { description: { story: 'Section composed of a medium title and a Card wrapper for content.' } },
  },
}


