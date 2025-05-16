'use client';

import Image from "next/image";
import Link from "next/link";
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  isLink?: boolean;
}

export function ProjectCard({ project, isLink = true }: ProjectCardProps) {
  // Helper to get YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = project.videoUrl ? getYouTubeVideoId(project.videoUrl) : null;

  const CardWrapper = ({ children }: { children: React.ReactNode }) => 
    isLink ? (
      <Link href={`/projects/${project.id}`} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
        {children}
      </Link>
    ) : (
      <>{children}</>
    );

  return (
    <CardWrapper>
      <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out group">
        {/* Image or Video - Now Square */}
        <div className="w-full overflow-hidden">
          <AspectRatio.Root ratio={1 / 1} className="bg-muted rounded-t-lg">
            {videoId ? (
              <iframe
                className="w-full h-full object-cover"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=${videoId}`}
                title={`YouTube video player for ${project.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            ) : project.images && project.images.length > 0 && (
              <Image
                src={project.images[0]}
                alt={`Cover image for ${project.title}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" // Adjusted sizes
              />
            )}
          </AspectRatio.Root>
        </div>

        <div className="flex flex-col flex-grow p-3 space-y-1.5"> {/* Reduced padding and space */}
          <CardHeader className="p-0">
            {/* If card is a link, title shouldn't be a link itself. But for styling, keep similar structure */}
            <CardTitle className="text-base font-semibold line-clamp-1">{project.title}</CardTitle>
          </CardHeader>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5"> {/* Reduced pt */}
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  +{project.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          <CardContent className="p-0 flex-grow">
            <CardDescription className="text-xs text-muted-foreground line-clamp-2">
              {project.description}
            </CardDescription>
          </CardContent>

          <CardFooter className="p-0 pt-1.5 flex flex-wrap gap-2 justify-start"> {/* Reduced pt */}
            {project.liveUrl && (
              <Button 
                size="sm" 
                className="text-xs px-2.5 py-1 h-auto z-10"
                onClick={(e) => {
                  if (isLink) e.stopPropagation();
                  window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                }}
              >
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Live
              </Button>
            )}
            {project.repoUrl && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs px-2.5 py-1 h-auto z-10"
                onClick={(e) => {
                  if (isLink) e.stopPropagation();
                  window.open(project.repoUrl, '_blank', 'noopener,noreferrer');
                }}
              >
                <Github className="mr-1.5 h-3.5 w-3.5" /> GitHub
              </Button>
            )}
          </CardFooter>
        </div>
      </Card>
    </CardWrapper>
  );
} 