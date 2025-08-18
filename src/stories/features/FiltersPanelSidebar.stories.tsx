import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { FiltersPanelSidebar, type SidebarItem } from './global-filters/components/FiltersPanelSidebar'

const Demo: React.FC = () => {
  const items: SidebarItem[] = [
    { id: 'dateType', label: 'Date & Type' },
    { id: 'markets', label: 'Markets' },
    { id: 'products', label: 'Products' },
    { id: 'businessOrg', label: 'Business Org' },
  ]
  const [active, setActive] = useState('dateType')
  return (
    <div className="flex w-[720px] h-[420px] border rounded overflow-hidden">
      <FiltersPanelSidebar items={items} activeId={active} onSelect={setActive} />
      <div className="flex-1 p-6">
        <div className="text-sm text-muted-foreground">Active panel: <span className="font-medium">{active}</span></div>
      </div>
    </div>
  )
}

const meta: Meta<typeof Demo> = {
  title: 'Features/Global Filters/Panel Sidebar',
  component: Demo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}


