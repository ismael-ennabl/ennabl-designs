import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FilterSectionRenderer } from '../../components/FilterSection'
import { marketsSearch } from '../../sections/markets/search'

const meta: Meta<typeof FilterSectionRenderer> = {
  title: 'Features/Global Filters/Markets/Search',
  component: FilterSectionRenderer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[640px]">
      <FilterSectionRenderer section={marketsSearch} />
    </div>
  ),
}
