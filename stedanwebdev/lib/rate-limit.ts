/**
 * Small in-memory rate limiter.
 *
 * Honest about what this is: on serverless it lives per instance and resets on
 * cold start, so it slows casual abuse rather than guaranteeing a ceiling. The
 * real guarantee is the spend cap set on the API account itself — set that, and
 * treat this as the first line rather than the only one.
 *
 * If the site ever gets real traffic, swap the Map for Vercel KV or Upstash and
 * the rest of this file stays the same.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const DAY = 24 * 60 * 60 * 1000;

function hit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const b = buckets.get(key);

  if (!b || now > b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (b.count >= limit) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count += 1;
  return { ok: true, remaining: limit - b.count };
}

export const perIpDaily = (ip: string, limit: number) => hit(`ip:${ip}`, limit, DAY);
export const globalDaily = (limit: number) => hit("global", limit, DAY);

/** Keeps the Map from growing without bound on a long-lived instance. */
export function sweep() {
  const now = Date.now();
  for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
}
