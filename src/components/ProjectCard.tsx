"use client";
import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
  metrics?: string;
  pdfUrl?: string;
  externalLink?: string;
}

export default function ProjectCard({ id, title, description, tags, imageUrl, metrics, pdfUrl, externalLink }: ProjectCardProps) {
  // Determine where the card links to - use detail page if id exists, otherwise external link
  const href = id ? `/work/${id}` : (pdfUrl || externalLink || "#");
  const isExternal = !id && !!(pdfUrl || externalLink);

  return (
    <Link href={href} target={isExternal ? "_blank" : "_self"} rel={isExternal ? "noopener noreferrer" : ""} className="block group">
      <article className="rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-(--color-ink)/10 border border-(--color-ink)/5 bg-(--color-cream-dark)">
        {/* Image Placeholder */}
        <div className="relative aspect-[16/9] overflow-hidden bg-(--color-ink)/5 flex items-center justify-center">
          <ImageWithFallback src={imageUrl} alt={title} />
        </div>
        
        {/* Content */}
        <div className="px-7 py-6 relative">
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="bg-(--color-ink)/5 text-(--color-ink)/70 rounded-full px-2.5 py-0.5 text-[10px] tracking-wide uppercase font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <h3 className="font-serif text-2xl leading-snug mb-2 group-hover:text-(--color-accent) transition-colors">{title}</h3>
          <p className="text-sm opacity-80 leading-relaxed mb-4 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between pt-4 border-t border-(--color-ink)/10">
            <span className="text-sm font-medium text-(--color-accent-dark)">{metrics || (id ? "View Project" : "")}</span>
            <span className="text-xs font-bold opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-(--color-accent) transition-all duration-300 flex items-center gap-1">
              {pdfUrl ? <><FileText size={14} /> Read the document</> : <><ExternalLink size={14} /> View Link</>}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
