'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Moon, 
  Sun, 
  Skull, 
  ShoppingCart, 
  Menu, 
  X,
  Anchor
} from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { items, getTotalItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const themes = [
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'dark', label: 'Dark', icon: Moon },
    { key: 'pirate', label: 'Pirate', icon: Skull }
  ]

  return (
    <nav className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-background/70 backdrop-blur-xl border border-border/30 shadow-2xl shadow-primary/10' 
        : 'bg-background/40 backdrop-blur-md border border-border/20'
    } rounded-2xl`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 font-bold text-xl group">
            <div className="relative">
              <Anchor className="h-8 w-8 text-primary transition-transform group-hover:rotate-12 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Steal Or Die Cloud™
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/plans', label: 'Plans' },
              { href: '/blog', label: 'Blog' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' }
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant="ghost" 
                  className="relative rounded-xl hover:bg-primary/10 hover:scale-105 transition-all duration-300 group"
                >
                  {item.label}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Switcher */}
            <div className="flex items-center space-x-1 bg-secondary/20 backdrop-blur-sm rounded-full p-1 border border-border/30">
              {themes.map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={theme === key ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTheme(key as 'light' | 'dark' | 'pirate')}
                  className={`rounded-full h-8 w-8 p-0 transition-all duration-300 ${
                    theme === key 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110' 
                      : 'hover:bg-primary/10 hover:scale-105'
                  }`}
                  title={label}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            {/* Cart */}
            <Link href="/cart">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative rounded-xl hover:bg-primary/10 hover:scale-105 transition-all duration-300 group"
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-primary to-secondary animate-pulse">
                    {getTotalItems()}
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden rounded-xl hover:bg-primary/10 hover:scale-105 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/30 rounded-b-2xl mt-2 -mx-6">
            <div className="p-6 space-y-4">
              {[
                { href: '/', label: 'Home' },
                { href: '/plans', label: 'Plans' },
                { href: '/blog', label: 'Blog' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' }
              ].map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start rounded-xl hover:bg-primary/10 hover:scale-105 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              <div className="flex items-center justify-between pt-4 border-t border-border/20">
                <div className="flex items-center space-x-2">
                  {themes.map(({ key, label, icon: Icon }) => (
                    <Button
                      key={key}
                      variant={theme === key ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setTheme(key as 'light' | 'dark' | 'pirate')}
                      className={`rounded-full h-8 w-8 p-0 transition-all duration-300 ${
                        theme === key 
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                          : 'hover:bg-primary/10'
                      }`}
                      title={label}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Link href="/cart">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="relative rounded-xl hover:bg-primary/10 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {getTotalItems() > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-primary to-secondary">
                          {getTotalItems()}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}