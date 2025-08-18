import type { Section } from '../../types'

export const marketsPlacement: Section = {
  id: 'markets.placement',
  label: 'Placement',
  fields: [
    { id: 'placement', label: 'Placement', type: 'radio', options: [
      { value: 'all', label: 'All' },
      { value: 'direct', label: 'Direct' },
      { value: 'indirect', label: 'Indirect' },
    ], defaultValue: 'all' },
  ],
}
