import { getProjects } from '@/lib/projects';
import ProjectCard from './ProjectCard';
import Link from 'next/link';

interface Props {
  limit?: number;
}

export default async function ProjectsGallery({ limit }: Props) {
  const all = await getProjects();
  const projects = limit ? all.slice(0, limit) : all;

  if (projects.length === 0) {
    return (
      <div className="p-12 text-center bg-(--color-cream-dark) rounded-2xl border border-(--color-ink)/10 border-dashed">
        <p className="opacity-60 mb-4">No projects yet — add your first one!</p>
        <Link href="/admin" className="text-(--color-accent) hover:underline font-medium">
          Go to Admin Panel
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id!}
          title={project.title}
          description={project.description}
          tags={project.tags}
          imageUrl={project.imageUrl}
          pdfUrl={project.pdfUrl}
        />
      ))}
    </div>
  );
}
