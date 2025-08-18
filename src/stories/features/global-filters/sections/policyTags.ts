import type { FilterSection } from '../types'

export const policyTags: FilterSection = {
  id: 'policyTags',
  label: 'Policy Tags',
  fields: [
    { id: 'policyTags', label: 'Policy Tags', type: 'multiSelect', options: [
      { value: 'highRisk', label: 'High Risk' },
      { value: 'renewal', label: 'Renewal' },
      { value: 'newBusiness', label: 'New Business' },
    ] },
  ],
}


