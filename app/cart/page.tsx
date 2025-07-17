'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, clearCart, getTotalPrice } = useCart()
  const [currency, setCurrency] = useState<'USD' | 'LKR'>('USD')
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const handleApplyPromo = () => {
    // Simple promo code logic
    const validCodes = {
      'PIRATE10': 0.10,
      'GRANDLINE': 0.15,
      'STRAWHAT': 0.20
    }
    
    if (validCodes[promoCode as keyof typeof validCodes]) {
      setDiscount(validCodes[promoCode as keyof typeof validCodes])
    } else {
      setDiscount(0)
    }
  }

  const subtotal = getTotalPrice(currency)
  const discountAmount = subtotal * discount
  const total = subtotal - discountAmount

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <div className="text-6xl">🏴‍☠️</div>
          <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
          <p className="text-muted-foreground">
            No treasure in your cart yet! Set sail and find some plans to add.
          </p>
          <Link href="/plans">
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Browse Plans
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Your Digital Treasure Chest
        </h1>
        <p className="text-muted-foreground">
          Review your selected plans before setting sail
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.plan.id} className="bg-card/50 backdrop-blur-sm border-border/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">
                        {item.plan.category === 'minecraft' && '🎮'}
                        {item.plan.category === 'vps' && '⚔️'}
                        {item.plan.category === 'vlss' && '🔐'}
                        {item.plan.category === 'v2ray' && '👻'}
                      </span>
                      <h3 className="font-semibold text-lg">{item.plan.name}</h3>
                      {item.plan.is_popular && (
                        <Badge className="bg-gradient-to-r from-primary to-secondary">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground grid grid-cols-2 gap-2">
                      <span>CPU: {item.plan.vcpu} vCPU</span>
                      <span>RAM: {item.plan.ram}GB</span>
                      <span>Storage: {item.plan.storage}GB {item.plan.storage_type}</span>
                      <span>Quantity: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {currency === 'USD' ? '$' : 'Rs.'} 
                        {(currency === 'USD' ? item.plan.price_usd : item.plan.price_lkr).toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.plan.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Currency Toggle */}
              <div className="flex items-center justify-between">
                <Label htmlFor="cart-currency-toggle">Currency</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">USD</span>
                    <Switch
                      id="cart-currency-toggle"
                      checked={currency === 'LKR'}
                      onCheckedChange={(checked) => setCurrency(checked ? 'LKR' : 'USD')}
                    />
                    <span className="text-sm">LKR</span>
                  </div>
                  {currency === 'LKR' && (
                    <div className="text-xs text-green-600 font-medium">
                      ✓ PayHere Compatible
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Promo Code */}
              <div className="space-y-2">
                <Label htmlFor="promo-code">Promo Code</Label>
                <div className="flex space-x-2">
                  <Input
                    id="promo-code"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyPromo}>
                    Apply
                  </Button>
                </div>
                {discount > 0 && (
                  <div className="text-sm text-green-600">
                    Code applied: {(discount * 100).toFixed(0)}% off
                  </div>
                )}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    {currency === 'USD' ? '$' : 'Rs.'} {subtotal.toFixed(2)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>
                      -{currency === 'USD' ? '$' : 'Rs.'} {discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    {currency === 'USD' ? '$' : 'Rs.'} {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                  Proceed to Checkout
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </CardContent>
          </Card>

          {/* Suggested Add-ons */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/20">
            <CardHeader>
              <CardTitle>Suggested Add-ons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: ".com Domain", price: 3.00, priceLkr: 950 },
                { name: "Ghost Access", price: 1.50, priceLkr: 500 },
                { name: "Phantom Override", price: 2.80, priceLkr: 900 }
              ].map((addon, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                  <span className="text-sm">{addon.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">
                      {currency === 'USD' ? '$' : 'Rs.'} 
                      {(currency === 'USD' ? addon.price : addon.priceLkr).toFixed(2)}
                    </span>
                    <Button size="sm" variant="outline">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}