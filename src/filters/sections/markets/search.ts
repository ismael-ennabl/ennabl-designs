import type { Section } from '../../types'

export const marketsSearch: Section = {
  id: 'markets.search',
  label: 'Search Markets',
  fields: [{ id: 'query', label: 'Search', type: 'search', placeholder: 'Search Markets' }],
}
