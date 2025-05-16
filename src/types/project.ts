export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  liveUrl?: string;
  repoUrl?: string;
  tags?: string[];
  videoUrl?: string;
} 