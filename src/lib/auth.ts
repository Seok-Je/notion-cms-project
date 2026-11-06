import { createHmac } from 'crypto';

const HMAC_KEY = process.env.HMAC_KEY || 'default-key';
const COOKIE_NAME = 'admin_auth';

export function signToken(data: string): string {
  return createHmac('sha256', HMAC_KEY).update(data).digest('hex');
}

export function verifyCookie(value: string): boolean {
  const parts = value.split('.');
  if (parts.length !== 2) return false;

  const [data, signature] = parts;
  const expectedSignature = signToken(data);
  return signature === expectedSignature;
}

export function createAuthCookie(): string {
  const timestamp = Date.now().toString();
  const signature = signToken(timestamp);
  return `${timestamp}.${signature}`;
}

export const COOKIE_CONFIG = {
  name: COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
};
