import type { FilterSection } from '../types'

export const products: FilterSection = {
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


