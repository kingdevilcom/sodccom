'use client'

import { useState } from 'react'
import { Plan } from '@/lib/database'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Cpu, HardDrive, MemoryStick, Zap, TrendingUp, Sparkles, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PlanCardProps {
  plan: Plan
  currency: 'USD' | 'LKR'
  onAddToCart?: () => void
  cartQuantity?: number
}

export default function PlanCard({ plan, currency, onAddToCart, cartQuantity = 0 }: PlanCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = async () => {
    if (!onAddToCart) return
    
    setIsAdding(true)
    onAddToCart()
    
    // Add some animation delay
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  const price = currency === 'USD' ? plan.price_usd : plan.price_lkr
  const currencySymbol = currency === 'USD' ? '$' : 'Rs.'

  const getCategoryIcon = () => {
    switch (plan.category) {
      case 'minecraft':
        return '🎮'
      case 'vps':
        return '⚔️'
      case 'vlss':
        return '🔐'
      case 'v2ray':
        return '👻'
      default:
        return '🏴‍☠️'
    }
  }

  const getCategoryColor = () => {
    switch (plan.category) {
      case 'minecraft':
        return 'from-yellow-500 to-orange-500'
      case 'vps':
        return 'from-blue-500 to-cyan-500'
      case 'vlss':
        return 'from-purple-500 to-pink-500'
      case 'v2ray':
        return 'from-red-500 to-rose-500'
      default:
        return 'from-gray-500 to-slate-500'
    }
  }

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-500 transform-3d",
        "bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl",
        "hover:shadow-primary/20 hover:scale-105 hover:-translate-y-4",
        plan.is_popular && "ring-2 ring-primary/50 shadow-primary/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Background Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500",
        getCategoryColor()
      )}></div>

      {/* Popular Badge */}
      {plan.is_popular && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30 animate-pulse">
            <Star className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}

      {/* Cart Quantity Badge */}
      {cartQuantity > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg animate-pulse">
            In Cart: {cartQuantity}
          </Badge>
        </div>
      )}

      {/* Floating Icon */}
      <div className="absolute top-16 left-4 z-10">
        <div className="relative">
          <div className={cn(
            "text-3xl transition-transform duration-500",
            isHovered && "scale-125 rotate-12"
          )}>
            {getCategoryIcon()}
          </div>
          <div className={cn(
            "absolute inset-0 bg-gradient-to-r opacity-20 rounded-full blur-xl transition-opacity duration-500",
            getCategoryColor(),
            isHovered && "opacity-40"
          )}></div>
        </div>
      </div>

      <CardHeader className="pb-4 pt-20 relative">
        <div className="space-y-4">
          <div className="text-center">
            <CardTitle className="text-xl lg:text-2xl mb-2 group-hover:text-primary transition-colors duration-300">
              {plan.name}
            </CardTitle>
            <div className="relative">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {currencySymbol}{price.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground font-medium">per month</div>
              {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative">
        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Cpu, label: `${plan.vcpu} vCPU`, color: "text-blue-500" },
            { icon: MemoryStick, label: `${plan.ram}GB RAM`, color: "text-green-500" },
            { icon: HardDrive, label: `${plan.storage}GB ${plan.storage_type}`, color: "text-purple-500" },
            { icon: Zap, label: "High Performance", color: "text-orange-500" }
          ].map((spec, index) => (
            <div 
              key={index}
              className="group/spec flex items-center space-x-2 p-3 bg-background/50 backdrop-blur-sm rounded-xl border border-border/20 hover:border-primary/30 transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <spec.icon className={`h-4 w-4 ${spec.color} group-hover/spec:scale-125 transition-transform duration-300`} />
                <div className={`absolute inset-0 ${spec.color.replace('text-', 'bg-')}/20 rounded-full blur-lg opacity-0 group-hover/spec:opacity-100 transition-opacity`}></div>
              </div>
              <span className="text-sm font-medium">{spec.label}</span>
            </div>
          ))}
        </div>

        <Separator className="opacity-30" />

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={cn(
            "w-full bg-gradient-to-r text-lg py-6 rounded-xl shadow-lg transition-all duration-500 transform-3d",
            getCategoryColor(),
            "hover:opacity-90 hover:shadow-xl hover:scale-105",
            isAdding && "animate-pulse"
          )}
        >
          {isAdding ? (
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-3 animate-spin" />
              Adding to Cart...
              <Sparkles className="h-5 w-5 ml-3 animate-pulse" />
            </div>
          ) : (
            <div className="flex items-center">
              🏴‍☠️ Add to Cart
              <Sparkles className="h-5 w-5 ml-3 group-hover:scale-125 transition-transform" />
            </div>
          )}
        </Button>

        {/* Floating Features */}
        <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="text-xs text-muted-foreground text-center space-y-1">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>99.9% Uptime Guarantee</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>24/7 Expert Support</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Instant Setup</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Floating Glow Effect */}
      {isHovered && (
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r opacity-20 rounded-lg blur-2xl animate-pulse pointer-events-none",
          getCategoryColor()
        )}></div>
      )}
    </Card>
  )
}