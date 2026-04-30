'use client'

import type { CartItem, PaymentMethod } from '@/types'
import { formatCurrency } from '@/helpers/format'
import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from '@/helpers/cart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { CartItemRow } from './CartItemRow'
import {
  ShoppingCart,
  Trash2,
  CreditCard,
  Banknote,
  Building2,
} from 'lucide-react'
import { useState } from 'react'

interface CartProps {
  items: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onClearCart: () => void
  onCheckout: (paymentMethod: PaymentMethod) => void
}

export function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: CartProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('cash')

  const subtotal = calculateSubtotal(items)
  const tax = calculateTax(subtotal)
  const total = calculateTotal(subtotal, tax)
  const hasItems = items.length > 0

  const paymentMethods: { method: PaymentMethod; label: string; icon: React.ElementType }[] = [
    { method: 'cash', label: 'Efectivo', icon: Banknote },
    { method: 'card', label: 'Tarjeta', icon: CreditCard },
    { method: 'transfer', label: 'Transferencia', icon: Building2 },
  ]

  return (
    <Card className="h-full flex flex-col bg-card">
      <CardHeader className="pb-3 shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart className="h-5 w-5" />
            Pedido Actual
          </CardTitle>
          {hasItems && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={onClearCart}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col overflow-hidden p-4 pt-0">
        {!hasItems ? (
          <div className="flex-1 flex items-center justify-center">
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <ShoppingCart />
                </EmptyMedia>
                <EmptyTitle>El carrito está vacío</EmptyTitle>
                <EmptyDescription>
                  Añade productos para iniciar un nuevo pedido
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-4 px-4">
              <div className="space-y-1">
                {items.map(item => (
                  <CartItemRow
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemoveItem}
                  />
                ))}
              </div>
            </ScrollArea>

            <div className="shrink-0 pt-4 space-y-4">
              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Impuestos</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-xs text-muted-foreground">
                  Seleccionar método de pago
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {paymentMethods.map(({ method, label, icon: Icon }) => (
                    <Button
                      key={method}
                      variant={selectedPayment === method ? 'default' : 'outline'}
                      className="h-14 flex-col gap-1"
                      onClick={() => setSelectedPayment(method)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs">{label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full h-12 text-base"
                onClick={() => onCheckout(selectedPayment)}
              >
                Pagar {formatCurrency(total)}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
