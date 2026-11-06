import { cookies } from 'next/headers';
import { searchDatabasePages } from '@/lib/notion/queries';
import { verifyCookie, COOKIE_CONFIG } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(COOKIE_CONFIG.name);

    if (!authCookie?.value || !verifyCookie(authCookie.value)) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await searchDatabasePages();
    return Response.json(projects);
  } catch (error) {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
