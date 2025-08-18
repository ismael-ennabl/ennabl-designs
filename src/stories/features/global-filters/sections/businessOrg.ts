import type { FilterSection } from '../types'

export const businessOrg: FilterSection = {
  id: 'businessOrg',
  label: 'Business Org',
  fields: [
    { id: 'org', label: 'Organization', type: 'select', options: [
      { value: 'alpha', label: 'Alpha' },
      { value: 'beta', label: 'Beta' },
    ] },
    { id: 'department', label: 'Department', type: 'select', options: [
      { value: 'sales', label: 'Sales' },
      { value: 'ops', label: 'Operations' },
    ] },
  ],
}


