'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CheckoutCancelPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear any payment-related session data if needed
    console.log('Payment cancelled by user')
  }, [])

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <XCircle className="h-16 w-16 text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold text-orange-600">
            Payment Cancelled
          </h1>
          <p className="text-xl text-muted-foreground">
            Your payment was cancelled. No charges were made to your account.
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/20">
          <CardHeader>
            <CardTitle>What happened?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <p className="text-muted-foreground">
              Your payment process was interrupted or cancelled. This could happen for several reasons:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>You clicked the back button or closed the payment window</li>
              <li>The payment session timed out</li>
              <li>There was a network connectivity issue</li>
              <li>You chose to cancel the payment</li>
            </ul>
            <p className="text-muted-foreground">
              Don't worry - your cart items are still saved and you can try again anytime.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/cart">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Cart
            </Button>
          </Link>
          <Link href="/checkout">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Payment Again
            </Button>
          </Link>
          <Link href="/plans">
            <Button variant="outline">
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="bg-primary/10 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you're experiencing issues with payment, our crew is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link href="/contact">
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              Live Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}