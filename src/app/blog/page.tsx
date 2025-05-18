import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Rss, Tag } from 'lucide-react';
import { getAllPosts, PostFrontmatter } from '@/lib/blog'; // Import your actual data fetching logic
import { format } from 'date-fns'; // For formatting dates if needed

// Function to calculate an estimated read time (simple version)
function calculateReadTime(content: string = ''): string {
  if (!content) return '3 min'; // Default if no content
  const wordsPerMinute = 200;
  const textLength = content.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(textLength / wordsPerMinute);
  return `${readTimeMinutes} min read`;
}

export default async function BlogPage() {
  const posts: PostFrontmatter[] = await getAllPosts();

  // Dynamically generate filterTags from all unique tags in posts
  const allTags = posts.reduce((acc: string[], post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => {
        if (!acc.includes(tag)) {
          acc.push(tag);
        }
      });
    }
    return acc;
  }, []);
  const filterTags = allTags.slice(0, 5); // Show a limited number of prominent tags, or all of them

  return (
    <main className="container mx-auto px-4 py-12 sm:py-16 md:py-20 min-h-screen text-slate-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <section className="mb-12 md:mb-16 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            Welcome to my blog domain where I share personal stories about things I've learned, 
            projects I'm hacking on and just general findings. I also write for other publications.
          </p>
          {filterTags.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
              {filterTags.map(tag => (
                <Badge key={tag} variant="outline" className="text-sm px-3 py-1 border-emerald-500/70 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400/70 hover:bg-emerald-500/10 cursor-pointer">
                  <Tag className="w-3.5 h-3.5 mr-1.5 opacity-80" /> {tag}
                </Badge>
              ))}
            </div>
          )}
        </section>

        {/* Blog Posts Section */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8 flex items-center">
            <Rss className="w-6 h-6 mr-3 text-emerald-500 dark:text-emerald-400" />
            Explore All
          </h2>
          {posts.length === 0 ? (
            <p className="text-center text-lg text-slate-500 dark:text-slate-400 py-10">
              No blog posts found yet. Please check back later!
            </p>
          ) : (
            <div className="grid gap-8 md:gap-10 lg:gap-12">
              {posts.map((post) => {
                const displayDate = post.date ? format(new Date(post.date), 'MMM d, yyyy') : 'Date unavailable';
                const readTime = post.readTime || calculateReadTime(post.content || ''); // Use frontmatter readTime or calculate
                const excerpt = post.summary || post.excerpt || 'No summary available.';
                const imageUrl = post.imageUrl || '/placeholder-images/default-blog-banner.png'; // Fallback image

                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} passHref>
                    <Card className="group grid md:grid-cols-12 gap-0 md:gap-6 lg:gap-8 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-card hover:bg-card/90 dark:hover:bg-card/95 border border-border/60">
                      {/* Image Column */}
                      <div className="md:col-span-5 relative aspect-video md:aspect-[5/4]">
                        <Image
                          src={imageUrl}
                          alt={`Banner for ${post.title}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
                          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                      </div>
                      
                      {/* Content Column */}
                      <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-center">
                        <CardHeader className="p-0 mb-3">
                          <CardTitle className="text-xl sm:text-2xl font-semibold leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 mb-4">
                          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                            {excerpt}
                          </p>
                        </CardContent>
                        <CardFooter className="p-0 flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                          <CalendarDays className="w-3.5 h-3.5 mr-1.5 opacity-80" /> {displayDate}
                          <span className="mx-2">·</span>
                          <Clock className="w-3.5 h-3.5 mr-1.5 opacity-80" /> {readTime}
                        </CardFooter>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
} 