'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { 
  Shield, 
  Users, 
  Package, 
  ShoppingCart, 
  Tag, 
  Megaphone, 
  FileText, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  TrendingUp,
  Server,
  Activity,
  Calendar,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { localDB, Plan, Order, User, PromoCode, Announcement, BlogPost } from '@/lib/database'
import { useToast } from '@/hooks/use-toast'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Data states
  const [plans, setPlans] = useState<Plan[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  // Form states
  const [planForm, setPlanForm] = useState<Partial<Plan>>({})
  const [promoForm, setPromoForm] = useState<Partial<PromoCode>>({})
  const [announcementForm, setAnnouncementForm] = useState<Partial<Announcement>>({})
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({})

  // UI states
  const [editingPlan, setEditingPlan] = useState<string | null>(null)
  const [editingPromo, setEditingPromo] = useState<string | null>(null)
  const [editingAnnouncement, setEditingAnnouncement] = useState<string | null>(null)
  const [editingBlog, setEditingBlog] = useState<string | null>(null)

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadAllData()
    }
  }, [])

  const handleLogin = async () => {
    // Simple authentication (in production, use proper authentication)
    if (loginForm.username === 'nanokillx' && loginForm.password === 'T.s.t2@@9') {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      loadAllData()
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel, Captain!"
      })
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Try again, matey!",
        variant: "destructive"
      })
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
    toast({
      title: "Logged out",
      description: "Until next time, Captain!"
    })
  }

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [plansData, ordersData, usersData, promoData, announcementsData, blogData] = await Promise.all([
        localDB.fetchPlans(),
        localDB.fetchOrders(),
        localDB.fetchUsers(),
        localDB.fetchPromoCodes(),
        localDB.fetchAnnouncements(),
        localDB.fetchBlogPosts()
      ])
      
      setPlans(plansData)
      setOrders(ordersData)
      setUsers(usersData)
      setPromoCodes(promoData)
      setAnnouncements(announcementsData)
      setBlogPosts(blogData)
    } catch (error) {
      console.error('Error loading data:', error)
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  // Plan management
  const handleCreatePlan = async () => {
    try {
      if (!planForm.name || !planForm.category || !planForm.price_usd || !planForm.price_lkr) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }

      await localDB.createPlan({
        name: planForm.name,
        category: planForm.category as 'minecraft' | 'vps' | 'vlss' | 'v2ray',
        price_usd: Number(planForm.price_usd),
        price_lkr: Number(planForm.price_lkr),
        vcpu: Number(planForm.vcpu) || 1,
        ram: Number(planForm.ram) || 1,
        storage: Number(planForm.storage) || 10,
        storage_type: planForm.storage_type as 'SSD' | 'NVMe' || 'SSD',
        is_popular: planForm.is_popular || false
      })

      setPlanForm({})
      loadAllData()
      toast({
        title: "Success",
        description: "Plan created successfully!"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create plan",
        variant: "destructive"
      })
    }
  }

  const handleUpdatePlan = async (id: string) => {
    try {
      await localDB.updatePlan(id, planForm)
      setEditingPlan(null)
      setPlanForm({})
      loadAllData()
      toast({
        title: "Success",
        description: "Plan updated successfully!"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update plan",
        variant: "destructive"
      })
    }
  }

  const handleDeletePlan = async (id: string) => {
    try {
      await localDB.deletePlan(id)
      loadAllData()
      toast({
        title: "Success",
        description: "Plan deleted successfully!"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete plan",
        variant: "destructive"
      })
    }
  }

  // Promo code management
  const handleCreatePromoCode = async () => {
    try {
      if (!promoForm.code || !promoForm.discount_type || !promoForm.discount_value) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }

      await localDB.createPromoCode({
        code: promoForm.code,
        discount_type: promoForm.discount_type as 'percentage' | 'fixed',
        discount_value: Number(promoForm.discount_value),
        currency: promoForm.currency as 'USD' | 'LKR' || 'USD',
        usage_limit: promoForm.usage_limit ? Number(promoForm.usage_limit) : null,
        usage_count: 0,
        expires_at: promoForm.expires_at || null,
        is_active: promoForm.is_active !== false
      })

      setPromoForm({})
      loadAllData()
      toast({
        title: "Success",
        description: "Promo code created successfully!"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create promo code",
        variant: "destructive"
      })
    }
  }

  // Announcement management
  const handleCreateAnnouncement = async () => {
    try {
      if (!announcementForm.title || !announcementForm.message || !announcementForm.type) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }

      await localDB.createAnnouncement({
        title: announcementForm.title,
        message: announcementForm.message,
        type: announcementForm.type as 'info' | 'warning' | 'success' | 'error',
        is_active: announcementForm.is_active !== false,
        show_on_homepage: announcementForm.show_on_homepage || false,
        show_on_plans: announcementForm.show_on_plans || false,
        show_on_checkout: announcementForm.show_on_checkout || false,
        expires_at: announcementForm.expires_at || null
      })

      setAnnouncementForm({})
      loadAllData()
      toast({
        title: "Success",
        description: "Announcement created successfully!"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create announcement",
        variant: "destructive"
      })
    }
  }

  // Blog post management
  const handleCreateBlogPost = async () => {
    try {
      if (!blogForm.title || !blogForm.content || !blogForm.category) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }

      const slug = blogForm.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      await localDB.createBlogPost({
        title: blogForm.title,
        slug: slug,
        excerpt: blogForm.excerpt || blogForm.content.substring(0, 200) + '...',
        content: blogForm.content,
        author: blogForm.author || 'Admin',
        category: blogForm.category as 'tutorials' | 'news' | 'guides' | 'updates',
        tags: blogForm.tags || [],
        featured_image: blogForm.featured_image || null,
        is_published: blogForm.is_published !== false,
        read_time: blogForm.read_time || Math.ceil(blogForm.content.split(' ').length / 200)
      })

      setBlogForm({})
      loadAllData()
      toast({
        title: "Success",
        description: "Blog post created successfully!"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive"
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-gray-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const formatCurrency = (amount: number, currency: 'USD' | 'LKR') => {
    return currency === 'USD' ? `$${amount.toFixed(2)}` : `Rs. ${amount.toLocaleString()}`
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90">
        <Card className="w-full max-w-md bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Admin Portal
            </CardTitle>
            <p className="text-muted-foreground">
              Enter your captain's credentials
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="Enter password"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-primary to-secondary">
              <Shield className="h-4 w-4 mr-2" />
              Set Sail
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Captain's Dashboard
          </h1>
          <p className="text-muted-foreground">
            Command your digital fleet from here
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={loadAllData} variant="outline" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7 mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="promos">Promos</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount_usd, 0).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  From {orders.filter(o => o.status === 'completed').length} completed orders
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{plans.length}</div>
                <p className="text-xs text-muted-foreground">
                  {plans.filter(p => p.is_popular).length} popular plans
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders.length}</div>
                <p className="text-xs text-muted-foreground">
                  {orders.filter(o => o.status === 'pending').length} pending
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">
                  {users.filter(u => u.status === 'active').length} active
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <p className="font-medium">{order.user_email}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(order.amount_usd, 'USD')}
                          </p>
                        </div>
                      </div>
                      <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plans.filter(p => p.is_popular).slice(0, 5).map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{plan.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {plan.category} • ${plan.price_usd}/mo
                        </p>
                      </div>
                      <Badge>{plan.category}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Plan Management</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Plan</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="plan-name">Plan Name</Label>
                    <Input
                      id="plan-name"
                      value={planForm.name || ''}
                      onChange={(e) => setPlanForm({...planForm, name: e.target.value})}
                      placeholder="Enter plan name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="plan-category">Category</Label>
                    <Select value={planForm.category} onValueChange={(value) => setPlanForm({...planForm, category: value as 'minecraft' | 'vps' | 'vlss' | 'v2ray'})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minecraft">Minecraft</SelectItem>
                        <SelectItem value="vps">VPS</SelectItem>
                        <SelectItem value="vlss">VLSS</SelectItem>
                        <SelectItem value="v2ray">V2Ray</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="plan-price-usd">Price USD</Label>
                    <Input
                      id="plan-price-usd"
                      type="number"
                      step="0.01"
                      value={planForm.price_usd || ''}
                      onChange={(e) => setPlanForm({...planForm, price_usd: parseFloat(e.target.value)})}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="plan-price-lkr">Price LKR</Label>
                    <Input
                      id="plan-price-lkr"
                      type="number"
                      step="0.01"
                      value={planForm.price_lkr || ''}
                      onChange={(e) => setPlanForm({...planForm, price_lkr: parseFloat(e.target.value)})}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="plan-vcpu">vCPU</Label>
                    <Input
                      id="plan-vcpu"
                      type="number"
                      value={planForm.vcpu || ''}
                      onChange={(e) => setPlanForm({...planForm, vcpu: parseInt(e.target.value)})}
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="plan-ram">RAM (GB)</Label>
                    <Input
                      id="plan-ram"
                      type="number"
                      value={planForm.ram || ''}
                      onChange={(e) => setPlanForm({...planForm, ram: parseInt(e.target.value)})}
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="plan-storage">Storage (GB)</Label>
                    <Input
                      id="plan-storage"
                      type="number"
                      value={planForm.storage || ''}
                      onChange={(e) => setPlanForm({...planForm, storage: parseInt(e.target.value)})}
                      placeholder="10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="plan-storage-type">Storage Type</Label>
                    <Select value={planForm.storage_type} onValueChange={(value) => setPlanForm({...planForm, storage_type: value as 'SSD' | 'NVMe'})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SSD">SSD</SelectItem>
                        <SelectItem value="NVMe">NVMe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="plan-popular"
                        checked={planForm.is_popular || false}
                        onCheckedChange={(checked) => setPlanForm({...planForm, is_popular: checked})}
                      />
                      <Label htmlFor="plan-popular">Mark as Popular</Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleCreatePlan}>Create Plan</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Specs</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan) => (
                      <tr key={plan.id} className="border-b">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{plan.name}</p>
                            {plan.is_popular && (
                              <Badge variant="secondary" className="mt-1">Popular</Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge>{plan.category}</Badge>
                        </td>
                        <td className="p-4">
                          <div>
                            <p>${plan.price_usd}</p>
                            <p className="text-sm text-muted-foreground">Rs. {plan.price_lkr}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <p>{plan.vcpu} vCPU • {plan.ram}GB RAM</p>
                            <p>{plan.storage}GB {plan.storage_type}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">Active</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Plan</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{plan.name}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeletePlan(plan.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Order Management</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Order ID</th>
                      <th className="text-left p-4">Customer</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="p-4">
                          <code className="text-sm">{order.id.slice(0, 8)}...</code>
                        </td>
                        <td className="p-4">{order.user_email}</td>
                        <td className="p-4">
                          <div>
                            <p>{formatCurrency(order.amount_usd, 'USD')}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatCurrency(order.amount_lkr, 'LKR')}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(order.status)}
                            <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                              {order.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <p>{new Date(order.created_at).toLocaleDateString()}</p>
                            <p className="text-muted-foreground">
                              {new Date(order.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">User Management</h2>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Phone</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Joined</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="p-4">{user.name}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">{user.phone}</td>
                        <td className="p-4">
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promo Codes Tab */}
        <TabsContent value="promos" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Promo Code Management</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Promo Code
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Promo Code</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="promo-code">Code</Label>
                    <Input
                      id="promo-code"
                      value={promoForm.code || ''}
                      onChange={(e) => setPromoForm({...promoForm, code: e.target.value.toUpperCase()})}
                      placeholder="PROMO10"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="promo-type">Discount Type</Label>
                      <Select value={promoForm.discount_type} onValueChange={(value: "percentage" | "fixed") => setPromoForm({...promoForm, discount_type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="promo-value">Discount Value</Label>
                      <Input
                        id="promo-value"
                        type="number"
                        step="0.01"
                        value={promoForm.discount_value || ''}
                        onChange={(e) => setPromoForm({...promoForm, discount_value: parseFloat(e.target.value)})}
                        placeholder="10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="promo-limit">Usage Limit</Label>
                    <Input
                      id="promo-limit"
                      type="number"
                      value={promoForm.usage_limit || ''}
                      onChange={(e) => setPromoForm({...promoForm, usage_limit: parseInt(e.target.value)})}
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="promo-expires">Expires At</Label>
                    <Input
                      id="promo-expires"
                      type="datetime-local"
                      value={promoForm.expires_at || ''}
                      onChange={(e) => setPromoForm({...promoForm, expires_at: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="promo-active"
                      checked={promoForm.is_active !== false}
                      onCheckedChange={(checked) => setPromoForm({...promoForm, is_active: checked})}
                    />
                    <Label htmlFor="promo-active">Active</Label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleCreatePromoCode}>Create</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Code</th>
                      <th className="text-left p-4">Discount</th>
                      <th className="text-left p-4">Usage</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Expires</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promoCodes.map((promo) => (
                      <tr key={promo.id} className="border-b">
                        <td className="p-4">
                          <code className="font-mono">{promo.code}</code>
                        </td>
                        <td className="p-4">
                          {promo.discount_type === 'percentage' 
                            ? `${promo.discount_value}%` 
                            : `${promo.currency} ${promo.discount_value}`
                          }
                        </td>
                        <td className="p-4">
                          {promo.usage_count} / {promo.usage_limit || '∞'}
                        </td>
                        <td className="p-4">
                          <Badge variant={promo.is_active ? 'default' : 'secondary'}>
                            {promo.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {promo.expires_at 
                            ? new Date(promo.expires_at).toLocaleDateString()
                            : 'Never'
                          }
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Announcement Management</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Announcement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Announcement</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="announcement-title">Title</Label>
                    <Input
                      id="announcement-title"
                      value={announcementForm.title || ''}
                      onChange={(e) => setAnnouncementForm({...announcementForm, title: e.target.value})}
                      placeholder="Announcement title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="announcement-message">Message</Label>
                    <Textarea
                      id="announcement-message"
                      value={announcementForm.message || ''}
                      onChange={(e) => setAnnouncementForm({...announcementForm, message: e.target.value})}
                      placeholder="Announcement message"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="announcement-type">Type</Label>
   onValueChange={(value) =>
  setAnnouncementForm({
    ...announcementForm,
    type: value as AnnouncementType,
  })
}

>

                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Show On</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="show-homepage"
                          checked={announcementForm.show_on_homepage || false}
                          onCheckedChange={(checked) => setAnnouncementForm({...announcementForm, show_on_homepage: checked})}
                        />
                        <Label htmlFor="show-homepage">Homepage</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="show-plans"
                          checked={announcementForm.show_on_plans || false}
                          onCheckedChange={(checked) => setAnnouncementForm({...announcementForm, show_on_plans: checked})}
                        />
                        <Label htmlFor="show-plans">Plans Page</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="show-checkout"
                          checked={announcementForm.show_on_checkout || false}
                          onCheckedChange={(checked) => setAnnouncementForm({...announcementForm, show_on_checkout: checked})}
                        />
                        <Label htmlFor="show-checkout">Checkout Page</Label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="announcement-expires">Expires At</Label>
                    <Input
                      id="announcement-expires"
                      type="datetime-local"
                      value={announcementForm.expires_at || ''}
                      onChange={(e) => setAnnouncementForm({...announcementForm, expires_at: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="announcement-active"
                      checked={announcementForm.is_active !== false}
                      onCheckedChange={(checked) => setAnnouncementForm({...announcementForm, is_active: checked})}
                    />
                    <Label htmlFor="announcement-active">Active</Label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleCreateAnnouncement}>Create</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant={announcement.is_active ? 'default' : 'secondary'}>
                        {announcement.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Badge variant="outline">{announcement.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{announcement.message}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      {announcement.show_on_homepage && <Badge variant="outline">Homepage</Badge>}
                      {announcement.show_on_plans && <Badge variant="outline">Plans</Badge>}
                      {announcement.show_on_checkout && <Badge variant="outline">Checkout</Badge>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Blog Tab */}
        <TabsContent value="blog" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Blog Management</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Create Blog Post</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="blog-title">Title</Label>
                    <Input
                      id="blog-title"
                      value={blogForm.title || ''}
                      onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                      placeholder="Post title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="blog-category">Category</Label>
                    <Select value={blogForm.category} onValueChange={(value) => setBlogForm({...blogForm, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tutorials">Tutorials</SelectItem>
                        <SelectItem value="news">News</SelectItem>
                        <SelectItem value="guides">Guides</SelectItem>
                        <SelectItem value="updates">Updates</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="blog-author">Author</Label>
                    <Input
                      id="blog-author"
                      value={blogForm.author || ''}
                      onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                      placeholder="Author name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="blog-image">Featured Image URL</Label>
                    <Input
                      id="blog-image"
                      value={blogForm.featured_image || ''}
                      onChange={(e) => setBlogForm({...blogForm, featured_image: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="blog-excerpt">Excerpt</Label>
                    <Textarea
                      id="blog-excerpt"
                      value={blogForm.excerpt || ''}
                      onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                      placeholder="Brief description of the post"
                      rows={2}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="blog-content">Content</Label>
                    <Textarea
                      id="blog-content"
                      value={blogForm.content || ''}
                      onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                      placeholder="Post content (HTML supported)"
                      rows={10}
                    />
                  </div>
                  <div>
                    <Label htmlFor="blog-tags">Tags (comma separated)</Label>
                    <Input
                      id="blog-tags"
                      value={blogForm.tags?.join(', ') || ''}
                      onChange={(e) => setBlogForm({...blogForm, tags: e.target.value.split(',').map(tag => tag.trim())})}
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="blog-published"
                      checked={blogForm.is_published !== false}
                      onCheckedChange={(checked) => setBlogForm({...blogForm, is_published: checked})}
                    />
                    <Label htmlFor="blog-published">Published</Label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleCreateBlogPost}>Create Post</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {blogPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant={post.is_published ? 'default' : 'secondary'}>
                        {post.is_published ? 'Published' : 'Draft'}
                      </Badge>
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>By {post.author}</span>
                      <span>{post.views || 0} views</span>
                      <span>{post.read_time || 5} min read</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}