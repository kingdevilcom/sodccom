'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'pirate'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {}
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme
    if (stored && ['light', 'dark', 'pirate'].includes(stored)) {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    
    // Remove all theme classes
    document.documentElement.classList.remove('light', 'dark', 'pirate')
    
    // Add current theme class
    document.documentElement.classList.add(theme)
    
    // Update CSS variables based on theme
    const root = document.documentElement
    
    if (theme === 'pirate') {
      root.style.setProperty('--background', '20 14% 4%')
      root.style.setProperty('--foreground', '60 9% 98%')
      root.style.setProperty('--primary', '39 100% 50%')
      root.style.setProperty('--primary-foreground', '20 14% 4%')
      root.style.setProperty('--secondary', '155 100% 30%')
      root.style.setProperty('--secondary-foreground', '60 9% 98%')
      root.style.setProperty('--accent', '0 100% 50%')
      root.style.setProperty('--accent-foreground', '60 9% 98%')
    } else {
      // Reset to default values for light/dark themes
      root.style.removeProperty('--background')
      root.style.removeProperty('--foreground')
      root.style.removeProperty('--primary')
      root.style.removeProperty('--primary-foreground')
      root.style.removeProperty('--secondary')
      root.style.removeProperty('--secondary-foreground')
      root.style.removeProperty('--accent')
      root.style.removeProperty('--accent-foreground')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}