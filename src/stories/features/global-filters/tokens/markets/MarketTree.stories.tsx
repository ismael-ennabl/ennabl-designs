import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FilterSectionRenderer } from '../../components/FilterSection'
import { marketsTree } from '../../sections/markets/marketTree'

const meta: Meta<typeof FilterSectionRenderer> = {
  title: 'Features/Global Filters/Markets/Tree',
  component: FilterSectionRenderer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[640px]">
      <FilterSectionRenderer section={marketsTree} />
    </div>
  ),
}
