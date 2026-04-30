'use client'

import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search products...',
}: SearchBarProps) {
  return (
    <InputGroup>
      <InputGroupAddon type="leading">
        <Search className="h-4 w-4 text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupInput
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-10"
      />
      {value && (
        <InputGroupAddon type="trailing">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onChange('')}
          >
            <X className="h-3 w-3" />
          </Button>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
