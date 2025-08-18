export type FieldType =
  | 'select'
  | 'text'
  | 'checkbox'
  | 'date'
  | 'dateRange'
  | 'multiSelect'
  | 'search'
  | 'radio'
  | 'note'
  | 'tree'

export type FieldOption = { value: string; label: string }

export type TreeNode = {
  id: string
  label: string
  children?: TreeNode[]
}

export type FilterField = {
  id: string
  label: string
  type: FieldType
  options?: FieldOption[]
  defaultValue?: unknown
  placeholder?: string
  description?: string
  disabled?: boolean
  nodes?: TreeNode[]
}

export type FilterSection = {
  id: string
  label: string
  helpText?: string
  fields: FilterField[]
  childSectionIds?: string[]
}

export type PageConfig = {
  id: string
  label: string
  sectionIds: string[]
}


