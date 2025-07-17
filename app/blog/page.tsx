'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Clock, User, Search, BookOpen, ArrowRight, Eye } from 'lucide-react'
import { X } from 'lucide-react'
import Link from 'next/link'
import { localDB, BlogPost } from '@/lib/database'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await localDB.fetchPublishedBlogPosts()
        setPosts(fetchedPosts)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const categories = ['all', 'tutorials', 'news', 'guides', 'updates']

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tutorials':
        return 'from-blue-500 to-cyan-500'
      case 'news':
        return 'from-red-500 to-pink-500'
      case 'guides':
        return 'from-green-500 to-emerald-500'
      case 'updates':
        return 'from-purple-500 to-violet-500'
      default:
        return 'from-gray-500 to-slate-500'
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-transform duration-1000 animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute top-1/3 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl transition-transform duration-1000 animate-float-reverse"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        <div 
          className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl transition-transform duration-1000 animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * -0.01}px)`
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-background/80 backdrop-blur-xl border border-border/30 rounded-full p-8 shadow-2xl shadow-primary/10">
              <BookOpen className="h-16 w-16 text-primary mx-auto" />
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Pirate's Log
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Chronicles from the Grand Line of web hosting. Discover tutorials, news, and guides 
            to help you navigate the digital seas.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl shadow-primary/5">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search the archives..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/50 backdrop-blur-sm border-border/30 rounded-xl"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-xl transition-all duration-300 hover:scale-105 ${
                        selectedCategory === category 
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                          : 'hover:bg-primary/10'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Card 
                key={post.id}
                className="group relative bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(post.category)} opacity-0 group-hover:opacity-10`}></div>
                
                {/* Featured Image */}
                {post.featured_image && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                  </div>
                )}

                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`bg-gradient-to-r ${getCategoryColor(post.category)} text-white shadow-lg`}>
                      {post.category}
                    </Badge>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{post.views || 0}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl lg:text-2xl mb-3 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  
                  <CardDescription className="text-base leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{post.read_time || 5} min read</span>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedPost(post)}
                      className="group/btn hover:bg-primary/10 rounded-xl"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📜</div>
            <h3 className="text-2xl font-bold mb-4">No Chronicles Found</h3>
            <p className="text-muted-foreground mb-8">
              {searchTerm || selectedCategory !== 'all' 
                ? "No posts match your search criteria. Try adjusting your filters."
                : "The captain's log is empty. Check back soon for new adventures!"
              }
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Blog Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-3">
                  <Badge className={`bg-gradient-to-r ${getCategoryColor(selectedPost.category)} text-white`}>
                    {selectedPost.category}
                  </Badge>
                  <h2 className="text-xl font-bold">{selectedPost.title}</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPost(null)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                {selectedPost.featured_image && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={selectedPost.featured_image} 
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{selectedPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(selectedPost.created_at)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{selectedPost.read_time || 5} min read</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>{selectedPost.views || 0} views</span>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {selectedPost.excerpt}
                  </p>
                  
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-primary prose-pre:bg-muted prose-pre:border prose-pre:border-border/30"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                  
                  {selectedPost.tags && selectedPost.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-border">
                      <h4 className="font-semibold mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPost.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="hover:bg-primary/10">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-20">
          <Card className="relative bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl shadow-primary/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
            <CardContent className="relative p-12 text-center">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Stay Updated with Our Adventures
              </h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and never miss a chronicle from the Grand Line of web hosting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email..." 
                  className="flex-1 bg-background/50 backdrop-blur-sm border-border/30 rounded-xl"
                />
                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 rounded-xl px-8">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}