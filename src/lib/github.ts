const GITHUB_OWNER = process.env.GITHUB_OWNER || 'Aparajita-learns';
const GITHUB_REPO = process.env.GITHUB_REPO || 'portfolio-app';
const FILE_PATH = 'data/projects.json';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;

function getGithubToken(): string {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      'GITHUB_TOKEN is not set. Add a GitHub Personal Access Token with Contents: Read & Write access in Vercel Environment Variables.'
    );
  }
  return token;
}

function githubHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${getGithubToken()}`,
    Accept: 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

function formatGithubError(status: number, message?: string): string {
  if (status === 401) {
    return 'GitHub rejected the token (401). Check that GITHUB_TOKEN is valid and not expired.';
  }
  if (status === 403) {
    return message?.includes('Resource not accessible')
      ? 'GitHub token lacks write permission. Create a PAT with Contents: Read & Write for this repository.'
      : `GitHub denied access (403): ${message ?? 'forbidden'}`;
  }
  if (status === 404) {
    return `GitHub could not find ${GITHUB_OWNER}/${GITHUB_REPO}/${FILE_PATH}. Check GITHUB_OWNER and GITHUB_REPO env vars.`;
  }
  return `GitHub API error (${status}): ${message ?? 'unknown error'}`;
}

// Fetch current file content and SHA from GitHub
export async function getProjectsFile(): Promise<{ sha: string; projects: any[] }> {
  const response = await fetch(`${GITHUB_API_BASE}?ref=${GITHUB_BRANCH}`, {
    headers: githubHeaders(),
    cache: 'no-store',
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(formatGithubError(response.status, err.message));
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
      ...githubHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: commitMessage,
      content: encoded,
      sha,
      branch: GITHUB_BRANCH,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(formatGithubError(response.status, err.message));
  }
}
