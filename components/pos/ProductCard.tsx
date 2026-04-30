'use client'

import type { Product } from '@/types'
import { formatCurrency } from '@/helpers/format'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package } from 'lucide-react'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isLowStock = product.stock < 10
  const isOutOfStock = product.stock === 0

  return (
    <Card
      className={`group cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/50 ${
        isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={() => !isOutOfStock && onAddToCart(product)}
    >
      <CardContent className="p-4">
        <div className="relative mb-3">
          <div className="aspect-square rounded-lg bg-muted flex items-center justify-center overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <Package className="h-12 w-12 text-muted-foreground/50" />
            )}
          </div>
          {isLowStock && !isOutOfStock && (
            <Badge
              variant="destructive"
              className="absolute top-2 right-2 text-xs"
            >
              Low Stock
            </Badge>
          )}
          {isOutOfStock && (
            <Badge
              variant="secondary"
              className="absolute top-2 right-2 text-xs"
            >
              Out of Stock
            </Badge>
          )}
        </div>
        
        <div className="space-y-1">
          <h3 className="font-medium text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground">{product.sku}</p>
          <div className="flex items-center justify-between pt-1">
            <span className="font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
            <span className="text-xs text-muted-foreground">
              {product.stock} in stock
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
