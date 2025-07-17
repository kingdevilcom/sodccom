'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send, 
  Clock,
  Globe,
  Anchor,
  Sparkles,
  Star
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
      alert('Message sent successfully! Our crew will get back to you soon.')
    }, 2000)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "crew@stealordiecloud.com",
      detail: "Response within 2 hours",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "+94 77 123 4567",
      detail: "24/7 Support Hotline",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "CipherBot Assistant",
      detail: "Instant responses",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Colombo, Sri Lanka",
      detail: "East Blue Headquarters",
      color: "from-orange-500 to-red-500"
    }
  ]

  const supportHours = [
    { day: "Monday - Friday", hours: "24/7", status: "online" },
    { day: "Saturday", hours: "24/7", status: "online" },
    { day: "Sunday", hours: "24/7", status: "online" }
  ]

  return (
    <div className="relative min-h-screen">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl transition-transform duration-1000 animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute top-1/3 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl transition-transform duration-1000 animate-float-reverse"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        <div 
          className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl transition-transform duration-1000 animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * -0.01}px)`
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Floating Hero Section */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-background/80 backdrop-blur-xl border border-border/30 rounded-full p-8 shadow-2xl shadow-primary/10">
              <Anchor className="h-16 w-16 text-primary mx-auto" />
            </div>
            <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-secondary animate-bounce">
              <Star className="h-3 w-3 mr-1" />
              24/7
            </Badge>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Contact Our Crew
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to set sail? Our legendary crew is here to help you navigate 
            the Grand Line of web hosting.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactMethods.map((method, index) => (
            <Card 
              key={index}
              className="group relative bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 hover:-translate-y-4 transform-3d text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-500`}></div>
              <CardHeader className="relative">
                <div className="relative mb-4">
                  <div className="p-4 bg-background/80 backdrop-blur-sm rounded-2xl inline-block group-hover:scale-125 transition-transform duration-500">
                    <method.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-20 rounded-2xl blur-2xl group-hover:opacity-40 transition-opacity`}></div>
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                  {method.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="font-semibold text-lg mb-2">{method.description}</p>
                <p className="text-sm text-muted-foreground">{method.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="relative bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl shadow-primary/5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
              <CardHeader className="relative">
                <CardTitle className="text-3xl lg:text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center">
                  <MessageCircle className="h-8 w-8 mr-3 text-primary" />
                  Send Us a Message
                </CardTitle>
                <p className="text-muted-foreground text-lg">
                  Tell us about your digital adventure and we'll help you chart the course.
                </p>
              </CardHeader>
              <CardContent className="relative">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-lg font-medium">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your pirate name"
                        className="bg-background/50 backdrop-blur-sm border-border/30 rounded-xl text-lg py-3 focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-lg font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                        className="bg-background/50 backdrop-blur-sm border-border/30 rounded-xl text-lg py-3 focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-lg font-medium">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="What's your quest about?"
                      className="bg-background/50 backdrop-blur-sm border-border/30 rounded-xl text-lg py-3 focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-lg font-medium">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your hosting needs..."
                      rows={6}
                      className="bg-background/50 backdrop-blur-sm border-border/30 rounded-xl text-lg focus:ring-2 focus:ring-primary/50 transition-all duration-300 resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-xl py-6 rounded-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-500 transform-3d"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="h-6 w-6 mr-3 group-hover:translate-x-1 transition-transform" />
                        Send Message
                        <Sparkles className="h-6 w-6 ml-3 group-hover:scale-125 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Support Hours */}
            <Card className="relative bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl shadow-secondary/5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5"></div>
              <CardHeader className="relative">
                <CardTitle className="text-2xl flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-secondary" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-4">
                {supportHours.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-background/50 backdrop-blur-sm rounded-xl border border-border/20">
                    <div>
                      <div className="font-medium">{schedule.day}</div>
                      <div className="text-sm text-muted-foreground">{schedule.hours}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-500">Online</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="relative bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl shadow-accent/5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5"></div>
              <CardHeader className="relative">
                <CardTitle className="text-2xl flex items-center">
                  <Globe className="h-6 w-6 mr-3 text-accent" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-3">
                {[
                  { label: "Knowledge Base", href: "/docs" },
                  { label: "Server Status", href: "/status" },
                  { label: "Billing Portal", href: "/billing" },
                  { label: "Discord Community", href: "/discord" }
                ].map((link, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start rounded-xl hover:bg-primary/10 hover:scale-105 transition-all duration-300 text-lg py-3"
                  >
                    {link.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="relative bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl shadow-red-500/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5"></div>
              <CardHeader className="relative">
                <CardTitle className="text-2xl flex items-center text-red-500">
                  <Phone className="h-6 w-6 mr-3" />
                  Emergency Support
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground mb-4">
                  For critical server issues affecting your business operations.
                </p>
                <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-lg py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Emergency Hotline
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}