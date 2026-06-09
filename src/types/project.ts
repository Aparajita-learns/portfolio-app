export interface Project {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  pdfUrl?: string;
  externalLink?: string;
  metrics?: string;
  createdAt: number;
}
