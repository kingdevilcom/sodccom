'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import AnnouncementBanner from '@/components/AnnouncementBanner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { CreditCard, Shield, Check, AlertCircle, Loader2, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { localDB } from '@/lib/database'

declare global {
  interface Window {
    google: any
  }
}

interface GooglePayPaymentData {
  apiVersion: number
  apiVersionMinor: number
  paymentMethodData: {
    description: string
    tokenizationData: {
      type: string
      token: string
    }
    type: string
    info: {
      cardNetwork: string
      cardDetails: string
    }
  }
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const [googlePayLoaded, setGooglePayLoaded] = useState(false)
  const [googlePayAvailable, setGooglePayAvailable] = useState(false)
  const [scriptError, setScriptError] = useState(false)
  const [paymentsClient, setPaymentsClient] = useState<any>(null)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'US'
  })
  const currency = 'USD' // Google Pay supports USD
  const [agreeTerms, setAgreeTerms] = useState(false)
  const router = useRouter()

  // Google Pay Configuration
  const GOOGLE_PAY_CONFIG = {
    merchant_id: 'BCR2DN7TZD7MBT2N',
    environment: 'TEST', // Change to 'PRODUCTION' for live
    base_url: process.env.NODE_ENV === 'production' 
      ? 'https://stealordie.com' 
      : 'http://localhost:3000'
  }

  useEffect(() => {
    if (items.length === 0) {
      router.push('/plans')
    }
  }, [items, router])

  useEffect(() => {
    loadGooglePayScript()
  }, [])

  const loadGooglePayScript = () => {
    // Check if Google Pay is already loaded
    if (window.google?.payments?.api) {
      initializeGooglePay()
      return
    }

    // Remove any existing Google Pay script
    const existingScript = document.querySelector('script[src*="pay.google.com"]')
    if (existingScript) {
      existingScript.remove()
    }

    const script = document.createElement('script')
    script.src = 'https://pay.google.com/gp/p/js/pay.js'
    script.async = true
    
    script.onload = () => {
      console.log('Google Pay script loaded successfully')
      setGooglePayLoaded(true)
      setScriptError(false)
      setPaymentError('')
      initializeGooglePay()
    }
    
    script.onerror = (error) => {
      console.error('Failed to load Google Pay script:', error)
      setScriptError(true)
      setGooglePayLoaded(false)
      setPaymentError('Payment system failed to load. Please check your internet connection and refresh the page.')
    }
    
    document.head.appendChild(script)
  }

  const initializeGooglePay = async () => {
    try {
      if (!window.google?.payments?.api) {
        throw new Error('Google Pay API not available')
      }

      const paymentsClient = new window.google.payments.api.PaymentsClient({
        environment: GOOGLE_PAY_CONFIG.environment
      })

      setPaymentsClient(paymentsClient)

      // Check if Google Pay is available
      const isReadyToPayRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA']
          }
        }]
      }

      const response = await paymentsClient.isReadyToPay(isReadyToPayRequest)
      setGooglePayAvailable(response.result)
      
      console.log('Google Pay availability:', response.result)
    } catch (error) {
      console.error('Google Pay initialization error:', error)
      setGooglePayAvailable(false)
      setPaymentError('Google Pay is not available on this device.')
    }
  }

  const validateForm = (): string[] => {
    const errors: string[] = []
    
    if (!customerInfo.firstName.trim()) errors.push('First name is required')
    if (!customerInfo.lastName.trim()) errors.push('Last name is required')
    if (!customerInfo.email.trim()) errors.push('Email is required')
    if (!customerInfo.phone.trim()) errors.push('Phone number is required')
    if (!agreeTerms) errors.push('Please agree to the terms and conditions')
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (customerInfo.email && !emailRegex.test(customerInfo.email)) {
      errors.push('Please enter a valid email address')
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{3,14}$/
    if (customerInfo.phone && !phoneRegex.test(customerInfo.phone.replace(/\s/g, ''))) {
      errors.push('Please enter a valid phone number')
    }

    return errors
  }

  const generateOrderId = (): string => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substr(2, 9)
    return `SOD-${timestamp}-${random}`
  }

  const createOrder = async (orderId: string, total: number) => {
    try {
      console.log('Creating order:', { orderId, total, email: customerInfo.email })
      
      const orderData = {
        user_email: customerInfo.email,
        plan_id: items[0].plan.id, // Primary plan
        amount_usd: total,
        amount_lkr: Math.round(total * 316), // Approximate conversion
        currency: 'USD' as const,
        payhere_order_id: orderId, // Reusing field for Google Pay order ID
        payhere_payment_id: null,
        status: 'pending' as const
      }

      const order = await localDB.createOrder(orderData)
      console.log('Order created successfully:', order)
      return order
    } catch (error) {
      console.error('Order creation failed:', error)
      throw new Error('Failed to create order. Please try again.')
    }
  }

  const getGooglePaymentDataRequest = (total: number) => {
    return {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: GOOGLE_PAY_CONFIG.merchant_id
          }
        }
      }],
      merchantInfo: {
        merchantId: GOOGLE_PAY_CONFIG.merchant_id,
        merchantName: 'Steal Or Die Cloud™'
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: total.toFixed(2),
        currencyCode: 'USD',
        countryCode: 'US'
      },
      shippingAddressRequired: false,
      emailRequired: true
    }
  }

  const handleGooglePayment = async () => {
    // Clear previous errors
    setPaymentError('')
    
    // Validate form
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setPaymentError(validationErrors.join('. '))
      return
    }

    // Check if Google Pay is available
    if (!googlePayAvailable || !paymentsClient) {
      setPaymentError('Google Pay is not available. Please try again or use a different payment method.')
      return
    }

    setIsProcessing(true)

    try {
      const total = getTotalPrice(currency)
      const orderId = generateOrderId()

      console.log('Starting Google Pay process:', { orderId, total })

      // Step 1: Create order in database
      console.log('Step 1: Creating order...')
      await createOrder(orderId, total)

      // Step 2: Initialize Google Pay payment
      console.log('Step 2: Initializing Google Pay...')
      const paymentDataRequest = getGooglePaymentDataRequest(total)

      const paymentData: GooglePayPaymentData = await paymentsClient.loadPaymentData(paymentDataRequest)
      
      console.log('Google Pay payment data received:', {
        type: paymentData.paymentMethodData.type,
        network: paymentData.paymentMethodData.info.cardNetwork,
        details: paymentData.paymentMethodData.info.cardDetails
      })

      // Step 3: Process payment (simulate success for demo)
      console.log('Step 3: Processing payment...')
      
      // In a real implementation, you would send the payment token to your backend
      // For demo purposes, we'll simulate a successful payment
      setTimeout(() => {
        setPaymentSuccess(true)
        setIsProcessing(false)
        clearCart()
        
        // Update order status to completed
        localDB.updateOrder(orderId, { status: 'completed' })
        
        setTimeout(() => {
          router.push(`/checkout/success?order_id=${orderId}`)
        }, 2000)
      }, 2000)

    } catch (error) {
      console.error('Google Pay payment failed:', error)
      setIsProcessing(false)
      
      if (error instanceof Error) {
        if (error.message.includes('CANCELED')) {
          setPaymentError('Payment was cancelled by user.')
        } else {
          setPaymentError(error.message || 'Payment processing failed. Please try again.')
        }
      } else {
        setPaymentError('An unexpected error occurred. Please try again.')
      }
    }
  }

  const retryGooglePayLoad = () => {
    setScriptError(false)
    setPaymentError('')
    loadGooglePayScript()
  }

  const total = getTotalPrice(currency)

  if (paymentSuccess) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <div className="text-6xl">🎉</div>
          <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Your order has been placed successfully. You'll receive an email confirmation shortly.
          </p>
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          </div>
          <p className="text-sm">Redirecting to confirmation page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Announcements */}
      <div className="mb-8">
        <AnnouncementBanner page="checkout" />
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Secure Your Digital Treasure
        </h1>
        <p className="text-muted-foreground">
          Complete your order and set sail on your hosting adventure
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-background/90 backdrop-blur-xl border border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    className="bg-background/80 border-border/70 focus:border-primary/70 focus:ring-primary/30"
                    value={customerInfo.firstName}
                    onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    className="bg-background/80 border-border/70 focus:border-primary/70 focus:ring-primary/30"
                    value={customerInfo.lastName}
                    onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-background/80 border-border/70 focus:border-primary/70 focus:ring-primary/30"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  className="bg-background/80 border-border/70 focus:border-primary/70 focus:ring-primary/30"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  placeholder="+1 234 567 8900"
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  className="bg-background/80 border-border/70 focus:border-primary/70 focus:ring-primary/30"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    className="bg-background/80 border-border/70 focus:border-primary/70 focus:ring-primary/30"
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select value={customerInfo.country} onValueChange={(value) => setCustomerInfo({...customerInfo, country: value})}>
                    <SelectTrigger className="bg-background/80 border-border/70">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AF">Afghanistan</SelectItem>
                      <SelectItem value="AL">Albania</SelectItem>
                      <SelectItem value="DZ">Algeria</SelectItem>
                      <SelectItem value="AS">American Samoa</SelectItem>
                      <SelectItem value="AD">Andorra</SelectItem>
                      <SelectItem value="AO">Angola</SelectItem>
                      <SelectItem value="AI">Anguilla</SelectItem>
                      <SelectItem value="AQ">Antarctica</SelectItem>
                      <SelectItem value="AG">Antigua and Barbuda</SelectItem>
                      <SelectItem value="AR">Argentina</SelectItem>
                      <SelectItem value="AM">Armenia</SelectItem>
                      <SelectItem value="AW">Aruba</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="AT">Austria</SelectItem>
                      <SelectItem value="AZ">Azerbaijan</SelectItem>
                      <SelectItem value="BS">Bahamas</SelectItem>
                      <SelectItem value="BH">Bahrain</SelectItem>
                      <SelectItem value="BD">Bangladesh</SelectItem>
                      <SelectItem value="BB">Barbados</SelectItem>
                      <SelectItem value="BY">Belarus</SelectItem>
                      <SelectItem value="BE">Belgium</SelectItem>
                      <SelectItem value="BZ">Belize</SelectItem>
                      <SelectItem value="BJ">Benin</SelectItem>
                      <SelectItem value="BM">Bermuda</SelectItem>
                      <SelectItem value="BT">Bhutan</SelectItem>
                      <SelectItem value="BO">Bolivia</SelectItem>
                      <SelectItem value="BA">Bosnia and Herzegovina</SelectItem>
                      <SelectItem value="BW">Botswana</SelectItem>
                      <SelectItem value="BV">Bouvet Island</SelectItem>
                      <SelectItem value="BR">Brazil</SelectItem>
                      <SelectItem value="IO">British Indian Ocean Territory</SelectItem>
                      <SelectItem value="BN">Brunei Darussalam</SelectItem>
                      <SelectItem value="BG">Bulgaria</SelectItem>
                      <SelectItem value="BF">Burkina Faso</SelectItem>
                      <SelectItem value="BI">Burundi</SelectItem>
                      <SelectItem value="KH">Cambodia</SelectItem>
                      <SelectItem value="CM">Cameroon</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="CV">Cape Verde</SelectItem>
                      <SelectItem value="KY">Cayman Islands</SelectItem>
                      <SelectItem value="CF">Central African Republic</SelectItem>
                      <SelectItem value="TD">Chad</SelectItem>
                      <SelectItem value="CL">Chile</SelectItem>
                      <SelectItem value="CN">China</SelectItem>
                      <SelectItem value="CX">Christmas Island</SelectItem>
                      <SelectItem value="CC">Cocos (Keeling) Islands</SelectItem>
                      <SelectItem value="CO">Colombia</SelectItem>
                      <SelectItem value="KM">Comoros</SelectItem>
                      <SelectItem value="CG">Congo</SelectItem>
                      <SelectItem value="CD">Congo, Democratic Republic</SelectItem>
                      <SelectItem value="CK">Cook Islands</SelectItem>
                      <SelectItem value="CR">Costa Rica</SelectItem>
                      <SelectItem value="CI">Cote D'Ivoire</SelectItem>
                      <SelectItem value="HR">Croatia</SelectItem>
                      <SelectItem value="CU">Cuba</SelectItem>
                      <SelectItem value="CY">Cyprus</SelectItem>
                      <SelectItem value="CZ">Czech Republic</SelectItem>
                      <SelectItem value="DK">Denmark</SelectItem>
                      <SelectItem value="DJ">Djibouti</SelectItem>
                      <SelectItem value="DM">Dominica</SelectItem>
                      <SelectItem value="DO">Dominican Republic</SelectItem>
                      <SelectItem value="EC">Ecuador</SelectItem>
                      <SelectItem value="EG">Egypt</SelectItem>
                      <SelectItem value="SV">El Salvador</SelectItem>
                      <SelectItem value="GQ">Equatorial Guinea</SelectItem>
                      <SelectItem value="ER">Eritrea</SelectItem>
                      <SelectItem value="EE">Estonia</SelectItem>
                      <SelectItem value="ET">Ethiopia</SelectItem>
                      <SelectItem value="FK">Falkland Islands</SelectItem>
                      <SelectItem value="FO">Faroe Islands</SelectItem>
                      <SelectItem value="FJ">Fiji</SelectItem>
                      <SelectItem value="FI">Finland</SelectItem>
                      <SelectItem value="FR">France</SelectItem>
                      <SelectItem value="GF">French Guiana</SelectItem>
                      <SelectItem value="PF">French Polynesia</SelectItem>
                      <SelectItem value="TF">French Southern Territories</SelectItem>
                      <SelectItem value="GA">Gabon</SelectItem>
                      <SelectItem value="GM">Gambia</SelectItem>
                      <SelectItem value="GE">Georgia</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="GH">Ghana</SelectItem>
                      <SelectItem value="GI">Gibraltar</SelectItem>
                      <SelectItem value="GR">Greece</SelectItem>
                      <SelectItem value="GL">Greenland</SelectItem>
                      <SelectItem value="GD">Grenada</SelectItem>
                      <SelectItem value="GP">Guadeloupe</SelectItem>
                      <SelectItem value="GU">Guam</SelectItem>
                      <SelectItem value="GT">Guatemala</SelectItem>
                      <SelectItem value="GG">Guernsey</SelectItem>
                      <SelectItem value="GN">Guinea</SelectItem>
                      <SelectItem value="GW">Guinea-Bissau</SelectItem>
                      <SelectItem value="GY">Guyana</SelectItem>
                      <SelectItem value="HT">Haiti</SelectItem>
                      <SelectItem value="HM">Heard Island & Mcdonald Islands</SelectItem>
                      <SelectItem value="VA">Holy See (Vatican City State)</SelectItem>
                      <SelectItem value="HN">Honduras</SelectItem>
                      <SelectItem value="HK">Hong Kong</SelectItem>
                      <SelectItem value="HU">Hungary</SelectItem>
                      <SelectItem value="IS">Iceland</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="ID">Indonesia</SelectItem>
                      <SelectItem value="IR">Iran, Islamic Republic Of</SelectItem>
                      <SelectItem value="IQ">Iraq</SelectItem>
                      <SelectItem value="IE">Ireland</SelectItem>
                      <SelectItem value="IM">Isle Of Man</SelectItem>
                      <SelectItem value="IL">Israel</SelectItem>
                      <SelectItem value="IT">Italy</SelectItem>
                      <SelectItem value="JM">Jamaica</SelectItem>
                      <SelectItem value="JP">Japan</SelectItem>
                      <SelectItem value="JE">Jersey</SelectItem>
                      <SelectItem value="JO">Jordan</SelectItem>
                      <SelectItem value="KZ">Kazakhstan</SelectItem>
                      <SelectItem value="KE">Kenya</SelectItem>
                      <SelectItem value="KI">Kiribati</SelectItem>
                      <SelectItem value="KR">Korea</SelectItem>
                      <SelectItem value="KW">Kuwait</SelectItem>
                      <SelectItem value="KG">Kyrgyzstan</SelectItem>
                      <SelectItem value="LA">Lao People's Democratic Republic</SelectItem>
                      <SelectItem value="LV">Latvia</SelectItem>
                      <SelectItem value="LB">Lebanon</SelectItem>
                      <SelectItem value="LS">Lesotho</SelectItem>
                      <SelectItem value="LR">Liberia</SelectItem>
                      <SelectItem value="LY">Libyan Arab Jamahiriya</SelectItem>
                      <SelectItem value="LI">Liechtenstein</SelectItem>
                      <SelectItem value="LT">Lithuania</SelectItem>
                      <SelectItem value="LU">Luxembourg</SelectItem>
                      <SelectItem value="MO">Macao</SelectItem>
                      <SelectItem value="MK">Macedonia</SelectItem>
                      <SelectItem value="MG">Madagascar</SelectItem>
                      <SelectItem value="MW">Malawi</SelectItem>
                      <SelectItem value="MY">Malaysia</SelectItem>
                      <SelectItem value="MV">Maldives</SelectItem>
                      <SelectItem value="ML">Mali</SelectItem>
                      <SelectItem value="MT">Malta</SelectItem>
                      <SelectItem value="MH">Marshall Islands</SelectItem>
                      <SelectItem value="MQ">Martinique</SelectItem>
                      <SelectItem value="MR">Mauritania</SelectItem>
                      <SelectItem value="MU">Mauritius</SelectItem>
                      <SelectItem value="YT">Mayotte</SelectItem>
                      <SelectItem value="MX">Mexico</SelectItem>
                      <SelectItem value="FM">Micronesia, Federated States Of</SelectItem>
                      <SelectItem value="MD">Moldova</SelectItem>
                      <SelectItem value="MC">Monaco</SelectItem>
                      <SelectItem value="MN">Mongolia</SelectItem>
                      <SelectItem value="ME">Montenegro</SelectItem>
                      <SelectItem value="MS">Montserrat</SelectItem>
                      <SelectItem value="MA">Morocco</SelectItem>
                      <SelectItem value="MZ">Mozambique</SelectItem>
                      <SelectItem value="MM">Myanmar</SelectItem>
                      <SelectItem value="NA">Namibia</SelectItem>
                      <SelectItem value="NR">Nauru</SelectItem>
                      <SelectItem value="NP">Nepal</SelectItem>
                      <SelectItem value="NL">Netherlands</SelectItem>
                      <SelectItem value="AN">Netherlands Antilles</SelectItem>
                      <SelectItem value="NC">New Caledonia</SelectItem>
                      <SelectItem value="NZ">New Zealand</SelectItem>
                      <SelectItem value="NI">Nicaragua</SelectItem>
                      <SelectItem value="NE">Niger</SelectItem>
                      <SelectItem value="NG">Nigeria</SelectItem>
                      <SelectItem value="NU">Niue</SelectItem>
                      <SelectItem value="NF">Norfolk Island</SelectItem>
                      <SelectItem value="MP">Northern Mariana Islands</SelectItem>
                      <SelectItem value="NO">Norway</SelectItem>
                      <SelectItem value="OM">Oman</SelectItem>
                      <SelectItem value="PK">Pakistan</SelectItem>
                      <SelectItem value="PW">Palau</SelectItem>
                      <SelectItem value="PS">Palestinian Territory, Occupied</SelectItem>
                      <SelectItem value="PA">Panama</SelectItem>
                      <SelectItem value="PG">Papua New Guinea</SelectItem>
                      <SelectItem value="PY">Paraguay</SelectItem>
                      <SelectItem value="PE">Peru</SelectItem>
                      <SelectItem value="PH">Philippines</SelectItem>
                      <SelectItem value="PN">Pitcairn</SelectItem>
                      <SelectItem value="PL">Poland</SelectItem>
                      <SelectItem value="PT">Portugal</SelectItem>
                      <SelectItem value="PR">Puerto Rico</SelectItem>
                      <SelectItem value="QA">Qatar</SelectItem>
                      <SelectItem value="RE">Reunion</SelectItem>
                      <SelectItem value="RO">Romania</SelectItem>
                      <SelectItem value="RU">Russian Federation</SelectItem>
                      <SelectItem value="RW">Rwanda</SelectItem>
                      <SelectItem value="BL">Saint Barthelemy</SelectItem>
                      <SelectItem value="SH">Saint Helena</SelectItem>
                      <SelectItem value="KN">Saint Kitts And Nevis</SelectItem>
                      <SelectItem value="LC">Saint Lucia</SelectItem>
                      <SelectItem value="MF">Saint Martin</SelectItem>
                      <SelectItem value="PM">Saint Pierre And Miquelon</SelectItem>
                      <SelectItem value="VC">Saint Vincent And Grenadines</SelectItem>
                      <SelectItem value="WS">Samoa</SelectItem>
                      <SelectItem value="SM">San Marino</SelectItem>
                      <SelectItem value="ST">Sao Tome And Principe</SelectItem>
                      <SelectItem value="SA">Saudi Arabia</SelectItem>
                      <SelectItem value="SN">Senegal</SelectItem>
                      <SelectItem value="RS">Serbia</SelectItem>
                      <SelectItem value="SC">Seychelles</SelectItem>
                      <SelectItem value="SL">Sierra Leone</SelectItem>
                      <SelectItem value="SG">Singapore</SelectItem>
                      <SelectItem value="SK">Slovakia</SelectItem>
                      <SelectItem value="SI">Slovenia</SelectItem>
                      <SelectItem value="SB">Solomon Islands</SelectItem>
                      <SelectItem value="SO">Somalia</SelectItem>
                      <SelectItem value="ZA">South Africa</SelectItem>
                      <SelectItem value="GS">South Georgia And Sandwich Isl.</SelectItem>
                      <SelectItem value="ES">Spain</SelectItem>
                      <SelectItem value="LK">Sri Lanka</SelectItem>
                      <SelectItem value="SD">Sudan</SelectItem>
                      <SelectItem value="SR">Suriname</SelectItem>
                      <SelectItem value="SJ">Svalbard And Jan Mayen</SelectItem>
                      <SelectItem value="SZ">Swaziland</SelectItem>
                      <SelectItem value="SE">Sweden</SelectItem>
                      <SelectItem value="CH">Switzerland</SelectItem>
                      <SelectItem value="SY">Syrian Arab Republic</SelectItem>
                      <SelectItem value="TW">Taiwan</SelectItem>
                      <SelectItem value="TJ">Tajikistan</SelectItem>
                      <SelectItem value="TZ">Tanzania</SelectItem>
                      <SelectItem value="TH">Thailand</SelectItem>
                      <SelectItem value="TL">Timor-Leste</SelectItem>
                      <SelectItem value="TG">Togo</SelectItem>
                      <SelectItem value="TK">Tokelau</SelectItem>
                      <SelectItem value="TO">Tonga</SelectItem>
                      <SelectItem value="TT">Trinidad And Tobago</SelectItem>
                      <SelectItem value="TN">Tunisia</SelectItem>
                      <SelectItem value="TR">Turkey</SelectItem>
                      <SelectItem value="TM">Turkmenistan</SelectItem>
                      <SelectItem value="TC">Turks And Caicos Islands</SelectItem>
                      <SelectItem value="TV">Tuvalu</SelectItem>
                      <SelectItem value="UG">Uganda</SelectItem>
                      <SelectItem value="UA">Ukraine</SelectItem>
                      <SelectItem value="AE">United Arab Emirates</SelectItem>
                      <SelectItem value="GB">United Kingdom</SelectItem>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="UM">United States Outlying Islands</SelectItem>
                      <SelectItem value="UY">Uruguay</SelectItem>
                      <SelectItem value="UZ">Uzbekistan</SelectItem>
                      <SelectItem value="VU">Vanuatu</SelectItem>
                      <SelectItem value="VE">Venezuela</SelectItem>
                      <SelectItem value="VN">Viet Nam</SelectItem>
                      <SelectItem value="VG">Virgin Islands, British</SelectItem>
                      <SelectItem value="VI">Virgin Islands, U.S.</SelectItem>
                      <SelectItem value="WF">Wallis And Futuna</SelectItem>
                      <SelectItem value="EH">Western Sahara</SelectItem>
                      <SelectItem value="YE">Yemen</SelectItem>
                      <SelectItem value="ZM">Zambia</SelectItem>
                      <SelectItem value="ZW">Zimbabwe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card className="bg-background/90 backdrop-blur-xl border border-border/50 shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{' '}
                  <a href="/legal/terms" className="text-primary hover:underline">
                    Terms of Sail
                  </a>
                  {' '}and{' '}
                  <a href="/legal/privacy" className="text-primary hover:underline">
                    Privacy Scroll
                  </a>
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="bg-background/90 backdrop-blur-xl border border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Google Pay Status */}
              <div className={`p-4 rounded-lg border ${
                googlePayAvailable 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : scriptError
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : 'bg-yellow-50 border-yellow-200 text-yellow-800'
              }`}>
                <div className="flex items-center space-x-2">
                  {googlePayAvailable ? (
                    <Check className="h-4 w-4" />
                  ) : scriptError ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  <span className="text-sm font-medium">
                    {googlePayAvailable 
                      ? 'Google Pay ready' 
                      : scriptError
                      ? 'Payment system failed to load'
                      : 'Loading Google Pay...'
                    }
                  </span>
                </div>
                {scriptError && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={retryGooglePayLoad}
                    className="mt-2 text-xs"
                  >
                    Retry Loading
                  </Button>
                )}
              </div>

              {/* Currency Notice */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-primary font-medium">
                      <strong>Payment Currency:</strong> All payments are processed in US Dollars (USD) through Google Pay.
                    </p>
                    <p className="text-xs text-primary/80 mt-1">
                      Google Pay provides secure, fast payments with bank-level security.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Items */}
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.plan.id} className="flex justify-between text-sm p-3 bg-background/80 rounded-lg border border-border/30">
                    <span className="font-medium">{item.plan.name} × {item.quantity}</span>
                    <span className="font-semibold text-primary">
                      ${(item.plan.price_usd * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-xl p-3 bg-primary/5 rounded-lg">
                <span>Total</span>
                <span className="text-primary">
                  ${total.toFixed(2)} USD
                </span>
              </div>

              {paymentError && (
                <div className="flex items-start space-x-2 text-red-600 text-sm p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{paymentError}</span>
                </div>
              )}

              <Button
                onClick={handleGooglePayment}
                disabled={isProcessing || !agreeTerms || !googlePayAvailable || scriptError}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : !googlePayLoaded ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading Payment System...
                  </>
                ) : scriptError ? (
                  <>
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Payment System Error
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay with Google Pay
                  </>
                )}
              </Button>

              <div className="text-xs text-muted-foreground text-center p-2 bg-background/50 rounded-lg">
                <div className="flex items-center justify-center space-x-1">
                  <Shield className="h-3 w-3" />
                  <span>Secured by Google Pay • SSL Encrypted • Bank Level Security</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}