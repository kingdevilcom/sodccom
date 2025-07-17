'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Plan } from '@/lib/database'

interface CartItem {
  plan: Plan
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (plan: Plan) => void
  removeItem: (planId: string) => void
  updateQuantity: (planId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: (currency: 'USD' | 'LKR') => number
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load cart from localStorage on mount
    try {
      const stored = localStorage.getItem('cart')
      if (stored) {
        const parsedItems = JSON.parse(stored)
        setItems(parsedItems)
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever items change (but only after initial load)
    if (isLoaded) {
      try {
        localStorage.setItem('cart', JSON.stringify(items))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [items, isLoaded])

  const addItem = (plan: Plan) => {
    try {
      setItems(prev => {
        const existingItem = prev.find(item => item.plan.id === plan.id)
        if (existingItem) {
          return prev.map(item =>
            item.plan.id === plan.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
        return [...prev, { plan, quantity: 1 }]
      })
    } catch (error) {
      console.error('Error adding item to cart:', error)
      throw error
    }
  }

  const removeItem = (planId: string) => {
    try {
      setItems(prev => prev.filter(item => item.plan.id !== planId))
    } catch (error) {
      console.error('Error removing item from cart:', error)
      throw error
    }
  }

  const updateQuantity = (planId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        removeItem(planId)
        return
      }
      
      setItems(prev => prev.map(item =>
        item.plan.id === planId
          ? { ...item, quantity }
          : item
      ))
    } catch (error) {
      console.error('Error updating cart quantity:', error)
      throw error
    }
  }

  const clearCart = () => {
    try {
      setItems([])
    } catch (error) {
      console.error('Error clearing cart:', error)
      throw error
    }
  }

  const getTotalItems = () => {
    try {
      return items.reduce((total, item) => total + item.quantity, 0)
    } catch (error) {
      console.error('Error calculating total items:', error)
      return 0
    }
  }

  const getTotalPrice = (currency: 'USD' | 'LKR') => {
    try {
      return items.reduce((total, item) => {
        const price = currency === 'USD' ? item.plan.price_usd : item.plan.price_lkr
        return total + (price * item.quantity)
      }, 0)
    } catch (error) {
      console.error('Error calculating total price:', error)
      return 0
    }
  }

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}