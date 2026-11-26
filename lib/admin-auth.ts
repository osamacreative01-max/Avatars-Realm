import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

/**
 * Password gate for the /admin enquiries dashboard.
 *
 * One shared password, set in ADMIN_PASSWORD. Signing in stores an httpOnly
 * cookie holding an HMAC derived from that password, so changing the password
 * signs everyone out. No ADMIN_PASSWORD means the dashboard stays locked.
 */

export const ADMIN_COOKIE = "ar_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // one week

function expectedToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHmac("sha256", password)
    .update("avatars-realm-admin-v1")
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function passwordMatches(candidate: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(password) && safeEqual(candidate, password as string);
}

export async function isAdmin(): Promise<boolean> {
  const token = expectedToken();
  if (!token) return false;
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(cookie) && safeEqual(cookie as string, token);
}

export async function startAdminSession(): Promise<void> {
  const token = expectedToken();
  if (!token) return;
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endAdminSession(): Promise<void> {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
}
