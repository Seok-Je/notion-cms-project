import { cookies } from 'next/headers';
import { createAuthCookie, COOKIE_CONFIG } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminToken = process.env.ADMIN_TOKEN;

    // 환경변수 미설정 또는 비밀번호 불일치
    if (!adminToken || password !== adminToken) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 쿠키 발급
    const cookieStore = await cookies();
    const authCookie = createAuthCookie();

    cookieStore.set(COOKIE_CONFIG.name, authCookie, COOKIE_CONFIG);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
