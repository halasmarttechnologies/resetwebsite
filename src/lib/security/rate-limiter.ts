/**
 * Rate limiter.
 *
 * Two backends are supported behind the same public API:
 *
 *   • Upstash Redis (recommended for production). Enabled automatically
 *     when both `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
 *     are configured. Uses a fixed-window `INCR` + `EXPIRE` pattern via
 *     the Upstash REST API — no client library, one round-trip per
 *     check, works on Vercel's Edge runtime.
 *
 *   • In-memory sliding window. Automatic fallback when no Redis is
 *     configured. Safe for a single-instance deployment; on serverless,
 *     each cold start has its own map, so limits become per-instance
 *     rather than global. Documented tradeoff — good enough for a
 *     marketing site, replace with Redis before opening auth endpoints.
 *
 * The Redis path fails open (i.e. the request is allowed through) if the
 * REST call errors, so a transient Redis outage cannot take the site
 * down. All failures are logged.
 */

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const REDIS_ENABLED = Boolean(REDIS_URL && REDIS_TOKEN);

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

function pruneExpired(now: number): void {
  // Prune expired entries periodically to keep memory bounded without background timers
  if (rateLimitStore.size > 200) {
    for (const [key, record] of rateLimitStore) {
      if (now > record.resetTime) rateLimitStore.delete(key);
    }
  }
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
  retryAfterMs: number;
}

function memoryCheck(
  identifier: string,
  limit: number,
  windowSeconds: number,
): RateLimitResult {
  const now = Date.now();
  pruneExpired(now);
  const windowMs = windowSeconds * 1000;
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    const reset = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime: reset });
    return { success: true, remaining: limit - 1, reset, retryAfterMs: 0 };
  }
  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      reset: record.resetTime,
      retryAfterMs: record.resetTime - now,
    };
  }
  record.count += 1;
  return {
    success: true,
    remaining: limit - record.count,
    reset: record.resetTime,
    retryAfterMs: 0,
  };
}

async function redisCheck(
  identifier: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult | null> {
  if (!REDIS_ENABLED) return null;
  const key = `rl:${identifier}`;
  const now = Date.now();
  try {
    // Pipelined INCR + EXPIRE. Upstash returns [count, expireResult].
    const res = await fetch(`${REDIS_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(windowSeconds), "NX"],
        ["PTTL", key],
      ]),
      // Fail open quickly if Redis is unreachable.
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as Array<{ result: unknown; error?: string }>;
    const count = Number(body[0]?.result);
    const pttl = Number(body[2]?.result);
    if (!Number.isFinite(count)) return null;
    const resetTime = now + (Number.isFinite(pttl) && pttl > 0 ? pttl : windowSeconds * 1000);
    if (count > limit) {
      return {
        success: false,
        remaining: 0,
        reset: resetTime,
        retryAfterMs: resetTime - now,
      };
    }
    return {
      success: true,
      remaining: Math.max(0, limit - count),
      reset: resetTime,
      retryAfterMs: 0,
    };
  } catch {
    // Fail open on any transport error — logging is the caller's job.
    return null;
  }
}

/**
 * Synchronous rate-limit check with the in-memory backend. Callers that
 * cannot await (edge middleware fast path, hot inner loops) should keep
 * using this. Async callers should prefer `checkRateLimitAsync` so the
 * Upstash backend is exercised when configured.
 */
export function checkRateLimit(
  identifier: string,
  limit?: number,
  windowSeconds?: number,
): RateLimitResult {
  const effectiveLimit =
    limit ?? (Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 10);
  const effectiveWindow =
    windowSeconds ?? (Number(process.env.RATE_LIMIT_WINDOW_SECONDS) || 60);
  return memoryCheck(identifier, effectiveLimit, effectiveWindow);
}

/**
 * Async rate-limit check. Uses Upstash Redis when configured (shared
 * state across serverless instances) and falls back transparently to
 * the in-memory backend on any Redis error.
 */
export async function checkRateLimitAsync(
  identifier: string,
  limit?: number,
  windowSeconds?: number,
): Promise<RateLimitResult> {
  const effectiveLimit =
    limit ?? (Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 10);
  const effectiveWindow =
    windowSeconds ?? (Number(process.env.RATE_LIMIT_WINDOW_SECONDS) || 60);
  const redisResult = await redisCheck(identifier, effectiveLimit, effectiveWindow);
  if (redisResult) return redisResult;
  return memoryCheck(identifier, effectiveLimit, effectiveWindow);
}

/** Standard headers so clients can back off politely. */
export function rateLimitHeaders(
  result: RateLimitResult,
  limit?: number,
): HeadersInit {
  const effectiveLimit =
    limit ?? (Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 10);
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(effectiveLimit),
    "X-RateLimit-Remaining": String(Math.max(0, result.remaining)),
    "X-RateLimit-Reset": String(Math.ceil(result.reset / 1000)),
  };
  if (!result.success) {
    headers["Retry-After"] = String(Math.ceil(result.retryAfterMs / 1000));
  }
  return headers;
}

/**
 * Central rate-limit budget table. Each endpoint category has an
 * appropriate limit rather than a single number used everywhere.
 * Callers pull these constants so limits can be audited in one place.
 */
export const RateLimits = {
  // Marketing forms — humans fill these; anything above ~5/min is a bot.
  contact: { limit: 5, windowSeconds: 60 },
  // Booking is even more sensitive (WhatsApp deep-link + logging).
  booking: { limit: 5, windowSeconds: 60 },
  // Newsletter / lightweight signups.
  newsletter: { limit: 10, windowSeconds: 60 },
  // Health probe — allow generous but not unlimited.
  health: { limit: 60, windowSeconds: 60 },
  // CSP report sink — browsers batch, so a burst is normal.
  cspReport: { limit: 30, windowSeconds: 60 },
  // If auth is ever wired up, use these:
  authLogin: { limit: 5, windowSeconds: 300 },
  authOtp: { limit: 3, windowSeconds: 300 },
  passwordReset: { limit: 3, windowSeconds: 900 },
} as const;
