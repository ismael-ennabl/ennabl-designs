import React from 'react'
import type { Section } from '@/filters/types'
import { FilterFieldRenderer } from './FilterFieldRenderer'

type Props = { section: Section; values?: Record<string, unknown> }

export const FilterSection: React.FC<Props> = ({ section, values }) => (
  <section>
    <h4 className="font-medium mb-2">{section.label}</h4>
    <div className="space-y-2 text-sm">
      {section.fields.map((field) => (
        <FilterFieldRenderer key={field.id} field={field} value={values?.[field.id]} />
      ))}
    </div>
  </section>
)

