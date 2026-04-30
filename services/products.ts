import type { Product, Category } from '@/types'

// Mock categories data
export const categories: Category[] = [
  { id: 'all', name: 'All', icon: 'Grid3X3' },
  { id: 'beverages', name: 'Beverages', icon: 'Coffee' },
  { id: 'food', name: 'Food', icon: 'UtensilsCrossed' },
  { id: 'snacks', name: 'Snacks', icon: 'Cookie' },
  { id: 'desserts', name: 'Desserts', icon: 'Cake' },
]

// Mock products data
export const products: Product[] = [
  {
    id: '1',
    name: 'Espresso',
    price: 2.50,
    category: 'beverages',
    image: '/products/espresso.jpg',
    stock: 100,
    sku: 'BEV-001',
    description: 'Rich and bold single shot espresso',
  },
  {
    id: '2',
    name: 'Cappuccino',
    price: 4.50,
    category: 'beverages',
    image: '/products/cappuccino.jpg',
    stock: 80,
    sku: 'BEV-002',
    description: 'Espresso with steamed milk foam',
  },
  {
    id: '3',
    name: 'Latte',
    price: 4.00,
    category: 'beverages',
    image: '/products/latte.jpg',
    stock: 85,
    sku: 'BEV-003',
    description: 'Espresso with creamy steamed milk',
  },
  {
    id: '4',
    name: 'Mocha',
    price: 5.00,
    category: 'beverages',
    image: '/products/mocha.jpg',
    stock: 70,
    sku: 'BEV-004',
    description: 'Espresso with chocolate and milk',
  },
  {
    id: '5',
    name: 'Iced Coffee',
    price: 3.50,
    category: 'beverages',
    image: '/products/iced-coffee.jpg',
    stock: 90,
    sku: 'BEV-005',
    description: 'Cold brewed coffee over ice',
  },
  {
    id: '6',
    name: 'Hot Chocolate',
    price: 3.50,
    category: 'beverages',
    image: '/products/hot-chocolate.jpg',
    stock: 60,
    sku: 'BEV-006',
    description: 'Rich hot chocolate with whipped cream',
  },
  {
    id: '7',
    name: 'Croissant',
    price: 3.00,
    category: 'food',
    image: '/products/croissant.jpg',
    stock: 40,
    sku: 'FOO-001',
    description: 'Buttery flaky French pastry',
  },
  {
    id: '8',
    name: 'Bagel',
    price: 2.50,
    category: 'food',
    image: '/products/bagel.jpg',
    stock: 50,
    sku: 'FOO-002',
    description: 'Fresh baked bagel with cream cheese',
  },
  {
    id: '9',
    name: 'Sandwich',
    price: 7.50,
    category: 'food',
    image: '/products/sandwich.jpg',
    stock: 30,
    sku: 'FOO-003',
    description: 'Gourmet sandwich with fresh ingredients',
  },
  {
    id: '10',
    name: 'Salad Bowl',
    price: 8.00,
    category: 'food',
    image: '/products/salad.jpg',
    stock: 25,
    sku: 'FOO-004',
    description: 'Fresh garden salad with dressing',
  },
  {
    id: '11',
    name: 'Chocolate Chip Cookie',
    price: 2.00,
    category: 'snacks',
    image: '/products/cookie.jpg',
    stock: 100,
    sku: 'SNK-001',
    description: 'Freshly baked chocolate chip cookie',
  },
  {
    id: '12',
    name: 'Brownie',
    price: 3.00,
    category: 'snacks',
    image: '/products/brownie.jpg',
    stock: 60,
    sku: 'SNK-002',
    description: 'Rich chocolate fudge brownie',
  },
  {
    id: '13',
    name: 'Muffin',
    price: 2.75,
    category: 'snacks',
    image: '/products/muffin.jpg',
    stock: 45,
    sku: 'SNK-003',
    description: 'Blueberry muffin baked fresh daily',
  },
  {
    id: '14',
    name: 'Cheesecake',
    price: 5.50,
    category: 'desserts',
    image: '/products/cheesecake.jpg',
    stock: 20,
    sku: 'DES-001',
    description: 'New York style cheesecake',
  },
  {
    id: '15',
    name: 'Tiramisu',
    price: 6.00,
    category: 'desserts',
    image: '/products/tiramisu.jpg',
    stock: 15,
    sku: 'DES-002',
    description: 'Classic Italian coffee dessert',
  },
  {
    id: '16',
    name: 'Carrot Cake',
    price: 5.00,
    category: 'desserts',
    image: '/products/carrot-cake.jpg',
    stock: 18,
    sku: 'DES-003',
    description: 'Moist carrot cake with cream cheese frosting',
  },
]

/**
 * Get all products
 */
export function getProducts(): Product[] {
  return products
}

/**
 * Get products by category
 */
export function getProductsByCategory(categoryId: string): Product[] {
  if (categoryId === 'all') return products
  return products.filter(p => p.category === categoryId)
}

/**
 * Search products by name
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(
    p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.sku.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get product by ID
 */
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

/**
 * Get all categories
 */
export function getCategories(): Category[] {
  return categories
}
