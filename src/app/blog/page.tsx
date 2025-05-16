import Link from 'next/link';
import { getAllPosts, PostFrontmatter } from '@/lib/blog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

// export const dynamic = 'force-dynamic'; // Removed for on-demand revalidation

export default async function BlogListPage() {
  const posts = await getAllPosts();

  console.log('[BlogListPage] Received posts:', JSON.stringify(posts.map(p => ({ title: p.title, slug: p.slug, date: p.date })), null, 2)); // Log titles and slugs

  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 lg:py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Blog</h1>
        <p className="text-xl text-muted-foreground">No blog posts found yet. Stay tuned!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Blog Archive
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Thoughts, updates, and explorations. 
        </p>
      </header>

      <div className="grid gap-6 md:gap-8 lg:gap-10">
        {posts.map((post: PostFrontmatter) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
            <Card className="transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-primary/60">
              <CardHeader>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </CardTitle>
                <div className="text-sm text-muted-foreground flex items-center space-x-2 mt-1">
                  <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                  {post.author && <span>&bull; By {post.author}</span>}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
                  {post.summary}
                </CardDescription>
                <div className="mt-4">
                  <Badge variant="outline" className="group-hover:bg-primary/10 group-hover:border-primary/50 transition-colors duration-300">Read more &rarr;</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 