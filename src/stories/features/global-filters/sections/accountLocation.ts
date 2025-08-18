import type { FilterSection } from '../types'

export const accountLocation: FilterSection = {
  id: 'accountLocation',
  label: 'Account Location',
  fields: [
    { id: 'state', label: 'State', type: 'multiSelect', options: [
      { value: 'NY', label: 'New York' },
      { value: 'CA', label: 'California' },
      { value: 'TX', label: 'Texas' },
    ] },
    { id: 'country', label: 'Country', type: 'multiSelect', options: [
      { value: 'US', label: 'United States' },
      { value: 'CA', label: 'Canada' },
      { value: 'UK', label: 'United Kingdom' },
    ] },
  ],
}


