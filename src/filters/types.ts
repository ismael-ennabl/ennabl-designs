export type FieldType =
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'multiSelect'
  | 'search'
  | 'date'
  | 'note'
  | 'tree'

export type Option = { value: string; label: string }

export type TreeNode = { id: string; label: string; children?: TreeNode[] }

export type Field = {
  id: string
  label: string
  type: FieldType
  options?: Option[] | (() => Promise<Option[]>)
  defaultValue?: unknown
  disabled?: boolean
  placeholder?: string
  nodes?: TreeNode[]
  description?: string
}

export type Section = {
  id: string
  label: string
  fields: Field[]
  childSectionIds?: string[]
}

export type Page = {
  id: string
  label: string
  sectionIds: string[]
  header?: { title?: string; description?: string }
}

