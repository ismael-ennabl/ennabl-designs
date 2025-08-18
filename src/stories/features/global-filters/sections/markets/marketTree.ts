import type { FilterSection, TreeNode } from '../../types'

const carriers: TreeNode = {
  id: 'carriers',
  label: 'Carriers',
  children: [
    { id: 'carrier-a', label: 'Carrier A' },
    { id: 'carrier-b', label: 'Carrier B' },
  ],
}

const intermediaries: TreeNode = {
  id: 'intermediaries',
  label: 'Intermediaries',
  children: [
    { id: 'intermediary-a', label: 'Intermediary A' },
    { id: 'intermediary-b', label: 'Intermediary B' },
  ],
}

export const marketsTree: FilterSection = {
  id: 'markets.marketTree',
  label: 'Selected: All Markets',
  fields: [
    {
      id: 'tree',
      label: ' ',
      type: 'tree',
      nodes: [carriers, intermediaries],
    },
  ],
}
