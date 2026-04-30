'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Store,
  LayoutDashboard,
  History,
  Settings,
  LogOut,
  User,
  Sun,
  Moon,
} from 'lucide-react'
import { useTheme } from 'next-themes'

interface HeaderProps {
  currentView: 'pos' | 'history' | 'dashboard'
  onViewChange: (view: 'pos' | 'history' | 'dashboard') => void
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  const navigation = [
    { id: 'pos' as const, label: 'POS', icon: Store },
    { id: 'history' as const, label: 'Orders', icon: History },
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  ]

  return (
    <header className="h-16 border-b border-border bg-card px-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <Store className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">QuickPOS</h1>
            <p className="text-xs text-muted-foreground">Point of Sale</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navigation.map(item => {
            const Icon = item.icon
            const isActive = currentView === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? 'secondary' : 'ghost'}
                size="sm"
                className={`gap-2 ${isActive ? 'bg-secondary' : ''}`}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            )
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="outline" className="hidden sm:flex">
          Terminal 1
        </Badge>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
