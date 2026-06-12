import projectsRaw from '../../data/projects.json';
import { Project } from '@/types/project';

const projects = projectsRaw as Project[];

function normalizeImageUrl(imageUrl?: string) {
  if (!imageUrl) return imageUrl;

  if (imageUrl.startsWith('public/')) {
    return `/${imageUrl.slice('public/'.length)}`;
  }

  if (imageUrl.startsWith('/public/')) {
    return imageUrl.replace('/public/', '/');
  }

  return imageUrl;
}

function normalizeProject(project: Project): Project {
  return {
    ...project,
    imageUrl: normalizeImageUrl(project.imageUrl),
  };
}

export function getLocalProjects(): Project[] {
  return projects.map(normalizeProject);
}

export async function getProjects(): Promise<Project[]> {
  const githubOwner = process.env.GITHUB_OWNER || 'Aparajita-learns';
  const githubRepo = process.env.GITHUB_REPO || 'portfolio-app';
  const githubBranch = process.env.GITHUB_BRANCH || 'main';
  const rawUrl = `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/${githubBranch}/data/projects.json`;

  try {
    const response = await fetch(rawUrl, { cache: 'no-store' });

    if (!response.ok) {
      return getLocalProjects();
    }

    const data = (await response.json()) as Project[];
    return data.map(normalizeProject);
  } catch {
    return getLocalProjects();
  }
}
