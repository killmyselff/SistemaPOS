'use client'

import type { SalesSummary } from '@/types'
import { formatCurrency, formatNumber } from '@/helpers/format'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Package,
  Award,
} from 'lucide-react'

interface DashboardProps {
  summary: SalesSummary
}

export function Dashboard({ summary }: DashboardProps) {
  const stats = [
    {
      title: 'Total Sales',
      value: formatCurrency(summary.totalSales),
      icon: DollarSign,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Total Orders',
      value: formatNumber(summary.totalOrders),
      icon: ShoppingBag,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Average Ticket',
      value: formatCurrency(summary.averageTicket),
      icon: TrendingUp,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Products Sold',
      value: formatNumber(
        summary.topProducts.reduce((sum, p) => sum + p.quantity, 0)
      ),
      icon: Package,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ]

  const maxQuantity = Math.max(...summary.topProducts.map(p => p.quantity), 1)

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">{"Today's"} sales overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Top Selling Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          {summary.topProducts.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No sales data yet. Complete some orders to see top products.
            </p>
          ) : (
            <div className="space-y-4">
              {summary.topProducts.map((item, index) => (
                <div key={item.product.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-muted-foreground w-6">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.product.price)} each
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{item.quantity} sold</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                  <Progress
                    value={(item.quantity / maxQuantity) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
