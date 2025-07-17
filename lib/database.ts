// Local database implementation using localStorage
export interface Plan {
  id: string
  name: string
  category: 'minecraft' | 'vps' | 'vlss' | 'v2ray'
  price_usd: number
  price_lkr: number
  vcpu: number
  ram: number
  storage: number
  storage_type: 'SSD' | 'NVMe'
  is_popular: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_email: string
  plan_id: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  amount_usd: number
  amount_lkr: number
  currency: 'USD' | 'LKR'
  payhere_order_id: string | null
  payhere_payment_id: string | null
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name: string
  phone: string
  status: 'active' | 'suspended' | 'banned'
  created_at: string
  updated_at: string
}

export interface PromoCode {
  id: string
  code: string
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  currency: 'USD' | 'LKR'
  usage_limit: number | null
  usage_count: number
  expires_at: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Announcement {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  is_active: boolean
  show_on_homepage: boolean
  show_on_plans: boolean
  show_on_checkout: boolean
  expires_at: string | null
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: 'tutorials' | 'news' | 'guides' | 'updates'
  tags: string[]
  featured_image: string | null
  is_published: boolean
  read_time: number | null
  views: number
  created_at: string
  updated_at: string
}

class LocalDatabase {
  private getPlans(): Plan[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem('plans')
    if (stored) {
      return JSON.parse(stored)
    }
    
    // Initialize with default plans
    const defaultPlans: Plan[] = [
      // Minecraft Plans
      {
        id: 'minecraft-going-merry',
        name: 'Going Merry',
        category: 'minecraft',
        price_usd: 3.50,
        price_lkr: 1100,
        vcpu: 2,
        ram: 4,
        storage: 40,
        storage_type: 'NVMe',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'minecraft-thousand-sunny',
        name: 'Thousand Sunny',
        category: 'minecraft',
        price_usd: 8.00,
        price_lkr: 2500,
        vcpu: 3,
        ram: 8,
        storage: 75,
        storage_type: 'NVMe',
        is_popular: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'minecraft-ghost-princess',
        name: 'Ghost Princess',
        category: 'minecraft',
        price_usd: 12.00,
        price_lkr: 3800,
        vcpu: 6,
        ram: 12,
        storage: 100,
        storage_type: 'NVMe',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'minecraft-enies-lobby-breaker',
        name: 'Enies Lobby Breaker',
        category: 'minecraft',
        price_usd: 18.00,
        price_lkr: 5700,
        vcpu: 8,
        ram: 24,
        storage: 200,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'minecraft-poneglyph-node',
        name: 'Poneglyph Node',
        category: 'minecraft',
        price_usd: 29.00,
        price_lkr: 9200,
        vcpu: 12,
        ram: 48,
        storage: 250,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'minecraft-buster-call',
        name: 'Buster Call',
        category: 'minecraft',
        price_usd: 50.00,
        price_lkr: 15800,
        vcpu: 16,
        ram: 64,
        storage: 300,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'minecraft-one-piece-throne',
        name: 'One Piece Throne',
        category: 'minecraft',
        price_usd: 65.00,
        price_lkr: 20600,
        vcpu: 18,
        ram: 96,
        storage: 350,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      // VPS Plans - Nakama Core
      {
        id: 'vps-zoro-blade-core',
        name: 'Zoro Blade Core',
        category: 'vps',
        price_usd: 5.00,
        price_lkr: 1580,
        vcpu: 2,
        ram: 4,
        storage: 50,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'vps-usopp-snipe-node',
        name: 'Usopp Snipe Node',
        category: 'vps',
        price_usd: 10.00,
        price_lkr: 3160,
        vcpu: 4,
        ram: 8,
        storage: 100,
        storage_type: 'SSD',
        is_popular: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'vps-sanji-flame-drive',
        name: 'Sanji Flame Drive',
        category: 'vps',
        price_usd: 18.00,
        price_lkr: 5700,
        vcpu: 6,
        ram: 16,
        storage: 200,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'vps-franky-tank-build',
        name: 'Franky Tank Build',
        category: 'vps',
        price_usd: 35.00,
        price_lkr: 11100,
        vcpu: 12,
        ram: 32,
        storage: 400,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'vps-jinbei-water-flow',
        name: 'Jinbei Water Flow',
        category: 'vps',
        price_usd: 60.00,
        price_lkr: 19000,
        vcpu: 16,
        ram: 64,
        storage: 600,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      // VLSS Plans - Marine Cipher Nodes
      {
        id: 'vlss-buggy-byte-server',
        name: 'Buggy Byte Server',
        category: 'vlss',
        price_usd: 3.00,
        price_lkr: 950,
        vcpu: 1,
        ram: 2,
        storage: 20,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'vlss-smoker-cloud-unit',
        name: 'Smoker Cloud Unit',
        category: 'vlss',
        price_usd: 5.00,
        price_lkr: 1580,
        vcpu: 2,
        ram: 4,
        storage: 40,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'vlss-robin-archive-core',
        name: 'Robin Archive Core',
        category: 'vlss',
        price_usd: 8.00,
        price_lkr: 2530,
        vcpu: 3,
        ram: 6,
        storage: 80,
        storage_type: 'NVMe',
        is_popular: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'vlss-brook-soul-server',
        name: 'Brook Soul Server',
        category: 'vlss',
        price_usd: 12.00,
        price_lkr: 3800,
        vcpu: 6,
        ram: 12,
        storage: 120,
        storage_type: 'NVMe',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'vlss-cp9-secret-node',
        name: 'CP9 Secret Node',
        category: 'vlss',
        price_usd: 18.00,
        price_lkr: 5700,
        vcpu: 8,
        ram: 24,
        storage: 250,
        storage_type: 'NVMe',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'vlss-sabo-flame-burst',
        name: 'Sabo Flame Burst',
        category: 'vlss',
        price_usd: 30.00,
        price_lkr: 9500,
        vcpu: 12,
        ram: 48,
        storage: 500,
        storage_type: 'NVMe',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'vlss-imu-shadow-engine',
        name: 'Imu Shadow Engine',
        category: 'vlss',
        price_usd: 50.00,
        price_lkr: 15800,
        vcpu: 16,
        ram: 64,
        storage: 750,
        storage_type: 'NVMe',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'vlss-gorosei-thronenet',
        name: 'Gorosei ThroneNet',
        category: 'vlss',
        price_usd: 70.00,
        price_lkr: 22200,
        vcpu: 20,
        ram: 96,
        storage: 1000,
        storage_type: 'NVMe',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      // V2Ray Plans - Devil Signal Fruits (30-Day Blitz Protocols)
      {
        id: 'v2ray-noro-noro-beam',
        name: 'Noro Noro Beam',
        category: 'v2ray',
        price_usd: 0.45,
        price_lkr: 142,
        vcpu: 1,
        ram: 1,
        storage: 10,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'v2ray-soru-skip',
        name: 'Soru Skip',
        category: 'v2ray',
        price_usd: 0.75,
        price_lkr: 237,
        vcpu: 1,
        ram: 1,
        storage: 15,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'v2ray-mero-hack',
        name: 'Mero Hack',
        category: 'v2ray',
        price_usd: 0.90,
        price_lkr: 284,
        vcpu: 1,
        ram: 2,
        storage: 20,
        storage_type: 'SSD',
        is_popular: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      // V2Ray Plans - Devil Signal Fruits (60-Day Survivor Protocols)
      {
        id: 'v2ray-den-den-ping',
        name: 'Den Den Ping',
        category: 'v2ray',
        price_usd: 0.75,
        price_lkr: 237,
        vcpu: 1,
        ram: 1,
        storage: 10,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'v2ray-buster-stream',
        name: 'Buster Stream',
        category: 'v2ray',
        price_usd: 1.05,
        price_lkr: 332,
        vcpu: 1,
        ram: 2,
        storage: 15,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'v2ray-nika-pulse',
        name: 'Nika Pulse',
        category: 'v2ray',
        price_usd: 1.50,
        price_lkr: 474,
        vcpu: 2,
        ram: 4,
        storage: 25,
        storage_type: 'SSD',
        is_popular: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
    
    localStorage.setItem('plans', JSON.stringify(defaultPlans))
    return defaultPlans
  }

  private getOrders(): Order[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem('orders')
    if (stored) {
      return JSON.parse(stored)
    }
    
    // Initialize with sample orders
    const sampleOrders: Order[] = [
      {
        id: 'order-1',
        user_email: 'luffy@strawhat.com',
        plan_id: 'minecraft-shadow-block',
        status: 'completed',
        amount_usd: 8.00,
        amount_lkr: 2500,
        currency: 'LKR',
        payhere_order_id: 'SOD-1234567890',
        payhere_payment_id: 'PAY-123456',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'order-2',
        user_email: 'zoro@strawhat.com',
        plan_id: 'vps-wado-core',
        status: 'pending',
        amount_usd: 10.00,
        amount_lkr: 3160,
        currency: 'USD',
        payhere_order_id: 'SOD-1234567891',
        payhere_payment_id: null,
        created_at: new Date(Date.now() - 3600000).toISOString(),
        updated_at: new Date(Date.now() - 3600000).toISOString()
      }
    ]
    
    localStorage.setItem('orders', JSON.stringify(sampleOrders))
    return sampleOrders
  }

  private getUsers(): User[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem('users')
    if (stored) {
      return JSON.parse(stored)
    }
    
    // Initialize with sample users
    const sampleUsers: User[] = [
      {
        id: 'user-1',
        email: 'luffy@strawhat.com',
        name: 'Monkey D. Luffy',
        phone: '+94 77 123 4567',
        status: 'active',
        created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 7).toISOString()
      },
      {
        id: 'user-2',
        email: 'zoro@strawhat.com',
        name: 'Roronoa Zoro',
        phone: '+94 77 234 5678',
        status: 'active',
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 5).toISOString()
      },
      {
        id: 'user-3',
        email: 'nami@strawhat.com',
        name: 'Nami',
        phone: '+94 77 345 6789',
        status: 'active',
        created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 3).toISOString()
      }
    ]
    
    localStorage.setItem('users', JSON.stringify(sampleUsers))
    return sampleUsers
  }

  private getPromoCodes(): PromoCode[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem('promo_codes')
    if (stored) {
      return JSON.parse(stored)
    }
    
    // Initialize with sample promo codes
    const samplePromoCodes: PromoCode[] = [
      {
        id: 'promo-1',
        code: 'PIRATE10',
        discount_type: 'percentage',
        discount_value: 10,
        currency: 'USD',
        usage_limit: 100,
        usage_count: 25,
        expires_at: new Date(Date.now() + 86400000 * 30).toISOString(),
        is_active: true,
        created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 10).toISOString()
      },
      {
        id: 'promo-2',
        code: 'GRANDLINE',
        discount_type: 'percentage',
        discount_value: 15,
        currency: 'USD',
        usage_limit: 50,
        usage_count: 12,
        expires_at: new Date(Date.now() + 86400000 * 60).toISOString(),
        is_active: true,
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 5).toISOString()
      },
      {
        id: 'promo-3',
        code: 'STRAWHAT',
        discount_type: 'fixed',
        discount_value: 5,
        currency: 'USD',
        usage_limit: 25,
        usage_count: 8,
        expires_at: new Date(Date.now() + 86400000 * 45).toISOString(),
        is_active: true,
        created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 3).toISOString()
      }
    ]
    
    localStorage.setItem('promo_codes', JSON.stringify(samplePromoCodes))
    return samplePromoCodes
  }

  private getAnnouncements(): Announcement[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem('announcements')
    if (stored) {
      return JSON.parse(stored)
    }
    
    // Initialize with sample announcements
    const sampleAnnouncements: Announcement[] = [
      {
        id: 'announcement-1',
        title: 'Welcome to the Grand Line!',
        message: 'Set sail with our new hosting plans and discover the digital treasure that awaits!',
        type: 'success',
        is_active: true,
        show_on_homepage: true,
        show_on_plans: false,
        show_on_checkout: false,
        expires_at: null,
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: 'announcement-2',
        title: 'Limited Time Offer',
        message: 'Use code PIRATE10 for 10% off all plans this month!',
        type: 'info',
        is_active: true,
        show_on_homepage: false,
        show_on_plans: true,
        show_on_checkout: true,
        expires_at: new Date(Date.now() + 86400000 * 28).toISOString(),
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString()
      }
    ]
    
    localStorage.setItem('announcements', JSON.stringify(sampleAnnouncements))
    return sampleAnnouncements
  }

  private getBlogPosts(): BlogPost[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem('blog_posts')
    if (stored) {
      return JSON.parse(stored)
    }
    
    // Initialize with sample blog posts
    const sampleBlogPosts: BlogPost[] = [
      {
        id: 'blog-1',
        title: 'Getting Started with Minecraft Server Hosting',
        slug: 'getting-started-minecraft-server-hosting',
        excerpt: 'Learn how to set up your first Minecraft server and start your digital adventure on the Grand Line.',
        content: `
          <h2>Welcome to the World of Minecraft Hosting</h2>
          <p>Setting up your first Minecraft server can seem daunting, but with our Luffy's Hosting Fleet, it's as easy as stretching your arms!</p>
          
          <h3>Step 1: Choose Your Plan</h3>
          <p>Start with our Sunny Spark plan for small groups, or go big with Shadow Block for larger crews.</p>
          
          <h3>Step 2: Server Configuration</h3>
          <p>Our control panel makes it easy to configure your server settings, install mods, and manage your world.</p>
          
          <h3>Step 3: Invite Your Crew</h3>
          <p>Share your server IP with friends and start building your digital empire together!</p>
          
          <p>Ready to set sail? <a href="/plans">Check out our Minecraft hosting plans</a> and start your adventure today!</p>
        `,
        author: 'Captain Luffy',
        category: 'tutorials',
        tags: ['minecraft', 'hosting', 'tutorial', 'beginner'],
        featured_image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
        is_published: true,
        read_time: 5,
        views: 1250,
        created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 3).toISOString()
      },
      {
        id: 'blog-2',
        title: 'VPS Security Best Practices',
        slug: 'vps-security-best-practices',
        excerpt: 'Protect your virtual private server like Zoro protects his swords with these essential security tips.',
        content: `
          <h2>Securing Your VPS: A Three-Sword Style Approach</h2>
          <p>Just like Zoro's three-sword fighting style, VPS security requires multiple layers of protection.</p>
          
          <h3>First Sword: Strong Authentication</h3>
          <ul>
            <li>Use SSH keys instead of passwords</li>
            <li>Enable two-factor authentication</li>
            <li>Change default ports</li>
          </ul>
          
          <h3>Second Sword: Regular Updates</h3>
          <ul>
            <li>Keep your OS updated</li>
            <li>Update installed software regularly</li>
            <li>Monitor security advisories</li>
          </ul>
          
          <h3>Third Sword: Monitoring and Backups</h3>
          <ul>
            <li>Set up log monitoring</li>
            <li>Configure automated backups</li>
            <li>Use intrusion detection systems</li>
          </ul>
          
          <p>With these three swords of security, your VPS will be as protected as the Thousand Sunny!</p>
        `,
        author: 'Roronoa Zoro',
        category: 'guides',
        tags: ['vps', 'security', 'best-practices', 'server'],
        featured_image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
        is_published: true,
        read_time: 8,
        views: 890,
        created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 7).toISOString()
      },
      {
        id: 'blog-3',
        title: 'New Features: Enhanced Control Panel',
        slug: 'new-features-enhanced-control-panel',
        excerpt: 'Discover the latest updates to our control panel that make managing your servers easier than ever.',
        content: `
          <h2>Setting Sail with Our New Control Panel</h2>
          <p>We've been working hard to improve your hosting experience, and we're excited to announce major updates to our control panel!</p>
          
          <h3>What's New?</h3>
          <ul>
            <li><strong>One-Click Backups:</strong> Create and restore backups with a single click</li>
            <li><strong>Real-time Monitoring:</strong> Watch your server performance in real-time</li>
            <li><strong>Mobile-Friendly Design:</strong> Manage your servers from anywhere</li>
            <li><strong>Advanced File Manager:</strong> Edit files directly in your browser</li>
          </ul>
          
          <h3>Coming Soon</h3>
          <p>We're also working on automatic scaling, enhanced security features, and integration with popular development tools.</p>
          
          <p>These updates are available to all customers at no additional cost. Log in to your control panel to explore the new features!</p>
        `,
        author: 'Nami',
        category: 'updates',
        tags: ['control-panel', 'features', 'updates', 'announcement'],
        featured_image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
        is_published: true,
        read_time: 4,
        views: 2100,
        created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 1).toISOString()
      }
    ]
    
    localStorage.setItem('blog_posts', JSON.stringify(sampleBlogPosts))
    return sampleBlogPosts
  }

  private saveOrders(orders: Order[]): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('orders', JSON.stringify(orders))
  }

  private saveUsers(users: User[]): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('users', JSON.stringify(users))
  }

  private savePromoCodes(promoCodes: PromoCode[]): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('promo_codes', JSON.stringify(promoCodes))
  }

  private saveAnnouncements(announcements: Announcement[]): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('announcements', JSON.stringify(announcements))
  }

  private savePlans(plans: Plan[]): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('plans', JSON.stringify(plans))
  }

  private saveBlogPosts(blogPosts: BlogPost[]): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('blog_posts', JSON.stringify(blogPosts))
  }

  // Plans methods
  async fetchPlans(): Promise<Plan[]> {
    return this.getPlans()
  }

  async createPlan(planData: Omit<Plan, 'id' | 'created_at' | 'updated_at'>): Promise<Plan> {
    const plans = this.getPlans()
    const newPlan: Plan = {
      ...planData,
      id: `plan-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    plans.push(newPlan)
    this.savePlans(plans)
    return newPlan
  }

  async updatePlan(planId: string, updates: Partial<Plan>): Promise<Plan | null> {
    const plans = this.getPlans()
    const planIndex = plans.findIndex(plan => plan.id === planId)
    
    if (planIndex === -1) return null
    
    plans[planIndex] = {
      ...plans[planIndex],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.savePlans(plans)
    return plans[planIndex]
  }

  async deletePlan(planId: string): Promise<boolean> {
    const plans = this.getPlans()
    const filteredPlans = plans.filter(plan => plan.id !== planId)
    
    if (filteredPlans.length === plans.length) return false
    
    this.savePlans(filteredPlans)
    return true
  }

  // Orders methods
  async fetchOrders(): Promise<Order[]> {
    return this.getOrders()
  }

  async createOrder(orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order> {
    const orders = this.getOrders()
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    orders.push(newOrder)
    this.saveOrders(orders)
    return newOrder
  }

  async updateOrder(orderId: string, updates: Partial<Order>): Promise<Order | null> {
    const orders = this.getOrders()
    const orderIndex = orders.findIndex(order => order.id === orderId)
    
    if (orderIndex === -1) return null
    
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.saveOrders(orders)
    return orders[orderIndex]
  }

  async findOrderByPayhereId(payhereOrderId: string): Promise<Order | null> {
    const orders = this.getOrders()
    return orders.find(order => order.payhere_order_id === payhereOrderId) || null
  }

  // Users methods
  async fetchUsers(): Promise<User[]> {
    return this.getUsers()
  }

  async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const users = this.getUsers()
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    users.push(newUser)
    this.saveUsers(users)
    return newUser
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    const users = this.getUsers()
    const userIndex = users.findIndex(user => user.id === userId)
    
    if (userIndex === -1) return null
    
    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.saveUsers(users)
    return users[userIndex]
  }

  async deleteUser(userId: string): Promise<boolean> {
    const users = this.getUsers()
    const filteredUsers = users.filter(user => user.id !== userId)
    
    if (filteredUsers.length === users.length) return false
    
    this.saveUsers(filteredUsers)
    return true
  }

  // Promo codes methods
  async fetchPromoCodes(): Promise<PromoCode[]> {
    return this.getPromoCodes()
  }

  async createPromoCode(promoData: Omit<PromoCode, 'id' | 'created_at' | 'updated_at'>): Promise<PromoCode> {
    const promoCodes = this.getPromoCodes()
    const newPromoCode: PromoCode = {
      ...promoData,
      id: `promo-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    promoCodes.push(newPromoCode)
    this.savePromoCodes(promoCodes)
    return newPromoCode
  }

  async updatePromoCode(promoId: string, updates: Partial<PromoCode>): Promise<PromoCode | null> {
    const promoCodes = this.getPromoCodes()
    const promoIndex = promoCodes.findIndex(promo => promo.id === promoId)
    
    if (promoIndex === -1) return null
    
    promoCodes[promoIndex] = {
      ...promoCodes[promoIndex],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.savePromoCodes(promoCodes)
    return promoCodes[promoIndex]
  }

  async deletePromoCode(promoId: string): Promise<boolean> {
    const promoCodes = this.getPromoCodes()
    const filteredPromoCodes = promoCodes.filter(promo => promo.id !== promoId)
    
    if (filteredPromoCodes.length === promoCodes.length) return false
    
    this.savePromoCodes(filteredPromoCodes)
    return true
  }

  // Announcements methods
  async fetchAnnouncements(): Promise<Announcement[]> {
    return this.getAnnouncements()
  }

  async fetchActiveAnnouncements(page?: string): Promise<Announcement[]> {
    const announcements = this.getAnnouncements()
    const now = new Date()
    
    return announcements.filter(announcement => {
      if (!announcement.is_active) return false
      if (announcement.expires_at && new Date(announcement.expires_at) < now) return false
      
      if (page === 'homepage') return announcement.show_on_homepage
      if (page === 'plans') return announcement.show_on_plans
      if (page === 'checkout') return announcement.show_on_checkout
      
      return true
    })
  }

  async createAnnouncement(announcementData: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>): Promise<Announcement> {
    const announcements = this.getAnnouncements()
    const newAnnouncement: Announcement = {
      ...announcementData,
      id: `announcement-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    announcements.push(newAnnouncement)
    this.saveAnnouncements(announcements)
    return newAnnouncement
  }

  async updateAnnouncement(announcementId: string, updates: Partial<Announcement>): Promise<Announcement | null> {
    const announcements = this.getAnnouncements()
    const announcementIndex = announcements.findIndex(announcement => announcement.id === announcementId)
    
    if (announcementIndex === -1) return null
    
    announcements[announcementIndex] = {
      ...announcements[announcementIndex],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.saveAnnouncements(announcements)
    return announcements[announcementIndex]
  }

  async deleteAnnouncement(announcementId: string): Promise<boolean> {
    const announcements = this.getAnnouncements()
    const filteredAnnouncements = announcements.filter(announcement => announcement.id !== announcementId)
    
    if (filteredAnnouncements.length === announcements.length) return false
    
    this.saveAnnouncements(filteredAnnouncements)
    return true
  }

  // Blog posts methods
  async fetchBlogPosts(): Promise<BlogPost[]> {
    return this.getBlogPosts()
  }

  async fetchPublishedBlogPosts(): Promise<BlogPost[]> {
    const posts = this.getBlogPosts()
    return posts.filter(post => post.is_published).sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }

  async fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = this.getBlogPosts()
    return posts.find(post => post.slug === slug && post.is_published) || null
  }

  async fetchRelatedBlogPosts(category: string, excludeId: string, limit: number = 2): Promise<BlogPost[]> {
    const posts = this.getBlogPosts()
    return posts
      .filter(post => post.category === category && post.id !== excludeId && post.is_published)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit)
  }

  async createBlogPost(postData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views'>): Promise<BlogPost> {
    const posts = this.getBlogPosts()
    const newPost: BlogPost = {
      ...postData,
      id: `blog-${Date.now()}`,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    posts.push(newPost)
    this.saveBlogPosts(posts)
    return newPost
  }

  async updateBlogPost(postId: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const posts = this.getBlogPosts()
    const postIndex = posts.findIndex(post => post.id === postId)
    
    if (postIndex === -1) return null
    
    posts[postIndex] = {
      ...posts[postIndex],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.saveBlogPosts(posts)
    return posts[postIndex]
  }

  async deleteBlogPost(postId: string): Promise<boolean> {
    const posts = this.getBlogPosts()
    const filteredPosts = posts.filter(post => post.id !== postId)
    
    if (filteredPosts.length === posts.length) return false
    
    this.saveBlogPosts(filteredPosts)
    return true
  }

  async incrementBlogPostViews(postId: string): Promise<void> {
    const posts = this.getBlogPosts()
    const postIndex = posts.findIndex(post => post.id === postId)
    
    if (postIndex !== -1) {
      posts[postIndex].views = (posts[postIndex].views || 0) + 1
      this.saveBlogPosts(posts)
    }
  }
}

export const localDB = new LocalDatabase()