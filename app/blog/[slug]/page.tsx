import { localDB, BlogPost } from '@/lib/database'
import BlogPostDisplay from '@/components/blog/BlogPostDisplay'

export async function generateStaticParams() {
  // Return hardcoded slugs for static generation
  // In production, this should fetch from a build-time accessible data source
  return [
    { slug: 'getting-started-with-nextjs' },
    { slug: 'advanced-react-patterns' },
    { slug: 'typescript-best-practices' },
    { slug: 'web-performance-optimization' },
    { slug: 'modern-css-techniques' }
  ]
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post: BlogPost | null = null
  let relatedPosts: BlogPost[] = []

  try {
    post = await localDB.fetchBlogPostBySlug(params.slug)
    if (post) {
      // Increment view count
      await localDB.incrementBlogPostViews(post.id)
      
      // Fetch related posts
      relatedPosts = await localDB.fetchRelatedBlogPosts(post.category, post.id)
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
  }

  return <BlogPostDisplay initialPost={post} initialRelatedPosts={relatedPosts} />
}