'use client'

import { useEffect, useRef } from 'react'

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) * 0.35

    let rotation = 0
    const servers = [
      { name: 'East Blue (Sri Lanka)', lat: 7.8731, lng: 80.7718, color: '#3B82F6' },
      { name: 'Sabaody (Singapore)', lat: 1.3521, lng: 103.8198, color: '#10B981' },
      { name: 'Water 7 (Tokyo)', lat: 35.6762, lng: 139.6503, color: '#F59E0B' },
      { name: 'Alabasta (Dubai)', lat: 25.2048, lng: 55.2708, color: '#EF4444' }
    ]

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Draw globe outline
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw grid lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'
      ctx.lineWidth = 1
      
      // Longitude lines
      for (let i = 0; i < 12; i++) {
        const angle = (i * 30) * Math.PI / 180
        const x1 = centerX + radius * Math.cos(angle)
        const y1 = centerY + radius * Math.sin(angle)
        const x2 = centerX - radius * Math.cos(angle)
        const y2 = centerY - radius * Math.sin(angle)
        
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      // Latitude lines
      for (let i = 1; i < 6; i++) {
        const r = radius * (i / 6)
        ctx.beginPath()
        ctx.arc(centerX, centerY, r, 0, 2 * Math.PI)
        ctx.stroke()
      }

      // Draw servers
      servers.forEach((server, index) => {
        const adjustedLng = server.lng + rotation
        const x = centerX + radius * 0.8 * Math.cos(adjustedLng * Math.PI / 180) * Math.cos(server.lat * Math.PI / 180)
        const y = centerY + radius * 0.8 * Math.sin(server.lat * Math.PI / 180)
        
        // Server dot
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, 2 * Math.PI)
        ctx.fillStyle = server.color
        ctx.fill()
        
        // Pulse effect
        const pulseRadius = 4 + Math.sin(Date.now() * 0.005 + index) * 3
        ctx.beginPath()
        ctx.arc(x, y, pulseRadius, 0, 2 * Math.PI)
        ctx.strokeStyle = server.color
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.5
        ctx.stroke()
        ctx.globalAlpha = 1

        // Connection lines to center
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = server.color
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.3 + Math.sin(Date.now() * 0.003 + index) * 0.2
        ctx.stroke()
        ctx.globalAlpha = 1
      })

      rotation += 0.2
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full h-auto max-w-md mx-auto"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/80 pointer-events-none" />
    </div>
  )
}