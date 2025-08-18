import type { Meta, StoryObj } from '@storybook/react'
import React, { useMemo } from 'react'
import { pages } from '@/filters/pages'
import { registry } from '@/filters/registry'
import type { Section } from '@/filters/types'
import { FiltersModal as Modal } from '@/components/filters/FiltersModal'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type Args = { pageId: string; preselectedValues?: Record<string, Record<string, unknown>> }

const meta: Meta<React.FC<Args>> = {
  title: 'Features/Global Filters',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    pageId: { control: 'select', options: pages.map((p) => p.id) },
    preselectedValues: { control: 'object' },
  },
}
export default meta

type Story = StoryObj<typeof meta>

const Template: React.FC<Args> = ({ pageId, preselectedValues }) => {
  const page = useMemo(() => pages.find((p) => p.id === pageId) ?? pages[0], [pageId])
  const sections: Section[] = page.sectionIds.map((id) => registry[id]).filter(Boolean) as Section[]
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add filters</Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <Modal pageLabel={page.label} sections={sections} preselectedValues={preselectedValues} sectionRegistry={registry} />
      </DialogContent>
    </Dialog>
  )
}

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: { pageId: 'Accounts', preselectedValues: {} },
}


