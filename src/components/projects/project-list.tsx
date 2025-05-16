import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";
import { ProjectCard } from "./project-card";

export function ProjectList() {
  const projects: Project[] = projectsData;

  if (!projects || projects.length === 0) {
    return <p className="text-center text-muted-foreground">No projects to display yet. Check back soon!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
} 