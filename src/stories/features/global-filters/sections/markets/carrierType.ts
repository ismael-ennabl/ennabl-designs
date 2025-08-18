import type { FilterSection } from '../../types'

export const marketsCarrierType: FilterSection = {
  id: 'markets.carrierType',
  label: 'Carrier Type',
  fields: [
    {
      id: 'note',
      label: 'Carrier type filters are disabled because they have\'t been defined. Admins can set carrier types using the Market Mapping page in ennablData.',
      type: 'note',
      description: "Carrier type filters are disabled because they haven't been defined. Admins can set carrier types using the Market Mapping page in ennablData.",
    },
    {
      id: 'strategic',
      label: 'Strategic',
      type: 'checkbox',
      disabled: true,
    },
    {
      id: 'nonStrategic',
      label: 'Non-strategic',
      type: 'checkbox',
      disabled: true,
    },
    {
      id: 'other',
      label: 'Other',
      type: 'checkbox',
      disabled: true,
    },
  ],
}
