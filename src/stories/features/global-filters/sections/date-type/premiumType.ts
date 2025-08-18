import type { FilterSection } from '../../types'

export const premiumType: FilterSection = {
  id: 'premiumType',
  label: 'Premium Type',
  fields: [
    {
      id: 'premiumType',
      label: 'Premium Type',
      type: 'select',
      options: [
        { value: 'billed', label: 'Billed' },
        { value: 'written', label: 'Written' },
        { value: 'ennablWritten', label: 'ennabl Written' },
      ],
    },
  ],
}


