import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

type DownloadArgs = {
  format: 'XLS' | 'PDF' | 'JSON' | 'All'
}

const DownloadButton = ({ format }: DownloadArgs) => (
  <div className="space-y-2">
    <div className="text-sm text-muted-foreground">Dropdown button to export data in different formats.</div>
    <div className="inline-flex items-center gap-2">
      <button className="px-3 py-1 border rounded">Download</button>
      <select className="border rounded px-2 py-1" defaultValue={format}>
        <option value="XLS">XLS</option>
        <option value="PDF">PDF</option>
        <option value="JSON">JSON</option>
        <option value="All">All</option>
      </select>
    </div>
  </div>
)

const meta: Meta<typeof DownloadButton> = {
  title: 'Features/Download',
  component: DownloadButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    format: { control: 'radio', options: ['XLS', 'PDF', 'JSON', 'All'] },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { format: 'XLS' } }


