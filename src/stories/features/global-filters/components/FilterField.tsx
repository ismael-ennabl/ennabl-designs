import React from 'react'
import type { FilterField, TreeNode } from '../types'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'

type Props = {
  field: FilterField
  value?: unknown
}

const TreeItem: React.FC<{ node: TreeNode }> = ({ node }) => {
  return (
    <div className="ml-4 my-1">
      <div className="inline-flex items-center gap-2 text-sm">
        <Checkbox id={`tree-${node.id}`} />
        <Label htmlFor={`tree-${node.id}`}>{node.label}</Label>
      </div>
      {node.children?.map((child) => (
        <TreeItem key={child.id} node={child} />
      ))}
    </div>
  )
}

export const FilterFieldRenderer: React.FC<Props> = ({ field, value }) => {
  const id = `field-${field.id}`
  switch (field.type) {
    case 'search':
      return (
        <div className="space-y-1">
          <Label htmlFor={id}>{field.label}</Label>
          <Input id={id} placeholder={field.placeholder ?? ''} defaultValue={String(value ?? field.defaultValue ?? '')} />
        </div>
      )
    case 'radio':
      return (
        <div className="space-y-2">
          <div className="text-sm font-medium">{field.label}</div>
          <RadioGroup defaultValue={String(value ?? field.defaultValue ?? '')}>
            {field.options?.map((opt) => (
              <div key={opt.value} className="inline-flex items-center gap-2 mr-3">
                <RadioGroupItem id={`${id}-${opt.value}`} value={opt.value} />
                <Label htmlFor={`${id}-${opt.value}`}>{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )
    case 'note':
      return <p className="text-sm text-muted-foreground">{field.description ?? field.label}</p>
    case 'tree':
      return (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">{field.label}</div>
            <div className="text-xs flex gap-3">
              <Button variant="link" className="px-0">Select All</Button>
              <Button variant="link" className="px-0">Inverse</Button>
              <Button variant="link" className="px-0">Clear</Button>
            </div>
          </div>
          {(field.nodes ?? []).map((node) => (
            <div key={node.id}>
              <div className="inline-flex items-center gap-2 text-sm">
                <Checkbox id={`tree-${node.id}`} />
                <Label htmlFor={`tree-${node.id}`}>{node.label}</Label>
              </div>
              {node.children?.map((child) => (
                <TreeItem key={child.id} node={child} />
              ))}
            </div>
          ))}
        </div>
      )
    case 'text':
      return (
        <div className="space-y-1">
          <Label htmlFor={id}>{field.label}</Label>
          <Input id={id} defaultValue={String(value ?? field.defaultValue ?? '')} />
        </div>
      )
    case 'date':
      return (
        <div className="space-y-1">
          <Label htmlFor={id}>{field.label}</Label>
          <Input id={id} type="date" defaultValue={String(value ?? field.defaultValue ?? '')} />
        </div>
      )
    case 'checkbox':
      return (
        <div className="inline-flex items-center gap-2 text-sm">
          <Checkbox id={id} disabled={field.disabled} defaultChecked={Boolean(value ?? field.defaultValue)} />
          <Label htmlFor={id}>{field.label}</Label>
        </div>
      )
    case 'select':
      return (
        <div className="space-y-1">
          <Label htmlFor={id}>{field.label}</Label>
          <select id={id} className="w-full border rounded px-2 py-1" defaultValue={String(value ?? field.defaultValue ?? '')}>
            <option value="">Any</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )
    case 'multiSelect':
      return (
        <div className="space-y-1">
          <div className="text-sm">{field.label}</div>
          <div className="flex flex-wrap gap-2">
            {field.options?.map((opt) => (
              <div key={opt.value} className="inline-flex items-center gap-1 text-xs border rounded px-2 py-1">
                <Checkbox id={`${id}-${opt.value}`} />
                <Label htmlFor={`${id}-${opt.value}`}>{opt.label}</Label>
              </div>
            ))}
          </div>
        </div>
      )
    default:
      return null
  }
}


