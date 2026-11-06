import { cookies } from 'next/headers';
import { verifyCookie, COOKIE_CONFIG } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(COOKIE_CONFIG.name);

    if (!authCookie?.value || !verifyCookie(authCookie.value)) {
      return Response.json({ authenticated: false }, { status: 401 });
    }

    return Response.json({ authenticated: true });
  } catch (error) {
    return Response.json({ authenticated: false }, { status: 401 });
  }
}
