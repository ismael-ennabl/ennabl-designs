import type { FilterSection } from '../types'

export const teams: FilterSection = {
  id: 'teams',
  label: 'Teams',
  fields: [
    { id: 'team', label: 'Team', type: 'multiSelect', options: [
      { value: 'A', label: 'Team A' },
      { value: 'B', label: 'Team B' },
      { value: 'C', label: 'Team C' },
    ] },
  ],
}


