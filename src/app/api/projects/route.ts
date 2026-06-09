import { NextRequest, NextResponse } from 'next/server';
import { getProjectsFile, updateProjectsFile } from '@/lib/github';
import { Project } from '@/types/project';

// GET — read all projects from GitHub
export async function GET() {
  try {
    const { projects } = await getProjectsFile();
    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST — add a new project (protected by ADMIN_TOKEN)
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const newProject: Project = {
      ...body,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };

    const { projects } = await getProjectsFile();
    projects.unshift(newProject); // newest first

    await updateProjectsFile(projects, `feat: add project "${newProject.title}"`);

    return NextResponse.json({ success: true, id: newProject.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}
