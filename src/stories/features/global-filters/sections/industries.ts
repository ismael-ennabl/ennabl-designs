import type { FilterSection } from '../types'

export const industries: FilterSection = {
  id: 'industries',
  label: 'Industries',
  fields: [
    { id: 'industry', label: 'Industry', type: 'multiSelect', options: [
      { value: 'construction', label: 'Construction' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'tech', label: 'Technology' },
    ] },
  ],
}


