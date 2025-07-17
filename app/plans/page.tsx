'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Check, Star, Cpu, HardDrive, MemoryStick, Zap, Shield, Clock, Users, ArrowRight, Sparkles } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/hooks/use-toast'
import { Separator } from '@/components/ui/separator'
import { localDB, Plan } from '@/lib/database'
import AnnouncementBanner from '@/components/AnnouncementBanner'
import Link from 'next/link'

export default function PlansPage() {
  const { items, addItem, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCart()
  const { toast } = useToast()
  const [currency, setCurrency] = useState<'USD' | 'LKR'>('USD')
  const [plans, setPlans] = useState<Plan[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('minecraft')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await localDB.fetchPlans()
        setPlans(fetchedPlans)
      } catch (error) {
        console.error('Error fetching plans:', error)
        toast({
          title: "Error",
          description: "Failed to load plans. Please refresh the page.",
          variant: "destructive"
        })
      }
    }
    fetchPlans()
  }, [toast])

  const handleAddToCart = (plan: Plan) => {
    try {
      addItem(plan)
      toast({
        title: "Added to cart",
        description: `${plan.name} has been added to your cart.`,
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive"
      })
    }
  }

  const getItemQuantity = (planId: string) => {
    const item = items.find(item => item.plan.id === planId)
    return item ? item.quantity : 0
  }

  const formatPrice = (priceUsd: number, priceLkr: number) => {
    const price = currency === 'USD' ? priceUsd : priceLkr
    const symbol = currency === 'USD' ? '$' : 'Rs.'
    const yearlyPrice = billingCycle === 'yearly' ? price * 10 : price // 2 months free
    return billingCycle === 'yearly' 
      ? `${symbol}${yearlyPrice.toFixed(2)}/year`
      : `${symbol}${price.toFixed(2)}/month`
  }

  const getOriginalPrice = (priceUsd: number, priceLkr: number) => {
    if (billingCycle === 'monthly') return null
    const price = currency === 'USD' ? priceUsd : priceLkr
    const symbol = currency === 'USD' ? '$' : 'Rs.'
    return `${symbol}${(price * 12).toFixed(2)}/year`
  }

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'minecraft':
        return {
          title: 'Minecraft Hosting',
          subtitle: 'Grand Line Ship Tier',
          description: 'High-performance Minecraft servers with instant setup and 24/7 support',
          icon: '🎮',
          color: 'from-green-500 to-emerald-600',
          features: ['Instant Setup', 'Full FTP Access', 'Plugin Support', 'DDoS Protection']
        }
      case 'vps':
        return {
          title: 'VPS Hosting',
          subtitle: 'Nakama Core VPS',
          description: 'Powerful virtual private servers with root access and unlimited possibilities',
          icon: '🖥️',
          color: 'from-blue-500 to-cyan-600',
          features: ['Root Access', 'SSD Storage', 'Multiple OS', '99.9% Uptime']
        }
      case 'vlss':
        return {
          title: 'Web Hosting',
          subtitle: 'Marine Cipher Nodes',
          description: 'Fast and reliable web hosting with cPanel and one-click installations',
          icon: '🌐',
          color: 'from-purple-500 to-violet-600',
          features: ['cPanel Included', 'SSL Certificates', 'Daily Backups', 'Email Hosting']
        }
      case 'v2ray':
        return {
          title: 'Proxy Services',
          subtitle: 'Devil Signal Fruits',
          description: 'Secure proxy solutions with high-speed connections and privacy protection',
          icon: '🔒',
          color: 'from-red-500 to-pink-600',
          features: ['High Speed', 'Multiple Locations', 'No Logs', 'Unlimited Bandwidth']
        }
      default:
        return {
          title: 'Hosting Plans',
          subtitle: 'Choose Your Plan',
          description: 'Select the perfect hosting solution for your needs',
          icon: '🏴‍☠️',
          color: 'from-gray-500 to-slate-600',
          features: []
        }
    }
  }

  const categories = [
    { id: 'minecraft', name: 'Minecraft', icon: '🎮' },
    { id: 'vps', name: 'VPS', icon: '🖥️' },
    { id: 'vlss', name: 'Web Hosting', icon: '🌐' },
    { id: 'v2ray', name: 'Proxy', icon: '🔒' }
  ]

  const filteredPlans = plans.filter(plan => plan.category === activeCategory)
  const categoryInfo = getCategoryInfo(activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Announcements */}
        <div className="mb-8">
          <AnnouncementBanner page="plans" />
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Professional Hosting Solutions</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Choose Your Hosting Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Reliable, fast, and secure hosting solutions for every need. From personal projects to enterprise applications.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 space-y-6 lg:space-y-0">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'hover:bg-primary/10'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-6">
            {/* Billing Cycle */}
            <div className="flex items-center space-x-3 bg-card border rounded-full p-1">
              <Button
                variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setBillingCycle('monthly')}
                className="rounded-full px-4"
              >
                Monthly
              </Button>
              <Button
                variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setBillingCycle('yearly')}
                className="rounded-full px-4"
              >
                Yearly
                <Badge className="ml-2 bg-green-500 text-white text-xs">Save 17%</Badge>
              </Button>
            </div>

            {/* Currency Toggle */}
            <div className="flex items-center space-x-3 bg-card border rounded-full p-3">
              <Label htmlFor="currency-toggle" className="text-sm font-medium">Currency:</Label>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${currency === 'USD' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>USD</span>
                <Switch
                  id="currency-toggle"
                  checked={currency === 'LKR'}
                  onCheckedChange={(checked) => setCurrency(checked ? 'LKR' : 'USD')}
                />
                <span className={`text-sm ${currency === 'LKR' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>LKR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${categoryInfo.color} text-white text-2xl mb-4`}>
            {categoryInfo.icon}
          </div>
          <h2 className="text-3xl font-bold mb-2">{categoryInfo.title}</h2>
          <p className="text-lg text-muted-foreground mb-6">{categoryInfo.description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {categoryInfo.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 bg-card border rounded-full px-4 py-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {filteredPlans.map((plan) => {
            const quantity = getItemQuantity(plan.id)
            const isInCart = quantity > 0
            const originalPrice = getOriginalPrice(plan.price_usd, plan.price_lkr)

            return (
              <Card 
                key={plan.id} 
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  plan.is_popular 
                    ? 'ring-2 ring-primary shadow-xl border-primary/20' 
                    : 'hover:shadow-lg'
                } ${isInCart ? 'ring-2 ring-green-500' : ''}`}
              >
                {/* Popular Badge */}
                {plan.is_popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full shadow-lg">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Cart Badge */}
                {isInCart && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 text-white">
                      In Cart: {quantity}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold mb-2">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-3xl font-bold text-primary">
                        {formatPrice(plan.price_usd, plan.price_lkr)}
                      </span>
                      {originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          {originalPrice}
                        </span>
                      )}
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm text-green-600 font-medium">
                        Save 2 months with yearly billing
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Specifications */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Cpu className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">CPU</span>
                      </div>
                      <span className="text-sm font-bold">{plan.vcpu} vCPU</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <MemoryStick className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">RAM</span>
                      </div>
                      <span className="text-sm font-bold">{plan.ram}GB</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <HardDrive className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Storage</span>
                      </div>
                      <span className="text-sm font-bold">{plan.storage}GB {plan.storage_type}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Features */}
                  <div className="space-y-2">
                    {[
                      { icon: Shield, text: '99.9% Uptime SLA' },
                      { icon: Zap, text: 'Instant Activation' },
                      { icon: Users, text: '24/7 Expert Support' },
                      { icon: Clock, text: '30-Day Money Back' }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <feature.icon className="h-4 w-4 text-green-500" />
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    onClick={() => handleAddToCart(plan)}
                    className={`w-full bg-gradient-to-r ${getCategoryInfo(plan.category).color} hover:opacity-90 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg`}
                  >
                    {isInCart ? 'Added to Cart' : 'Get Started'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Features Section */}
        <div className="bg-card border rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Why Choose Our Hosting?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-blue-500" />,
                title: 'Enterprise Security',
                description: 'Advanced DDoS protection, SSL certificates, and regular security updates'
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-500" />,
                title: 'Lightning Fast',
                description: 'NVMe SSD storage, CDN integration, and optimized server configurations'
              },
              {
                icon: <Users className="h-8 w-8 text-green-500" />,
                title: '24/7 Expert Support',
                description: 'Round-the-clock technical support from experienced hosting professionals'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="flex justify-center">{feature.icon}</div>
                <h4 className="text-lg font-semibold">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              You have {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
            </p>
            <div className="text-3xl font-bold text-primary mb-6">
              Total: {currency === 'USD' ? '$' : 'Rs.'}{getTotalPrice(currency).toFixed(2)}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cart">
                <Button variant="outline" size="lg" className="px-8">
                  View Cart
                </Button>
              </Link>
              <Link href="/checkout">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary px-8">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}