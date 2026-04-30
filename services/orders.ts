import type { Order, CartItem, PaymentMethod, SalesSummary } from '@/types'
import { generateId } from '@/helpers/format'
import { calculateSubtotal, calculateTax, calculateTotal } from '@/helpers/cart'

// In-memory orders storage (would be a database in production)
let orders: Order[] = []

/**
 * Create a new order
 */
export function createOrder(
  items: CartItem[],
  paymentMethod: PaymentMethod,
  customerName?: string
): Order {
  const subtotal = calculateSubtotal(items)
  const tax = calculateTax(subtotal)
  const total = calculateTotal(subtotal, tax)

  const order: Order = {
    id: generateId(),
    items: [...items],
    subtotal,
    tax,
    total,
    paymentMethod,
    status: 'completed',
    createdAt: new Date(),
    customerName,
  }

  orders = [order, ...orders]
  return order
}

/**
 * Get all orders
 */
export function getOrders(): Order[] {
  return orders
}

/**
 * Get order by ID
 */
export function getOrderById(id: string): Order | undefined {
  return orders.find(o => o.id === id)
}

/**
 * Get today's orders
 */
export function getTodayOrders(): Order[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return orders.filter(o => {
    const orderDate = new Date(o.createdAt)
    orderDate.setHours(0, 0, 0, 0)
    return orderDate.getTime() === today.getTime()
  })
}

/**
 * Get sales summary for today
 */
export function getSalesSummary(): SalesSummary {
  const todayOrders = getTodayOrders()
  
  const totalSales = todayOrders.reduce((sum, o) => sum + o.total, 0)
  const totalOrders = todayOrders.length
  const averageTicket = totalOrders > 0 ? totalSales / totalOrders : 0

  // Calculate top products
  const productSales = new Map<string, { product: CartItem['product']; quantity: number }>()
  
  todayOrders.forEach(order => {
    order.items.forEach(item => {
      const existing = productSales.get(item.product.id)
      if (existing) {
        existing.quantity += item.quantity
      } else {
        productSales.set(item.product.id, {
          product: item.product,
          quantity: item.quantity,
        })
      }
    })
  })

  const topProducts = Array.from(productSales.values())
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)

  return {
    totalSales,
    totalOrders,
    averageTicket,
    topProducts,
  }
}

/**
 * Cancel an order
 */
export function cancelOrder(id: string): boolean {
  const orderIndex = orders.findIndex(o => o.id === id)
  if (orderIndex === -1) return false
  
  orders[orderIndex] = { ...orders[orderIndex], status: 'cancelled' }
  return true
}
