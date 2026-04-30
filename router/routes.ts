/**
 * Application Routes Configuration
 * 
 * Centralized route definitions for the POS application.
 * This allows for easy navigation management and type-safe routing.
 */

export const routes = {
  // Main views
  pos: '/',
  orders: '/orders',
  dashboard: '/dashboard',
  
  // Settings and configuration
  settings: '/settings',
  profile: '/profile',
  
  // Authentication (if needed in future)
  login: '/login',
  logout: '/logout',
} as const

export type AppRoute = keyof typeof routes
export type AppRoutePath = (typeof routes)[AppRoute]

/**
 * Navigation items for the header
 */
export interface NavItem {
  id: string
  label: string
  path: string
  icon: string
}

export const mainNavItems: NavItem[] = [
  { id: 'pos', label: 'POS', path: routes.pos, icon: 'Store' },
  { id: 'orders', label: 'Orders', path: routes.orders, icon: 'History' },
  { id: 'dashboard', label: 'Dashboard', path: routes.dashboard, icon: 'LayoutDashboard' },
]

/**
 * Helper function to check if a route is active
 */
export function isActiveRoute(currentPath: string, routePath: string): boolean {
  if (routePath === '/') {
    return currentPath === '/'
  }
  return currentPath.startsWith(routePath)
}

/**
 * Helper function to get route by ID
 */
export function getRouteById(id: AppRoute): string {
  return routes[id]
}
