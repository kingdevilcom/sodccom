'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Anchor, 
  Users, 
  Globe, 
  Shield, 
  Zap, 
  Trophy,
  Heart,
  Star,
  Target,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const crewMembers = [
    {
      name: "Captain Luffy",
      role: "Infrastructure Lead",
      description: "Stretches our servers to their limits with Gum-Gum optimization",
      icon: "🏴‍☠️",
      color: "from-red-500 to-orange-500"
    },
    {
      name: "Zoro",
      role: "Security Specialist", 
      description: "Three-sword style protection against all digital threats",
      icon: "⚔️",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Robin",
      role: "Data Archaeologist",
      description: "Deciphers ancient protocols and modern encryption alike",
      icon: "🔐",
      color: "from-purple-500 to-violet-500"
    },
    {
      name: "Nami",
      role: "Network Navigator",
      description: "Charts the fastest routes through the digital Grand Line",
      icon: "🧭",
      color: "from-blue-500 to-cyan-500"
    }
  ]

  const achievements = [
    { label: "Years Sailing", value: "5+", icon: Anchor, color: "text-blue-500" },
    { label: "Happy Pirates", value: "15,000+", icon: Users, color: "text-green-500" },
    { label: "Countries Served", value: "47", icon: Globe, color: "text-purple-500" },
    { label: "Uptime", value: "99.98%", icon: Shield, color: "text-orange-500" }
  ]

  return (
    <div className="relative min-h-screen">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-transform duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute top-1/3 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl transition-transform duration-1000"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        <div 
          className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl transition-transform duration-1000"
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
              Grand Line
            </Badge>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            About Our Crew
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
              We're not just another hosting company. We're digital pirates sailing the Grand Line of 
              web infrastructure, bringing you the most reliable and powerful hosting solutions in the 
              seven digital seas.
            </p>
          </div>
        </div>

        {/* Floating Story Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <Card className="group relative bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center text-2xl lg:text-3xl">
                <div className="relative mr-4">
                  <Heart className="h-8 w-8 text-red-500" />
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg animate-pulse"></div>
                </div>
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-6 text-lg">
              <p className="text-muted-foreground leading-relaxed">
                Born from the dreams of digital freedom, Steal Or Die Cloud™ began as a small crew 
                of passionate developers who believed that everyone deserves access to premium hosting 
                without breaking the bank.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Inspired by the spirit of adventure from the Grand Line, we've built our platform 
                to be as reliable as the Thousand Sunny and as powerful as a Devil Fruit user.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we serve over 15,000 happy pirates across 47 countries, maintaining an 
                industry-leading 99.98% uptime while keeping our prices fair for all crew members.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl shadow-secondary/5 hover:shadow-secondary/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center text-2xl lg:text-3xl">
                <div className="relative mr-4">
                  <Target className="h-8 w-8 text-primary" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-pulse"></div>
                </div>
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-6 text-lg">
              <p className="text-muted-foreground leading-relaxed">
                To democratize access to premium hosting services by combining cutting-edge technology 
                with pirate-level customer service and transparent pricing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that whether you're running a small Minecraft server for friends or 
                managing enterprise-level VPS infrastructure, you deserve the same level of 
                performance and support.
              </p>
              <div className="flex items-center space-x-3 text-primary font-bold text-xl">
                <Star className="h-6 w-6 animate-spin" />
                <span>"One Piece of hosting for every dream"</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating Achievements */}
        <div className="mb-24">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Legendary Achievements
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card 
                key={index} 
                className="group relative bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-110 hover:-translate-y-4 text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative p-8">
                  <div className="relative mb-6">
                    <achievement.icon className={`h-12 w-12 mx-auto ${achievement.color}`} />
                    <div className={`absolute inset-0 ${achievement.color.replace('text-', 'bg-')}/20 rounded-full blur-lg animate-pulse`}></div>
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform">
                    {achievement.value}
                  </div>
                  <div className="text-sm lg:text-base text-muted-foreground font-medium">
                    {achievement.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Floating Crew Members */}
        <div className="mb-24">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Meet the Straw Hat Tech Crew
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {crewMembers.map((member, index) => (
              <Card 
                key={index} 
                className="group relative bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-105 hover:-translate-y-6"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-500`}></div>
                <CardHeader className="relative text-center">
                  <div className="relative mb-4">
                    <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500">
                      {member.icon}
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${member.color} opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-opacity`}></div>
                  </div>
                  <CardTitle className="text-xl lg:text-2xl mb-2">{member.name}</CardTitle>
                  <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-sm lg:text-base text-muted-foreground text-center leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Floating Values Section */}
        <Card className="relative bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl shadow-primary/5 mb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
          <CardHeader className="relative">
            <CardTitle className="text-4xl lg:text-5xl text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Our Pirate Code
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "Reliability First", desc: "Your digital treasure deserves the strongest protection", color: "text-blue-500" },
                { icon: Zap, title: "Lightning Speed", desc: "Performance that rivals the fastest ships on the Grand Line", color: "text-yellow-500" },
                { icon: Trophy, title: "Legendary Support", desc: "24/7 assistance from our expert crew members", color: "text-purple-500" }
              ].map((value, index) => (
                <div key={index} className="text-center space-y-4 group">
                  <div className="relative">
                    <value.icon className={`h-12 w-12 mx-auto ${value.color} group-hover:scale-125 transition-transform duration-500`} />
                    <div className={`absolute inset-0 ${value.color.replace('text-', 'bg-')}/20 rounded-full blur-lg animate-pulse`}></div>
                  </div>
                  <h3 className="font-bold text-xl lg:text-2xl">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Floating CTA Section */}
        <div className="text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Ready to Join Our Crew?
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Set sail with us and discover why thousands of pirates trust Steal Or Die Cloud™ 
            for their digital adventures.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/plans">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-lg px-8 py-4 rounded-2xl shadow-2xl shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
              >
                <Anchor className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform" />
                View Our Plans
                <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="group text-lg px-8 py-4 rounded-2xl bg-background/60 backdrop-blur-xl border-border/30 shadow-2xl hover:shadow-primary/10 hover:scale-105 transition-all duration-300"
              >
                Contact Our Crew
                <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}