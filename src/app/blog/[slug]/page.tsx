import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CalendarDays, MessageCircle, Clock, Twitter, Linkedin, Facebook, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

// Helper to get random posts (excluding current)
function getRandomPosts(posts: any[], currentSlug: string, count = 2) {
  const filtered = posts.filter((p: any) => p.slug !== currentSlug);
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }
  return filtered.slice(0, count);
}

// This tells Next.js to render the page dynamically based on the slug
// and not to try to generate static paths at build time for this initial setup.
// We want to read from the filesystem on each request for now.
// export const dynamic = 'force-dynamic'; // Removed for on-demand revalidation

// If you wanted to pre-render known slugs at build time (optional, good for performance if content doesn't change super frequently)
// export async function generateStaticParams() {
//   const slugs = await getPostSlugs();
//   return slugs.map(slug => ({ slug }));
// }

type PostPageProps = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // Format date
  let formattedDate = 'Date not available';
  if (post.date) {
    try {
      formattedDate = format(new Date(post.date), 'MMM d, yyyy');
    } catch {}
  }

  // Read time (optional)
  const readTime = post.readTime || '';

  // Get random posts for sidebar
  const allPosts = await getAllPosts();
  const randomPosts = getRandomPosts(allPosts, slug, 2);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
      {/* Breadcrumbs */}
      <div className="mb-2 text-xs text-muted-foreground flex items-center gap-2">
        <Link href="/blog" className="hover:text-emerald-500 font-medium">cd ..</Link>
        <span className="mx-1">&#62;</span>
        <span className="truncate font-medium">{post.title}</span>
      </div>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 min-h-0">
        {/* Main Content */}
        <div className="min-w-0 lg:pr-8">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-2">
            <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> {formattedDate}</span>
            <a href="#comments" className="flex items-center gap-1 text-emerald-500 hover:text-emerald-600"><MessageCircle className="w-4 h-4" /> Comments</a>
            {readTime && <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {readTime}</span>}
          </div>
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 leading-tight border-l-4 border-emerald-500 pl-3">
            {post.title}
          </h1>
          {/* Excerpt/Summary */}
          {post.summary && (
            <div className="text-base sm:text-lg text-muted-foreground mb-3">
              {post.summary}
            </div>
          )}
          {/* Featured Image */}
          {post.imageUrl && (
            <div className="mb-4 rounded-md overflow-hidden max-h-40 aspect-[16/5] flex items-center justify-center">
              <Image src={post.imageUrl} alt={post.title} width={900} height={120} className="w-full h-full object-cover" />
            </div>
          )}
          {/* Blog Content */}
          <article className="prose prose-neutral dark:prose-invert max-w-none text-sm sm:text-base">
            {/* @ts-ignore */}
            <MDXRemote source={post.content} />
          </article>
        </div>
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-6 lg:self-start lg:border-l border-muted/30 pl-0 lg:pl-8 flex flex-col gap-3 w-full max-w-[320px] mx-auto mt-20 lg:mt-2">
          {/* Written By */}
          <Card className="border-emerald-400/40 bg-background/80 backdrop-blur shadow-sm rounded-xl p-0">
            <CardHeader className="py-3 px-4 border-b border-emerald-100 bg-transparent">
              <CardTitle className="uppercase tracking-wider text-xs font-semibold text-emerald-500 mb-2">Written By</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2 py-3 px-4">
              {post.authorAvatar && (
                <Image src={post.authorAvatar} alt={post.author} width={48} height={48} className="rounded-full border border-emerald-300 mx-auto" />
              )}
              <div className="text-center">
                <div className="font-semibold text-sm">{post.author}</div>
                {post.authorHandle && <div className="text-emerald-500 text-xs">{post.authorHandle}</div>}
              </div>
            </CardContent>
          </Card>
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <Card className="border-emerald-400/40 bg-background/80 backdrop-blur shadow-sm rounded-xl p-0">
              <CardHeader className="py-3 px-4 border-b border-emerald-100 bg-transparent">
                <CardTitle className="uppercase tracking-wider text-xs font-semibold text-emerald-500 mb-2">Tags</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1 py-3 px-4">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">{tag}</Badge>
                ))}
              </CardContent>
            </Card>
          )}
          {/* Share Post */}
          <Card className="border-emerald-400/40 bg-background/80 backdrop-blur shadow-sm rounded-xl p-0">
            <CardHeader className="py-3 px-4 border-b border-emerald-100 bg-transparent">
              <CardTitle className="uppercase tracking-wider text-xs font-semibold text-emerald-500 mb-2">Share Post</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 py-3 px-4 justify-center">
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL + '/blog/' + post.slug)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" className="hover:text-emerald-500 text-base"><Twitter size={16} /></a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL + '/blog/' + post.slug)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="hover:text-emerald-500 text-base"><Linkedin size={16} /></a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL + '/blog/' + post.slug)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="hover:text-emerald-500 text-base"><Facebook size={16} /></a>
              <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + process.env.NEXT_PUBLIC_SITE_URL + '/blog/' + post.slug)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className="hover:text-emerald-500 text-base"><MessageSquare size={16} /></a>
            </CardContent>
          </Card>
          {/* Explore More */}
          {randomPosts.length > 0 && (
            <Card className="border-emerald-500 bg-muted/60 shadow-sm rounded-xl p-0">
              <CardHeader className="py-2 px-3 border-b border-emerald-100 bg-transparent">
                <CardTitle className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Explore More</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 py-2 px-3">
                {randomPosts.map((p: any) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="flex items-center gap-2 group hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md px-1.5 py-1 transition-colors">
                    {p.imageUrl && (
                      <Image src={p.imageUrl} alt={p.title} width={32} height={22} className="rounded-md object-cover border w-8 h-5" />
                    )}
                    <div>
                      <div className="font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-xs line-clamp-2">{p.title}</div>
                      <div className="text-[10px] text-muted-foreground">{p.date ? format(new Date(p.date), 'MMM d, yyyy') : ''}</div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
} 