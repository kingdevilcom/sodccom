'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Globe from '@/components/Globe'
import AnnouncementBanner from '@/components/AnnouncementBanner'
import { 
  Anchor, 
  Server, 
  Shield, 
  Zap, 
  Globe as GlobeIcon,
  Users,
  Trophy,
  ArrowRight,
  Sparkles,
  Rocket
} from 'lucide-react'

export default function Home() {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const fullText = "Navigate the Grand Line of web hosting with the most notorious crew in the digital seas."

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const stats = [
    { label: 'Active Servers', value: '2,847', icon: Server, color: 'from-blue-500 to-cyan-500' },
    { label: 'Happy Pirates', value: '15,329', icon: Users, color: 'from-green-500 to-emerald-500' },
    { label: 'Uptime', value: '99.98%', icon: Shield, color: 'from-purple-500 to-violet-500' },
    { label: 'Countries', value: '47', icon: GlobeIcon, color: 'from-orange-500 to-red-500' }
  ]

  const services = [
    {
      title: "Grand Line Ship Tier",
      description: "Minecraft hosting with legendary ship-class performance",
      icon: "⚓",
      color: "from-yellow-500 to-orange-500",
      link: "/plans#minecraft"
    },
    {
      title: "Nakama Core VPS",
      description: "Crew-powered VPS hosting with Straw Hat reliability",
      icon: "🗡️",
      color: "from-blue-500 to-cyan-500",
      link: "/plans#vps"
    },
    {
      title: "Marine Cipher Nodes",
      description: "VLSS hosting with government-grade security protocols",
      icon: "🕵️‍♀️",
      color: "from-purple-500 to-pink-500",
      link: "/plans#vlss"
    },
    {
      title: "Devil Signal Fruits",
      description: "V2Ray data conversion with mystical transmission powers",
      icon: "📡",
      color: "from-red-500 to-rose-500",
      link: "/plans#v2ray"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl transition-transform duration-1000 animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute top-1/4 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl transition-transform duration-1000 animate-float-reverse"
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

      {/* Announcements */}
      <div className="container mx-auto px-4 pt-8">
        <AnnouncementBanner page="homepage" />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-10">
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                  <Shield className="h-3 w-3" />
                  <span className="font-medium">Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
                  <Zap className="h-3 w-3" />
                  <span className="font-medium">Instant Setup</span>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="relative inline-block">
                  <Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-xl border border-primary/30 text-primary px-6 py-2 rounded-full text-lg shadow-2xl shadow-primary/20 animate-glow">
                    <Sparkles className="h-5 w-5 mr-2" />
                    🏴‍☠️ Professional Hosting
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
                  Enterprise Cloud Hosting
                </h1>
                
                <div className="relative">
                  <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                    {currentText}
                    <span className="animate-pulse text-primary">|</span>
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-xl"></div>
                </div>
              </div>

              {/* Customer Logos */}
              <div className="pt-8">
                <p className="text-sm text-muted-foreground mb-4">Trusted by developers worldwide</p>
                <div className="flex items-center space-x-8 opacity-60">
                  <div className="text-2xl font-bold">🚀</div>
                  <div className="text-2xl font-bold">⚡</div>
                  <div className="text-2xl font-bold">🛡️</div>
                  <div className="text-2xl font-bold">🌐</div>
                  <div className="text-2xl font-bold">💎</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/plans">
                  <Button 
                    size="lg" 
                    className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-xl px-10 py-6 rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-500 transform-3d"
                  >
                    <Anchor className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    Get Started
                    <Rocket className="h-6 w-6 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="group text-xl px-10 py-6 rounded-2xl bg-background/60 backdrop-blur-xl border-border/30 shadow-2xl shadow-primary/10 hover:shadow-primary/20 hover:scale-105 transition-all duration-500 transform-3d"
                  >
                    Learn More
                    <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>

              {/* Floating Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="group relative bg-background/60 backdrop-blur-xl border border-border/30 rounded-2xl p-6 text-center shadow-2xl hover:shadow-primary/20 hover:scale-110 hover:-translate-y-2 transition-all duration-500 transform-3d"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                    <div className="relative">
                      <div className="relative mb-4">
                        <stat.icon className="h-8 w-8 text-primary mx-auto group-hover:scale-125 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-pulse"></div>
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative perspective">
              <div className="relative transform-3d hover:scale-105 transition-transform duration-1000">
                <Globe />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20 pointer-events-none rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 rounded-full blur-2xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Services Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="relative inline-block mb-8">
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Choose Your Digital Crew
              </h2>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl animate-pulse"></div>
            </div>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Each service is crafted with the spirit of the Straw Hat Pirates, 
              offering unmatched performance and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="group relative bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 hover:-translate-y-6 transform-3d overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <CardHeader className="relative text-center pb-4">
                  <div className="relative mb-6">
                    <div className="text-6xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                      {service.icon}
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-opacity`}></div>
                  </div>
                  <CardTitle className="text-xl lg:text-2xl mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <Link href={service.link}>
                    <Button 
                      className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 transition-all duration-300 rounded-xl text-lg py-3 shadow-lg hover:shadow-xl hover:scale-105 transform-3d`}
                    >
                      Explore Plans
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Features Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Why Sail With Us?
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              More than just hosting - it's a journey to digital freedom
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Zap className="h-12 w-12 text-yellow-500" />,
                title: "Lightning Fast",
                description: "Powered by NVMe SSDs and cutting-edge hardware for maximum speed",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: <Shield className="h-12 w-12 text-blue-500" />,
                title: "Fort Knox Security",
                description: "Advanced DDoS protection and encryption keep your data safe",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Trophy className="h-12 w-12 text-purple-500" />,
                title: "Legendary Support",
                description: "24/7 expert support from our crew of technical pirates",
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-background/60 backdrop-blur-xl border border-border/30 rounded-3xl p-10 text-center shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 hover:-translate-y-4 transform-3d"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className="relative mb-8">
                    <div className="p-6 bg-background/80 backdrop-blur-sm rounded-2xl inline-block group-hover:scale-125 transition-transform duration-500">
                      {feature.icon}
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-20 rounded-2xl blur-2xl group-hover:opacity-40 transition-opacity`}></div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-6 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-background/60 backdrop-blur-xl border border-border/30 rounded-3xl p-16 shadow-2xl">
              <div className="space-y-10">
                <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Ready to Set Sail?
                </h2>
                <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Join thousands of pirates who've found their digital treasure with us.
                </p>
                <div className="flex flex-col sm:flex-row gap-8 justify-center">
                  <Link href="/plans">
                    <Button 
                      size="lg" 
                      className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-xl px-12 py-6 rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-500 transform-3d"
                    >
                      <Anchor className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform" />
                      View All Plans
                      <Sparkles className="h-6 w-6 ml-3 group-hover:scale-125 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="group text-xl px-12 py-6 rounded-2xl bg-background/60 backdrop-blur-xl border-border/30 shadow-2xl hover:shadow-primary/20 hover:scale-105 transition-all duration-500 transform-3d"
                    >
                      Contact Our Crew
                      <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}