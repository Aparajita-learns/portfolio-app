import { notFound } from "next/navigation";
import { Project } from "@/types/project";
import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

function getProject(id: string): Project | null {
  try {
    const __dirname = fileURLToPath(new URL(".", import.meta.url));
    const filePath = require("path").join(__dirname, "..", "..", "..", "..", "data", "projects.json");
    const content = readFileSync(filePath, "utf-8");
    const projects: Project[] = JSON.parse(content);
    return projects.find((p) => p.id === id) || null;
  } catch {
    return null;
  }
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 pt-20 pb-12">
      <Link href="/work" className="text-sm text-(--color-accent) hover:underline mb-6 inline-block">
        &larr; Back to Work
      </Link>

      <article className="bg-(--color-cream-dark) rounded-2xl border border-(--color-ink)/10 overflow-hidden">
        <div className="w-full h-64 bg-(--color-ink)/5 flex items-center justify-center">
          <ImageWithFallback
            src={project.imageUrl}
            alt={project.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="p-8">
          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-(--color-ink)/5 text-(--color-ink)/70 rounded-full px-3 py-1 text-xs tracking-wide uppercase font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-serif text-4xl mb-4">{project.title}</h1>

          {project.metrics && (
            <p className="text-(--color-accent-dark) font-medium mb-6">{project.metrics}</p>
          )}

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-base opacity-80 leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          {/* Links */}
          {(project.pdfUrl || project.externalLink) && (
            <div className="flex gap-4 pt-6 border-t border-(--color-ink)/10">
              {project.pdfUrl && (
                <a
                  href={project.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-(--color-accent) hover:underline font-medium"
                >
                  Read the document
                </a>
              )}
              {project.externalLink && (
                <a
                  href={project.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-(--color-accent) hover:underline font-medium"
                >
                  View Project Link
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
