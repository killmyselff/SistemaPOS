'use client'

import type { Category } from '@/types'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Grid3X3,
  Coffee,
  UtensilsCrossed,
  Cookie,
  Cake,
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Grid3X3,
  Coffee,
  UtensilsCrossed,
  Cookie,
  Cake,
}

interface CategoryTabsProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-2">
        {categories.map(category => {
          const IconComponent = iconMap[category.icon] || Grid3X3
          const isActive = activeCategory === category.id

          return (
            <Button
              key={category.id}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              className={`flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary'
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <IconComponent className="h-4 w-4" />
              {category.name}
            </Button>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
