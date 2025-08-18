import type { Section } from '../../types'

export const productionAllocation: Section = {
  id: 'productionAllocation',
  label: 'Production Allocation',
  fields: [
    {
      id: 'allocation',
      label: 'Allocation',
      type: 'select',
      options: [
        { value: 'producerProductionCredit', label: 'Producer Production Credit' },
        { value: 'primaryProducer', label: 'Primary Producer' },
      ],
    },
  ],
}

