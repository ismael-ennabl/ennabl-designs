import type { FilterSection } from '../../types'

export const dateRange: FilterSection = {
  id: 'dateRange',
  label: 'Date Range',
  fields: [
    {
      id: 'rangePreset',
      label: 'Preset',
      type: 'select',
      options: [
        { value: 'next30', label: 'Next 30 days' },
        { value: 'next60', label: 'Next 60 days' },
        { value: 'next90', label: 'Next 90 days' },
        { value: 'custom', label: 'Custom' },
      ],
    },
    { id: 'from', label: 'From', type: 'date' },
    { id: 'to', label: 'To', type: 'date' },
  ],
}


