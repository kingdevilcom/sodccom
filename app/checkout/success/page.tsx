'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Download, Mail, Home } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  useEffect(() => {
    if (orderId) {
      // In a real app, fetch order details from API
      setOrderDetails({
        id: orderId,
        amount: '2,500.00',
        currency: 'LKR',
        status: 'completed',
        items: ['Shadow Block - Minecraft Hosting']
      })
    }
  }, [orderId])

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-green-600">
            Payment Successful!
          </h1>
          <p className="text-xl text-muted-foreground">
            Welcome aboard, captain! Your digital treasure is secured.
          </p>
        </div>

        {orderDetails && (
          <Card className="bg-card/50 backdrop-blur-sm border-border/20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span className="font-mono text-sm">{orderDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-bold">
                  {orderDetails.currency} {orderDetails.amount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600 font-semibold">
                  {orderDetails.status.toUpperCase()}
                </span>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Items:</h3>
                <ul className="space-y-1">
                  {orderDetails.items.map((item: string, index: number) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border/20">
              <CardContent className="p-4 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Email Sent</h3>
                <p className="text-sm text-muted-foreground">
                  Check your inbox for setup instructions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/20">
              <CardContent className="p-4 text-center">
                <Download className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Setup Guide</h3>
                <p className="text-sm text-muted-foreground">
                  Download your server configuration
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/20">
              <CardContent className="p-4 text-center">
                <Home className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Control Panel</h3>
                <p className="text-sm text-muted-foreground">
                  Access your server dashboard
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline">
              Access Control Panel
            </Button>
            <Link href="/">
              <Button variant="outline">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">What's Next?</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Your server will be provisioned within 10 minutes</li>
            <li>• You'll receive an email with login credentials</li>
            <li>• Our CipherBot is here if you need help</li>
            <li>• Join our Discord community for support</li>
          </ul>
        </div>
      </div>
    </div>
  )
}