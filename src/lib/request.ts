/**
 * Best-effort client IP extraction.
 * `x-forwarded-for` is only trusted because the app is expected to sit behind a
 * proxy (Vercel/Netlify/nginx); leftmost entry is the original client.
 */
export function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip") || null;
}