'use client'

import type { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { Empty } from '@/components/ui/empty'
import { Package } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <Empty
        icon={Package}
        title="No products found"
        description="Try adjusting your search or category filter"
      />
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}
