import type { CartItem, Product } from '@/types'

const TAX_RATE = 0.16 // 16% IVA

/**
 * Add product to cart
 */
export function addToCart(cart: CartItem[], product: Product): CartItem[] {
  const existingItem = cart.find(item => item.product.id === product.id)
  
  if (existingItem) {
    return cart.map(item =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  }
  
  return [...cart, { product, quantity: 1 }]
}

/**
 * Remove product from cart
 */
export function removeFromCart(cart: CartItem[], productId: string): CartItem[] {
  return cart.filter(item => item.product.id !== productId)
}

/**
 * Update item quantity in cart
 */
export function updateQuantity(
  cart: CartItem[],
  productId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(cart, productId)
  }
  
  return cart.map(item =>
    item.product.id === productId ? { ...item, quantity } : item
  )
}

/**
 * Calculate cart subtotal
 */
export function calculateSubtotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

/**
 * Calculate cart tax
 */
export function calculateTax(subtotal: number): number {
  return subtotal * TAX_RATE
}

/**
 * Calculate cart total
 */
export function calculateTotal(subtotal: number, tax: number): number {
  return subtotal + tax
}

/**
 * Get total items count in cart
 */
export function getCartItemsCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}

/**
 * Clear cart
 */
export function clearCart(): CartItem[] {
  return []
}
