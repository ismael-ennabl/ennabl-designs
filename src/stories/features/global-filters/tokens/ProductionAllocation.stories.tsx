import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FilterSectionRenderer } from '../components/FilterSection'
import { productionAllocation } from '../sections/date-type/productionAllocation'

const meta: Meta<typeof FilterSectionRenderer> = {
  title: 'Features/Global Filters/Date & Type/Production Allocation',
  component: FilterSectionRenderer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[360px]">
      <FilterSectionRenderer section={productionAllocation} />
    </div>
  ),
}


