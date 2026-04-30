'use client'

import { useState, useMemo } from 'react'
import type { CartItem, Product, PaymentMethod, Order } from '@/types'
import { addToCart, updateQuantity, removeFromCart, clearCart } from '@/helpers/cart'
import {
  getProducts,
  getCategories,
  getProductsByCategory,
  searchProducts,
} from '@/services/products'
import { createOrder, getOrders, getSalesSummary } from '@/services/orders'
import {
  Header,
  ProductGrid,
  CategoryTabs,
  Cart,
  SearchBar,
  OrderHistory,
  Dashboard,
  ReceiptDialog,
} from '@/components/pos'

export function POSPage() {
  // View state
  const [currentView, setCurrentView] = useState<'pos' | 'history' | 'dashboard'>('pos')
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  
  // Product filters
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  
  // Receipt dialog
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null)
  const [showReceipt, setShowReceipt] = useState(false)
  
  // Data refresh trigger
  const [refreshKey, setRefreshKey] = useState(0)

  // Get data
  const categories = getCategories()
  const orders = useMemo(() => getOrders(), [refreshKey])
  const summary = useMemo(() => getSalesSummary(), [refreshKey])

  // Filter products
  const filteredProducts = useMemo(() => {
    let products: Product[]

    if (searchQuery) {
      products = searchProducts(searchQuery)
    } else {
      products = getProductsByCategory(activeCategory)
    }

    return products
  }, [searchQuery, activeCategory])

  // Cart handlers
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => addToCart(prev, product))
  }

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => updateQuantity(prev, productId, quantity))
  }

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => removeFromCart(prev, productId))
  }

  const handleClearCart = () => {
    setCartItems(clearCart())
  }

  const handleCheckout = (paymentMethod: PaymentMethod) => {
    if (cartItems.length === 0) return

    const order = createOrder(cartItems, paymentMethod)
    setCompletedOrder(order)
    setShowReceipt(true)
    setCartItems(clearCart())
    setRefreshKey(prev => prev + 1)
  }

  const handleCloseReceipt = () => {
    setShowReceipt(false)
    setCompletedOrder(null)
  }

  // Reset search when changing category
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setSearchQuery('')
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header currentView={currentView} onViewChange={setCurrentView} />

      {currentView === 'pos' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Main content - Products */}
          <main className="flex-1 flex flex-col overflow-hidden p-4">
            <div className="space-y-4 mb-4 shrink-0">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search products by name or SKU..."
              />
              <CategoryTabs
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            <div className="flex-1 overflow-auto">
              <ProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
              />
            </div>
          </main>

          {/* Sidebar - Cart */}
          <aside className="w-96 border-l border-border shrink-0 hidden lg:block">
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onCheckout={handleCheckout}
            />
          </aside>
        </div>
      )}

      {currentView === 'history' && (
        <div className="flex-1 overflow-hidden p-4">
          <OrderHistory orders={orders} />
        </div>
      )}

      {currentView === 'dashboard' && (
        <div className="flex-1 overflow-auto">
          <Dashboard summary={summary} />
        </div>
      )}

      {/* Receipt Dialog */}
      <ReceiptDialog
        order={completedOrder}
        open={showReceipt}
        onClose={handleCloseReceipt}
      />
    </div>
  )
}
