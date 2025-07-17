import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { CartProvider } from '@/contexts/CartContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CipherBot from '@/components/CipherBot'
import WebBackground from '@/components/WebBackground'

export const metadata: Metadata = {
  title: 'Steal Or Die Cloud™ — Grand Line Edition',
  description: 'Navigate the Grand Line of web hosting with the most notorious crew in the digital seas.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <CartProvider>
            <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative">
              <WebBackground />
              <div className="relative z-10">
                <Navbar />
                <main className="pt-24">
                  {children}
                </main>
                <Footer />
                <CipherBot />
              </div>
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}