import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'

type TriggerProps = {
  label: string
  count?: number
  disabled?: boolean
}

const TriggerOnly: React.FC<TriggerProps> = ({ label, count, disabled }) => {
  return (
    <div className="p-6">
      <Button
        aria-label="Open filters"
        disabled={disabled}
        className="gap-2"
        onClick={() => {
          // no-op in this story; in-app this would open the Filters modal/sidebar
        }}
      >
        <Filter className="h-4 w-4" aria-hidden />
        <span>{label}</span>
        {typeof count === 'number' && count > 0 ? (
          <span
            aria-label={`${count} filters applied`}
            className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1 text-xs text-primary"
          >
            {count}
          </span>
        ) : null}
      </Button>
    </div>
  )
}

const meta: Meta<typeof TriggerOnly> = {
  title: 'Features/Global Filters/Trigger Button',
  component: TriggerOnly,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Standalone Filters trigger button. Use this control to open your Filters modal or sidebar. Accessible label and optional applied-count badge included.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
        ],
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Button label', table: { category: 'content' } },
    count: { control: 'number', description: 'Applied filters badge count', table: { category: 'state' } },
    disabled: { control: 'boolean', description: 'Disable the trigger', table: { category: 'state' } },
  },
  args: {
    label: 'Filters',
    count: 0,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithCount: Story = {
  args: { count: 3 },
}

export const Disabled: Story = {
  args: { disabled: true },
}


