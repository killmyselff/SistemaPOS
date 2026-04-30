'use client'

import type { Order } from '@/types'
import { formatCurrency, formatDate } from '@/helpers/format'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
  History,
  Eye,
  Receipt,
  CreditCard,
  Banknote,
  Building2,
} from 'lucide-react'

interface OrderHistoryProps {
  orders: Order[]
}

const paymentIcons: Record<string, React.ElementType> = {
  cash: Banknote,
  card: CreditCard,
  transfer: Building2,
}

const statusColors: Record<string, string> = {
  completed: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  if (orders.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Historial de Pedidos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <Empty>
            <EmptyHeader>
              <EmptyMedia>
                <Receipt />
              </EmptyMedia>
              <EmptyTitle>No hay pedidos aún</EmptyTitle>
              <EmptyDescription>
                Los pedidos completados aparecerán aquí
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="shrink-0">
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Historial de Pedidos
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pedido</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Artículos</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(order => {
                const PaymentIcon = paymentIcons[order.paymentMethod] || Banknote
                const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)

                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs">
                      {order.id.slice(0, 8)}
                    </TableCell>
                    <TableCell>{formatDate(new Date(order.createdAt))}</TableCell>
                    <TableCell>{itemCount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <PaymentIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="capitalize">{order.paymentMethod}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`capitalize ${statusColors[order.status]}`}
                      >
                        {order.status === 'completed'
                          ? 'Completado'
                          : order.status === 'pending'
                          ? 'Pendiente'
                          : 'Cancelado'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(order.total)}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Detalles del Pedido</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="font-mono text-sm space-y-2">
                              {order.items.map(item => (
                                <div
                                  key={item.product.id}
                                  className="flex justify-between"
                                >
                                  <span>
                                    {item.quantity}x {item.product.name}
                                  </span>
                                  <span>
                                    {formatCurrency(
                                      item.product.price * item.quantity
                                    )}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <Separator />
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{formatCurrency(order.subtotal)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Impuesto (16%)</span>
                                <span>{formatCurrency(order.tax)}</span>
                              </div>
                              <div className="flex justify-between font-bold text-base pt-1">
                                <span>Total</span>
                                <span>{formatCurrency(order.total)}</span>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
