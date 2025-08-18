import type { Section } from '../types'

export const products: Section = {
  id: 'products',
  label: 'Products',
  fields: [
    { id: 'product', label: 'Product', type: 'multiSelect', options: [
      { value: 'auto', label: 'Auto' },
      { value: 'property', label: 'Property' },
      { value: 'gl', label: 'General Liability' },
    ] },
  ],
}

