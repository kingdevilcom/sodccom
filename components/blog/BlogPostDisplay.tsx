'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen, Eye, Heart } from 'lucide-react'
import Link from 'next/link'
import { BlogPost } from '@/lib/database'

interface BlogPostDisplayProps {
  initialPost: BlogPost | null
  initialRelatedPosts: BlogPost[]
}

export default function BlogPostDisplay({ initialPost, initialRelatedPosts }: BlogPostDisplayProps) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(initialPost)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>(initialRelatedPosts)
  const [loading, setLoading] = useState(!initialPost)

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

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-12 bg-muted rounded w-3/4"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="text-6xl mb-6">📜</div>
          <h1 className="text-3xl font-bold mb-4">Chronicle Not Found</h1>
          <p className="text-muted-foreground mb-8">
            This page seems to have sailed away to uncharted waters.
          </p>
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="hover:bg-primary/10 rounded-xl">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <Card className="bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl shadow-primary/5 mb-8">
          <CardHeader className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge className={`bg-gradient-to-r ${getCategoryColor(post.category)} text-white shadow-lg`}>
                {post.category}
              </Badge>
              <Button variant="ghost" size="sm" onClick={handleShare} className="hover:bg-primary/10 rounded-xl">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <CardTitle className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              {post.title}
            </CardTitle>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{post.read_time || 5} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>{(post.views || 0) + 1} views</span>
              </div>
            </div>
          </CardHeader>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="px-6 pb-6">
              <div className="relative h-64 lg:h-96 overflow-hidden rounded-xl">
                <img 
                  src={post.featured_image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"></div>
              </div>
            </div>
          )}
        </Card>

        {/* Article Content */}
        <Card className="bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl shadow-primary/5 mb-8">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-primary prose-pre:bg-muted prose-pre:border prose-pre:border-border/30"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <Card className="bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl shadow-primary/5 mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="hover:bg-primary/10 transition-colors">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <Card className="bg-background/60 backdrop-blur-xl border border-border/30 shadow-2xl shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <BookOpen className="h-6 w-6 mr-3 text-primary" />
                Related Chronicles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-background/50 backdrop-blur-sm border-border/20">
                      {relatedPost.featured_image && (
                        <div className="relative h-32 overflow-hidden">
                          <img 
                            src={relatedPost.featured_image} 
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <Badge className={`bg-gradient-to-r ${getCategoryColor(relatedPost.category)} text-white text-xs mb-2`}>
                          {relatedPost.category}
                        </Badge>
                        <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                          <span>{formatDate(relatedPost.created_at)}</span>
                          <span>{relatedPost.read_time || 5} min read</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}