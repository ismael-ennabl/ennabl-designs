import type { FilterSection } from '../types'

export const markets: FilterSection = {
  id: 'markets',
  label: 'Markets',
  fields: [],
  childSectionIds: [
    'markets.search',
    'markets.placement',
    'markets.carrierType',
    'markets.marketTree',
  ],
}


