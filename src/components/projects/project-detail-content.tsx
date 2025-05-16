'use client';

import Link from 'next/link';
import Image from 'next/image';
// Removed notFound as it should be handled by the page component
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowLeft, PlayCircle } from 'lucide-react';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

interface ProjectDetailContentProps {
  project: Project;
}

export default function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  // getYouTubeVideoId function can remain here or be moved to a utils file
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = project.videoUrl ? getYouTubeVideoId(project.videoUrl) : null;

  // The main article content starts here, previously was in ProjectDetailPage
  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{project.title}</h1>
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
      </header>

      {/* Image Gallery / Video Section */}
      <section className="mb-8">
        {videoId ? (
          <div className="w-full bg-black rounded-lg overflow-hidden shadow-xl">
            <AspectRatio.Root ratio={16 / 9}>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1&mute=1`}
                title={`YouTube video player for ${project.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </AspectRatio.Root>
          </div>
        ) : project.images && project.images.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {project.images.map((imageSrc, index) => (
              <div key={index} className="w-full rounded-lg overflow-hidden shadow-lg bg-muted">
                <AspectRatio.Root ratio={16 / 9}>
                  <Image 
                    src={imageSrc} 
                    alt={`${project.title} - image ${index + 1}`} 
                    fill 
                    className="object-contain" 
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                </AspectRatio.Root>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none mb-8">
        <p>{project.description}</p>
      </section>

      <section className="flex flex-wrap gap-3 items-center">
        {project.liveUrl && (
          <Button asChild size="lg">
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-5 w-5" /> Visit Live Site
            </Link>
          </Button>
        )}
        {project.repoUrl && (
          <Button asChild variant="secondary" size="lg">
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" /> View Repository
            </Link>
          </Button>
        )}
        {project.videoUrl && !videoId && (
          <Button asChild variant="outline" size="lg">
            <Link href={project.videoUrl} target="_blank" rel="noopener noreferrer">
              <PlayCircle className="mr-2 h-5 w-5" /> Watch Video
            </Link>
          </Button>
        )}
      </section>
    </article>
  );
} 