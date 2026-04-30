'use client'

import type { Order } from '@/types'
import { formatCurrency, formatDate } from '@/helpers/format'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, Printer, Download } from 'lucide-react'

interface ReceiptDialogProps {
  order: Order | null
  open: boolean
  onClose: () => void
}

export function ReceiptDialog({ order, open, onClose }: ReceiptDialogProps) {
  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            ¡Pedido Completado!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <div className="text-center space-y-1 pb-4">
              <h3 className="font-bold text-lg">QuickPOS</h3>
              <p className="text-xs text-muted-foreground">
                {formatDate(new Date(order.createdAt))}
              </p>
              <p className="text-xs text-muted-foreground">
                Pedido #{order.id.slice(0, 8)}
              </p>
            </div>

            <Separator className="my-3" />

            <div className="space-y-2">
              {order.items.map(item => (
                <div key={item.product.id} className="flex justify-between text-xs">
                  <span>
                    {item.quantity}x {item.product.name}
                  </span>
                  <span>{formatCurrency(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <Separator className="my-3" />

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Impuesto (16%)</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-2">
                <span>TOTAL</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>

            <Separator className="my-3" />

            <div className="text-center text-xs space-y-1">
              <p className="capitalize">Pagado con {order.paymentMethod}</p>
              <p className="text-muted-foreground">¡Gracias por tu compra!</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              <Printer className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
          </div>

          <Button className="w-full" onClick={onClose}>
            Nuevo Pedido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
