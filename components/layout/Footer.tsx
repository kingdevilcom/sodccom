import Link from 'next/link'
import { Anchor, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-secondary/10 backdrop-blur-md border-t border-border/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Anchor className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Steal Or Die Cloud™
              </span>
            </div>
            <p className="text-muted-foreground">
              Navigate the Grand Line of web hosting with the most notorious crew in the digital seas.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/plans#minecraft" className="hover:text-primary transition-colors">
                  Grand Line Ship Tier
                </Link>
              </li>
              <li>
                <Link href="/plans#vps" className="hover:text-primary transition-colors">
                  Nakama Core VPS
                </Link>
              </li>
              <li>
                <Link href="/plans#vlss" className="hover:text-primary transition-colors">
                  Marine Cipher Nodes
                </Link>
              </li>
              <li>
                <Link href="/plans#v2ray" className="hover:text-primary transition-colors">
                  Devil Signal Fruits
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/legal/terms" className="hover:text-primary transition-colors">
                  Terms of Sail
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-primary transition-colors">
                  Privacy Scroll
                </Link>
              </li>
              <li>
                <Link href="/legal/refund" className="hover:text-primary transition-colors">
                  Refund Compass
                </Link>
              </li>
              <li>
                <Link href="/legal/aup" className="hover:text-primary transition-colors">
                  Code of Conduct
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Admin */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>crew@stealordiecloud.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+94 77 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Colombo, Sri Lanka</span>
              </div>
              <div className="pt-2 text-xs text-green-600">
                <span>💳 Payments via Google Pay (USD)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 pt-8 text-center text-muted-foreground">
          <p>
            © 2024 SOD Cloud™. All rights reserved. 
            <span className="ml-2 font-semibold">Professional Hosting</span>
          </p>
        </div>
      </div>
    </footer>
  )
}