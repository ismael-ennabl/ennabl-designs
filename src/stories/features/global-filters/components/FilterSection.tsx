import React from 'react'
import type { FilterSection } from '../types'
import { FilterFieldRenderer } from './FilterField'

type Props = {
  section: FilterSection
  values?: Record<string, unknown>
}

export const FilterSectionRenderer: React.FC<Props> = ({ section, values }) => {
  return (
    <section>
      <h4 className="font-medium mb-2">{section.label}</h4>
      <div className="space-y-2 text-sm">
        {section.fields.map((field) => (
          <FilterFieldRenderer key={field.id} field={field} value={values?.[field.id]} />
        ))}
      </div>
    </section>
  )
}


