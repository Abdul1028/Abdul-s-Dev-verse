import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';


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

  if (!post) {
    notFound();
  }

  // Validate date before attempting to format
  let formattedDate = 'Date not available';
  if (post.date) {
    try {
      formattedDate = format(new Date(post.date), 'MMMM d, yyyy');
    } catch (error) {
      console.error(`Error formatting date for post ${slug}: ${post.date}`, error);
      // formattedDate remains 'Date not available' or you can set another fallback
    }
  }

  // You can pass custom components to MDXRemote if you want to use them in your MDX files
  // const components = { /* Your custom components here */ };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-3xl">
      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      <article className="prose prose-quoteless prose-neutral dark:prose-invert lg:prose-lg max-w-none">
        <header className="mb-8 not-prose">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
            {post.title}
          </h1>
          <div className="text-base text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{formattedDate}</span>
            {post.author && <span>&bull; By {post.author}</span>}
          </div>
          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {(post.tags as string[]).map((tag: string) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </header>
        
        {/* @ts-ignore Server Component - MDXRemote can sometimes cause TS issues with async components */}
        <MDXRemote source={post.content} /* components={components} */ />
      </article>
    </div>
  );
} 