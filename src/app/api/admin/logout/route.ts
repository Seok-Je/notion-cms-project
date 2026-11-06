import { cookies } from 'next/headers';
import { COOKIE_CONFIG } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_CONFIG.name);
  redirect('/admin');
}
