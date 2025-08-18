import type { FilterSection } from '../../types'

export const marketsPlacement: FilterSection = {
  id: 'markets.placement',
  label: 'Placement',
  fields: [
    {
      id: 'placement',
      label: 'Placement',
      type: 'radio',
      options: [
        { value: 'all', label: 'All' },
        { value: 'direct', label: 'Direct' },
        { value: 'indirect', label: 'Indirect' },
      ],
      defaultValue: 'all',
    },
  ],
}
