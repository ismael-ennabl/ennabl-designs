import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FilterSectionRenderer } from '../components/FilterSection'
import { dateRange } from '../sections/date-type/dateRange'

const meta: Meta<typeof FilterSectionRenderer> = {
  title: 'Features/Global Filters/Date & Type/Date Range',
  component: FilterSectionRenderer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[480px]">
      <FilterSectionRenderer section={dateRange} />
    </div>
  ),
}


