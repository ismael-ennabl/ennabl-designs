import type { FilterSection } from '../types'

export const clientTags: FilterSection = {
  id: 'clientTags',
  label: 'Client Tags',
  fields: [
    { id: 'clientTags', label: 'Client Tags', type: 'multiSelect', options: [
      { value: 'priority', label: 'Priority' },
      { value: 'vip', label: 'VIP' },
      { value: 'new', label: 'New' },
    ] },
  ],
}


