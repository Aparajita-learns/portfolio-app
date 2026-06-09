"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/lib/firebaseUtils";
import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface ProjectsGalleryProps {
  limit?: number;
}

export default function ProjectsGallery({ limit }: ProjectsGalleryProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(limit ? data.slice(0, limit) : data);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects. Ensure Firebase keys are configured.");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [limit]);

  if (loading) {
    return (
      <div className="py-12 flex justify-center items-center text-(--color-ink)/50">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-center bg-(--color-cream-dark) rounded-2xl border border-red-500/20 border-dashed">
        <p className="opacity-60 mb-4 text-red-600">{error}</p>
        <Link href="/admin" className="text-(--color-accent) hover:underline font-medium">Go to Admin Panel</Link>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="p-12 text-center bg-(--color-cream-dark) rounded-2xl border border-(--color-ink)/10 border-dashed">
        <p className="opacity-60 mb-4">No projects found. Add your first project!</p>
        <Link href="/admin" className="text-(--color-accent) hover:underline font-medium">Go to Admin Panel</Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id!}
          title={project.title}
          description={project.description}
          tags={project.tags}
          imageUrl={project.imageUrl}
          metrics={project.metrics}
          pdfUrl={project.pdfUrl}
          externalLink={project.externalLink}
        />
      ))}
    </div>
  );
}
