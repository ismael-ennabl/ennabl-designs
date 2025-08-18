import type { Section } from './types'
import { premiumType } from './sections/date-type/premiumType'
import { productionAllocation } from './sections/date-type/productionAllocation'
import { policyStatus } from './sections/date-type/policyStatus'
import { dateRange } from './sections/date-type/dateRange'
import { dateType } from './sections/dateType'
import { markets } from './sections/markets'
import { marketsSearch } from './sections/markets/search'
import { marketsPlacement } from './sections/markets/placement'
import { marketsCarrierType } from './sections/markets/carrierType'
import { marketsTree } from './sections/markets/marketTree'
import { products } from './sections/products'

export const registry: Record<string, Section> = {
  premiumType,
  productionAllocation,
  policyStatus,
  dateRange,
  dateType,
  markets,
  marketsSearch,
  marketsPlacement,
  marketsCarrierType,
  marketsTree,
  products,
}

// Dev-time validation: ensure all childSectionIds resolve
if (process.env.NODE_ENV !== 'production') {
  Object.values(registry).forEach((section) => {
    section.childSectionIds?.forEach((id) => {
      if (!registry[id]) {
        // eslint-disable-next-line no-console
        console.warn(`[filters] unresolved childSectionId "${id}" in section "${section.id}"`)
      }
    })
  })
}

