import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
const key = () => new TextEncoder().encode(process.env.JWT_SECRET);
export async function setSession(u) {
  const t = await new SignJWT({ id: u.id, email: u.email }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('30d').sign(key());
  (await cookies()).set('s', t, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 2592000 });
}
export async function getUser() {
  try { const t = (await cookies()).get('s')?.value; if (!t) return null; return (await jwtVerify(t, key())).payload; } catch { return null; }
}
export const isAdmin = (u) => !!u && u.email === process.env.ADMIN_EMAIL?.toLowerCase().trim();
