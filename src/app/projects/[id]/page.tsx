// 'use client'; // Removed: This page is now a Server Component

import Link from 'next/link';
// Image is no longer directly used here, it's in ProjectDetailContent
import { notFound } from 'next/navigation';
import projectsData from '@/data/projects.json';
import { Project } from '@/types/project';
// Badge, Button, Lucide Icons, AspectRatio are moved to ProjectDetailContent
import { ArrowLeft } from 'lucide-react'; // Keep ArrowLeft for the back link
import ProjectDetailContent from '@/components/projects/project-detail-content'; // Import the new client component

// Find project by ID from the local JSON data - stays here
function getProjectById(id: string): Project | undefined {
  return projectsData.find((p) => p.id === id);
}

// Generate static paths for each project - stays here
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

interface ProjectDetailPageProps {
  params: { id: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound(); // Show 404 if project not found
  }

  // The getYouTubeVideoId function and videoId logic are moved to ProjectDetailContent

  return (
    <main className="container mx-auto px-4 py-8 lg:py-12">
      <div className="mb-8">
        <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </div>
      {/* Render the client component with the project data */}
      <ProjectDetailContent project={project} />
    </main>
  );
} 