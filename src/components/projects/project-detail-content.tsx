'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ExternalLink, Github, PlayCircle, ShieldCheck, ListChecks, BookOpen, Sparkles, Users, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

interface ProjectDetailContentProps {
  project: Project;
}

// Helper to extract features and how-to from description (for this project)
function extractSection(description: string, section: string): string[] {
  const regex = new RegExp(`${section}:(.*?)(?:\\n\\n|$)`, 'is');
  const match = description.match(regex);
  if (!match) return [];
  return match[1]
    .split('\n')
    .map((line) => line.replace(/^[-*] ?/, '').trim())
    .filter(Boolean);
}

export default function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  const videoId = project.videoUrl ? getYouTubeVideoId(project.videoUrl) : null;

  // Extract features and how-to sections for WhatsApp project
  const features = extractSection(project.description, 'Features');
  const howTo = extractSection(project.description, 'How to Export a WhatsApp Chat');
  const overview = project.description.split('Features:')[0].trim();
  const privacy = project.description.includes('All processing happens')
    ? 'All processing happens in your browser — no data is uploaded or stored anywhere.'
    : undefined;

  return (
    <article className="max-w-3xl mx-auto flex flex-col gap-8">
      {/* Title, Tags, and Action Buttons (Compact Row) */}
      <div className="mb-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-6 leading-tight">{project.title}</h1>
        {/* Action Buttons row below tags */}
        <div className="flex flex-wrap gap-2 items-center mt-1 mb-2">
          {project.liveUrl && (
            <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-4 w-4" /> Live Preview
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button asChild variant="secondary" size="sm">
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1.5 h-4 w-4" /> Browse Code
              </Link>
            </Button>
          )}
          {project.videoUrl && !videoId && (
            <Button asChild variant="outline" size="sm">
              <Link href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                <PlayCircle className="mr-1.5 h-4 w-4" /> Video
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Image or Video */}
      <Card className="overflow-hidden bg-muted/40 border-0 shadow-lg">
        <CardContent className="p-0">
          {videoId ? (
            <AspectRatio.Root ratio={16 / 9}>
              <iframe
                className="w-full h-full rounded-t-lg"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1&mute=1&controls=0`}
                title={`YouTube video player for ${project.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </AspectRatio.Root>
          ) : project.images && project.images.length > 0 && (
            <AspectRatio.Root ratio={16 / 9}>
              <Image
                src={project.images[0]}
                alt={`${project.title} cover`}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </AspectRatio.Root>
          )}
        </CardContent>
      </Card>

      {/* Overview */}
      <Card className="bg-background/80 border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="w-5 h-5 text-emerald-500" /> Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base text-muted-foreground leading-relaxed">{overview}</p>
        </CardContent>
      </Card>

      {/* Features */}
      {features.length > 0 && (
        <Card className="bg-background/80 border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><ListChecks className="w-5 h-5 text-emerald-500" /> Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-base text-muted-foreground">
              {features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Image Gallery Section */}
      {project.images && (
        <Card className="bg-background/80 border-0">
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.images.map((imageSrc, index) => (
                <AspectRatio.Root key={index} ratio={16 / 9}>
                  <Image
                    src={imageSrc}
                    alt={`${project.title} - image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                </AspectRatio.Root>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tech Stack */}
      {project.tags && (
        <Card className="bg-background/80 border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><BookOpen className="w-5 h-5 text-emerald-500" /> Tech Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs px-2 py-1 border-emerald-400/40">{tag}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Privacy */}
      {privacy && (
        <Card className="bg-background/80 border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><ShieldCheck className="w-5 h-5 text-emerald-500" /> Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-muted-foreground">{privacy}</p>
          </CardContent>
        </Card>
      )}

      {/* How to Use */}
      {howTo.length > 0 && (
        <Card className="bg-background/80 border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><ArrowRight className="w-5 h-5 text-emerald-500" /> How to Export a WhatsApp Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-base text-muted-foreground">
              {howTo.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </article>
  );
} 