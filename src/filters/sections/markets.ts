import type { Section } from '../types'

export const markets: Section = {
  id: 'markets',
  label: 'Markets',
  fields: [],
  childSectionIds: ['markets.search','markets.placement','markets.carrierType','markets.marketTree'],
}

