import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FilterSectionRenderer } from '../components/FilterSection'
import { premiumType } from '../sections/date-type/premiumType'

const meta: Meta<typeof FilterSectionRenderer> = {
  title: 'Features/Global Filters/Date & Type/Premium Type',
  component: FilterSectionRenderer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[360px]">
      <FilterSectionRenderer section={premiumType} />
    </div>
  ),
}


