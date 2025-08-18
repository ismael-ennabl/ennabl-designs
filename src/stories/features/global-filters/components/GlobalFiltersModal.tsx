import React, { useMemo, useState } from 'react'
import type { FilterSection } from '../types'
import { FilterSectionRenderer } from './FilterSection'
import { FiltersPanelSidebar, type SidebarItem } from './FiltersPanelSidebar'

type Props = {
	pageLabel: string
	sections: FilterSection[]
	preselectedValues?: Record<string, Record<string, unknown>>
	sectionRegistry?: Record<string, FilterSection>
}

export const GlobalFiltersModal: React.FC<Props> = ({ pageLabel, sections, preselectedValues, sectionRegistry }) => {
	const [activeId, setActiveId] = useState<string | undefined>(sections[0]?.id)
	const sidebarItems: SidebarItem[] = useMemo(() => sections.map((s) => ({ id: s.id, label: s.label })), [sections])
	const sectionMap = useMemo(() => {
		const byIdEntries: [string, FilterSection][] = [
			...sections.map((s) => [s.id, s] as [string, FilterSection]),
		]
		if (sectionRegistry) {
			byIdEntries.push(...Object.entries(sectionRegistry))
			byIdEntries.push(...Object.values(sectionRegistry).map((s) => [s.id, s] as [string, FilterSection]))
		}
		return Object.fromEntries(byIdEntries)
	}, [sections, sectionRegistry])
	const expandChildren = (s: FilterSection): FilterSection[] => {
		if (!s.childSectionIds || s.childSectionIds.length === 0) return [s]
		return s.childSectionIds
			.map((id) => sectionMap[id])
			.filter(Boolean)
	}
	const visibleSections = sections.filter((s) => s.id === activeId).flatMap(expandChildren)
	return (
		<div className="w-full max-w-[1100px] rounded-md border bg-card overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 80px)' }}>
			{/* Header */}
			<div className="px-6 pt-6">
				<div className="mb-2 text-lg font-semibold">Filters – {pageLabel}</div>
				<p className="text-sm text-muted-foreground mb-4">Modal layout for applying global filters across different pages.</p>
			</div>
			{/* Body (sidebar + scrollable content) */}
			<div className="flex flex-1 min-h-0">
				<FiltersPanelSidebar items={sidebarItems} activeId={activeId} onSelect={setActiveId} />
				<div className="flex-1 overflow-y-auto px-6 py-6">
					<div className="flex flex-col gap-6">
						{visibleSections.map((section) => (
							<FilterSectionRenderer
								key={section.id}
								section={section}
								values={preselectedValues?.[section.id]}
							/>
						))}
					</div>
				</div>
			</div>
			{/* Footer */}
			<div className="flex justify-end gap-2 p-6 pt-4 border-t bg-card">
				<button className="px-3 py-1 border rounded">Cancel</button>
				<button className="px-3 py-1 border rounded">Reset</button>
				<button className="px-3 py-1 border rounded bg-primary text-primary-foreground">Apply</button>
			</div>
		</div>
	)
}


