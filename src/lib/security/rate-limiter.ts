/**
 * In-memory sliding-window rate limiter for development and single-instance
 * production. Multi-region / serverless deployments should swap the store
 * behind `RATE_LIMIT_BACKEND=redis` (Upstash) before going live — see the
 * `RATE_LIMIT_*` entries in `.env.example`.
 *
 * Limits are read from env at first call so the same value drives both the
 * public endpoints and any admin tools that need to introspect them.
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

/** Periodic prune so the map does not grow without bound on a long-lived server. */
let pruneScheduled = false;
function schedulePrune(): void {
  if (pruneScheduled) return;
  pruneScheduled = true;
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore) {
      if (now > record.resetTime) rateLimitStore.delete(key);
    }
  }, 60_000);
  // Do not keep a Node process alive just for this timer.
  if (typeof timer === "object" && timer && "unref" in timer) {
    (timer as { unref?: () => void }).unref?.();
  }
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
  /** How long (ms) the caller should wait before their next attempt. */
  retryAfterMs: number;
}

export function checkRateLimit(
  identifier: string,
  limit?: number,
  windowSeconds?: number,
): RateLimitResult {
  schedulePrune();

  const effectiveLimit = limit ?? (Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 10);
  const effectiveWindow =
    windowSeconds ?? (Number(process.env.RATE_LIMIT_WINDOW_SECONDS) || 60);

  const now = Date.now();
  const windowMs = effectiveWindow * 1000;
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    const reset = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime: reset });
    return { success: true, remaining: effectiveLimit - 1, reset, retryAfterMs: 0 };
  }

  if (record.count >= effectiveLimit) {
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
    remaining: effectiveLimit - record.count,
    reset: record.resetTime,
    retryAfterMs: 0,
  };
}

/** Standard headers to include on responses so clients can back off politely. */
export function rateLimitHeaders(result: RateLimitResult, limit?: number): HeadersInit {
  const effectiveLimit = limit ?? (Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 10);
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
