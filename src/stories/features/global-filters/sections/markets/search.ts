import type { FilterSection } from '../../types'

export const marketsSearch: FilterSection = {
  id: 'markets.search',
  label: 'Search Markets',
  fields: [
    { id: 'query', label: 'Search', type: 'search', placeholder: 'Search Markets' },
  ],
}
