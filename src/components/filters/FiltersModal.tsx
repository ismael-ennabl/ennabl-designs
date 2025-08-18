import React, { useMemo, useState } from 'react'
import type { Page, Section } from '@/filters/types'
import { FiltersSidebar } from './FiltersSidebar'
import { FilterSection } from './FilterSection'

export type FiltersModalProps = {
  pageLabel: string
  sections: Section[]
  preselectedValues?: Record<string, Record<string, unknown>>
  sectionRegistry?: Record<string, Section>
  onApply?: (values: Record<string, unknown>) => void
}

export const FiltersModal: React.FC<FiltersModalProps> = ({ pageLabel, sections, preselectedValues, sectionRegistry, onApply }) => {
  const [activeId, setActiveId] = useState<string | undefined>(sections[0]?.id)
  const sidebarItems = sections.map((s) => ({ id: s.id, label: s.label }))
  const sectionMap = useMemo(() => {
    const entries: [string, Section][] = [...sections.map((s) => [s.id, s] as [string, Section])]
    if (sectionRegistry) {
      entries.push(...Object.entries(sectionRegistry))
      entries.push(...Object.values(sectionRegistry).map((s) => [s.id, s] as [string, Section]))
    }
    return Object.fromEntries(entries)
  }, [sections, sectionRegistry])

  const expandChildren = (s: Section): Section[] => (!s.childSectionIds?.length ? [s] : s.childSectionIds.map((id) => sectionMap[id]).filter(Boolean))
  const visibleSections = sections.filter((s) => s.id === activeId).flatMap(expandChildren)

  return (
    <div className="w-full max-w-[1100px] rounded-md border bg-card overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 80px)' }}>
      <div className="px-6 pt-6">
        <div className="mb-2 text-lg font-semibold">Filters – {pageLabel}</div>
        <p className="text-sm text-muted-foreground mb-4">Modal layout for applying global filters across different pages.</p>
      </div>
      <div className="flex flex-1 min-h-0">
        <FiltersSidebar items={sidebarItems} activeId={activeId} onSelect={setActiveId} />
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex flex-col gap-6">
            {visibleSections.map((section) => (
              <FilterSection key={section.id} section={section} values={preselectedValues?.[section.id]} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 p-6 pt-4 border-t bg-card">
        <button className="px-3 py-1 border rounded">Cancel</button>
        <button className="px-3 py-1 border rounded">Reset</button>
        <button className="px-3 py-1 border rounded bg-primary text-primary-foreground" onClick={() => onApply?.({})}>Apply</button>
      </div>
    </div>
  )
}

