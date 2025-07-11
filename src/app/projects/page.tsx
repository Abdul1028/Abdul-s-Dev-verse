import { ProjectList } from "@/components/projects/project-list";

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-4 py-8 lg:py-12">
      <div className="text-center mb-10 lg:mb-12">
        <p className="mt-4 text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          A collection of my work, experiments, and things I'm passionate about building.
        </p>
      </div>
      <ProjectList />
    </main>
  );
}   