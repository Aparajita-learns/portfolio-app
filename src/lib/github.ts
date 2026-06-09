const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'Aparajita-learns';
const GITHUB_REPO = process.env.GITHUB_REPO || 'portfolio-app';
const FILE_PATH = 'data/projects.json';

const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;

// Fetch current file content and SHA from GitHub
export async function getProjectsFile(): Promise<{ sha: string; projects: any[] }> {
  const response = await fetch(GITHUB_API_BASE, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const decoded = Buffer.from(data.content, 'base64').toString('utf-8');
  return {
    sha: data.sha,
    projects: JSON.parse(decoded),
  };
}

// Write updated projects array back to GitHub (triggers Vercel rebuild)
export async function updateProjectsFile(projects: any[], commitMessage: string): Promise<void> {
  const { sha } = await getProjectsFile();
  const encoded = Buffer.from(JSON.stringify(projects, null, 2)).toString('base64');

  const response = await fetch(GITHUB_API_BASE, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: commitMessage,
      content: encoded,
      sha,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`GitHub write error: ${err.message}`);
  }
}
