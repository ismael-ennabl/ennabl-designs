import React from 'react'

export type SidebarItem = { id: string; label: string; icon?: React.ReactNode }

type Props = { items: SidebarItem[]; activeId?: string; onSelect?: (id: string) => void }

export const FiltersSidebar: React.FC<Props> = ({ items, activeId, onSelect }) => (
  <nav className="w-64 border-r pr-2">
    <ul className="space-y-1">
      {items.map((item) => {
        const isActive = item.id === activeId
        return (
          <li key={item.id}>
            <button
              className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 ${
                isActive ? 'text-blue-600 bg-blue-50' : 'text-foreground/80 hover:bg-muted'
              }`}
              onClick={() => onSelect?.(item.id)}
            >
              {item.icon ?? <span className="w-4 h-4 rounded border" />}
              <span className="text-sm">{item.label}</span>
            </button>
          </li>
        )
      })}
    </ul>
  </nav>
)

