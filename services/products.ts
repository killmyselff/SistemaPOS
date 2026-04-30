import type { Product, Category } from '@/types'

// Mock categories data
export const categories: Category[] = [
  { id: 'all', name: 'Todos', icon: 'Grid3X3' },
  { id: 'beverages', name: 'Bebidas', icon: 'Coffee' },
  { id: 'food', name: 'Comida', icon: 'UtensilsCrossed' },
  { id: 'snacks', name: 'Snacks', icon: 'Cookie' },
  { id: 'desserts', name: 'Postres', icon: 'Cake' },
]

// Mock products data
export const products: Product[] = [
  {
    id: '1',
    name: 'Tinto',
    price: 2500,
    category: 'beverages',
    image: '/images/image_content_26048298_20160519204438.webp',
    stock: 100,
    sku: 'BEV-001',
    description: 'Café negro tradicional colombiano.',
  },
  {
    id: '2',
    name: 'Café con Leche',
    price: 3500,
    category: 'beverages',
    image: '/images/Cafe-con-Leche-r11.jpg',
    stock: 80,
    sku: 'BEV-002',
    description: 'Café suave mezclado con leche caliente.',
  },
  {
    id: '3',
    name: 'Jugo de Lulo',
    price: 4500,
    category: 'beverages',
    image: '/images/jugo-lulo-scaled.webp',
    stock: 50,
    sku: 'BEV-003',
    description: 'Jugo refrescante de lulo, preparado en agua o leche.',
  },
  {
    id: '4',
    name: 'Gaseosa Postobón',
    price: 3000,
    category: 'beverages',
    image: '/images/sala_prensa_corporativo_gaseosas_sabores_1.webp',
    stock: 90,
    sku: 'BEV-004',
    description: 'Gaseosa de sabores surtidos (Manzana, Uva, Naranja).',
  },
  {
    id: '5',
    name: 'Agua en Botella',
    price: 2500,
    category: 'beverages',
    image: '/images/Agua-Mineral-Natural-MANANTIAL-500-Mililitro-3014170_a-e1733236619107.webp',
    stock: 120,
    sku: 'BEV-005',
    description: 'Agua purificada sin gas o con gas.',
  },
  {
    id: '6',
    name: 'Pandebono',
    price: 3000,
    category: 'snacks',
    image: '/images/900X570_Pandebono-Columbian-Cheese-Bread.webp',
    stock: 60,
    sku: 'SNA-001',
    description: 'Panecillo tradicional del Valle del Cauca, a base de queso.',
  },
  {
    id: '7',
    name: 'Buñuelo',
    price: 2500,
    category: 'snacks',
    image: '/images/DSC_1177.jpg',
    stock: 70,
    sku: 'SNA-002',
    description: 'Bolas de masa de queso fritas, crujientes por fuera y suaves por dentro.',
  },
  {
    id: '8',
    name: 'Empanada de Carne',
    price: 3500,
    category: 'snacks',
    image: '/images/1200_900.jpg',
    stock: 55,
    sku: 'SNA-003',
    description: 'Empanada frita rellena de carne y papa, acompañada de ají.',
  },
  {
    id: '9',
    name: 'Arepa con Queso',
    price: 4500,
    category: 'food',
    image: '/images/Receta_Arepa_de_chocolo_Aderezos_L.webp',
    stock: 40,
    sku: 'FOO-001',
    description: 'Arepa de maíz asada y rellena de queso derretido.',
  },
  {
    id: '10',
    name: 'Pastel de Pollo',
    price: 5000,
    category: 'food',
    image: '/images/dPRpTn3F7vN9JDFbk-x-900.webp',
    stock: 35,
    sku: 'FOO-002',
    description: 'Pastel de hojaldre horneado relleno de guiso de pollo.',
  },
  {
    id: '11',
    name: 'Torta de Chocolate',
    price: 6000,
    category: 'desserts',
    image: '/images/e2928ff551a360cdadb4e5a2528841b7.jpg',
    stock: 25,
    sku: 'DES-001',
    description: 'Porción de torta húmeda de chocolate con cobertura de ganache.',
  },
  {
    id: '12',
    name: 'Cheesecake de Fresa',
    price: 7500,
    category: 'desserts',
    image: '/images/POSTREWEB.png',
    stock: 20,
    sku: 'DES-002',
    description: 'Cremoso cheesecake con una capa de mermelada de fresa.',
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
