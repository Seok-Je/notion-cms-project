/**
 * API Route: GET /api/projects
 * 모든 published 프로젝트 반환
 */

import { getPublishedProjects } from '@/lib/notion/queries';

export async function GET() {
  try {
    const projects = await getPublishedProjects();

    return Response.json(
      {
        success: true,
        projects,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching projects:', error);

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
