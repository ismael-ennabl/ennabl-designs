import type { Section } from '../../types'

export const policyStatus: Section = {
  id: 'policyStatus',
  label: 'Policy Status',
  fields: [
    {
      id: 'amsPolicyStatus',
      label: 'AMS Policy Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'pending', label: 'Pending' },
        { value: 'cancelled', label: 'Cancelled' },
      ],
    },
    {
      id: 'ennablPolicyStatus',
      label: 'ennabl Policy Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'pending', label: 'Pending' },
        { value: 'cancelled', label: 'Cancelled' },
      ],
    },
  ],
}

