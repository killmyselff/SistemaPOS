# QuickPOS - Modern Point of Sale System

A modern, responsive Point of Sale (POS) system built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **Product Catalog**: Grid-based product display with categories and search functionality
- **Shopping Cart**: Real-time cart management with quantity controls
- **Checkout**: Multiple payment methods (Cash, Card, Transfer) with tax calculation
- **Order History**: Complete order tracking with detailed receipts
- **Dashboard**: Sales analytics with top products and daily summaries
- **Dark/Light Theme**: Full theme support with system preference detection

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles and design tokens
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Main entry point
│
├── assets/                 # Static assets (images, fonts, etc.)
│
├── components/             # React components
│   ├── pos/                # POS-specific components
│   │   ├── Cart.tsx        # Shopping cart sidebar
│   │   ├── CartItemRow.tsx # Individual cart item
│   │   ├── CategoryTabs.tsx # Category filter tabs
│   │   ├── Dashboard.tsx   # Sales analytics dashboard
│   │   ├── Header.tsx      # App header with navigation
│   │   ├── OrderHistory.tsx # Order history table
│   │   ├── ProductCard.tsx # Product display card
│   │   ├── ProductGrid.tsx # Product grid layout
│   │   ├── ReceiptDialog.tsx # Order completion receipt
│   │   ├── SearchBar.tsx   # Product search input
│   │   └── index.ts        # Component exports
│   │
│   ├── providers/          # Context providers
│   │   └── ThemeProvider.tsx
│   │
│   └── ui/                 # shadcn/ui components
│
├── helpers/                # Utility functions
│   ├── cart.ts             # Cart operations (add, remove, calculate)
│   └── format.ts           # Formatting utilities (currency, date)
│
├── views/                  # View/Page components
│   ├── POSPage.tsx         # Main POS view component
│   └── index.ts            # View exports
│
├── services/               # Data services
│   ├── orders.ts           # Order management
│   └── products.ts         # Product catalog
│
├── types/                  # TypeScript definitions
│   └── index.ts            # All type interfaces
│
└── router/                 # Routing configuration (if needed)
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Key Components

### Cart System
- Add/remove products
- Quantity management
- Real-time price calculation
- 16% tax calculation

### Payment Methods
- **Cash**: Traditional cash payment
- **Card**: Credit/debit card
- **Transfer**: Bank transfer

### Product Categories
- All Products
- Beverages
- Food
- Snacks
- Desserts

## Design Tokens

The app uses a comprehensive design token system for theming:

- **Primary**: Main brand color (blue)
- **Secondary**: Supporting color
- **Accent**: Highlight color (teal)
- **Success**: Success states (green)
- **Warning**: Warning states (amber)
- **Destructive**: Error states (red)

## API Structure

### Products Service
```typescript
getProducts(): Product[]
getProductsByCategory(categoryId: string): Product[]
searchProducts(query: string): Product[]
getCategories(): Category[]
```

### Orders Service
```typescript
createOrder(items: CartItem[], paymentMethod: PaymentMethod): Order
getOrders(): Order[]
getTodayOrders(): Order[]
getSalesSummary(): SalesSummary
```

### Cart Helpers
```typescript
addToCart(cart: CartItem[], product: Product): CartItem[]
removeFromCart(cart: CartItem[], productId: string): CartItem[]
updateQuantity(cart: CartItem[], productId: string, quantity: number): CartItem[]
calculateSubtotal(cart: CartItem[]): number
calculateTax(subtotal: number): number
calculateTotal(subtotal: number, tax: number): number
```

## License

MIT License - feel free to use this project for learning or commercial purposes.
