import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "tfl_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

/**
 * Session token = "<issuedAt>.<hmac>" where hmac is keyed by ADMIN_PASSWORD.
 * Verifying is therefore stateless: no session store, and rotating
 * ADMIN_PASSWORD invalidates every existing cookie immediately.
 */
function secret(): string {
  return process.env.ADMIN_PASSWORD || "";
}

function sign(issuedAt: number): string {
  return createHmac("sha256", secret()).update(String(issuedAt)).digest("hex");
}

export function adminPasswordConfigured(): boolean {
  return secret().length > 0;
}

/** Constant-time password check. */
export function verifyPassword(candidate: string): boolean {
  const expected = secret();
  if (!expected) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    // Still burn a comparison so length mismatches aren't obviously faster.
    timingSafeEqual(b, b);
    return false;
  }
  return timingSafeEqual(a, b);
}

export function isAdmin(): boolean {
  const expected = secret();
  if (!expected) return false;
  const raw = cookies().get(ADMIN_COOKIE)?.value;
  if (!raw) return false;

  const [issuedAtRaw, token] = raw.split(".");
  const issuedAt = Number(issuedAtRaw);
  if (!Number.isFinite(issuedAt) || !token) return false;

  const ageMs = Date.now() - issuedAt * 1000;
  if (ageMs < 0 || ageMs > MAX_AGE_SECONDS * 1000) return false;

  const expectedToken = sign(issuedAt);
  const a = Buffer.from(token);
  const b = Buffer.from(expectedToken);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createAdminSession(): string {
  const issuedAt = Math.floor(Date.now() / 1000);
  return `${issuedAt}.${sign(issuedAt)}.${randomBytes(8).toString("hex")}`;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}