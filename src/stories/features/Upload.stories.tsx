import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const UploadModal = () => (
  <div className="w-[480px] rounded-md border p-4 bg-card">
    <div className="mb-2 text-lg font-semibold">Upload</div>
    <p className="text-sm text-muted-foreground mb-4">Modal layout for uploading content.</p>
    <div className="border rounded p-6 text-sm text-muted-foreground">Drop files here or click to upload</div>
  </div>
)

const meta: Meta<typeof UploadModal> = {
  title: 'Features/Upload',
  component: UploadModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <UploadModal /> }


