import type { FilterSection } from '../types'
import { premiumType } from './date-type/premiumType'
import { productionAllocation } from './date-type/productionAllocation'
import { policyStatus } from './date-type/policyStatus'
import { dateRange } from './date-type/dateRange'

// Composite section: references tokens above as fields for simplicity in Storybook demo
export const dateType: FilterSection = {
  id: 'dateType',
  label: 'Date & Type',
  fields: [],
  childSectionIds: [
    'premiumType',
    'productionAllocation',
    'policyStatus',
    'dateRange',
  ],
}


