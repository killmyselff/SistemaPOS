// Product types
export interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  stock: number
  sku: string
  description?: string
}

// Cart types
export interface CartItem {
  product: Product
  quantity: number
}

// Order types
export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  tax: number
  total: number
  paymentMethod: PaymentMethod
  status: OrderStatus
  createdAt: Date
  customerName?: string
}

export type PaymentMethod = 'cash' | 'card' | 'transfer'
export type OrderStatus = 'pending' | 'completed' | 'cancelled'

// Category type
export interface Category {
  id: string
  name: string
  icon: string
}

// Sales summary
export interface SalesSummary {
  totalSales: number
  totalOrders: number
  averageTicket: number
  topProducts: { product: Product; quantity: number }[]
}
