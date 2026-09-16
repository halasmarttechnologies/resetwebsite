import { NextRequest } from "next/server";
import { ok, fail, methodNotAllowed } from "@/lib/api/response";
import { siteConfig } from "@/config/site";
import {
  checkRateLimit,
  rateLimitHeaders,
  RateLimits,
} from "@/lib/security/rate-limiter";
import { resolveClientIp } from "@/lib/api/request-utils";

/**
 * Liveness/readiness probe. Kept intentionally cheap — no DB, no CMS,
 * no third-party calls. Rate-limited per IP so an attacker cannot use
 * a public probe to spin up uncontrolled load.
 */
export function GET(req: NextRequest) {
  const ip = resolveClientIp(req);
  const rl = checkRateLimit(
    `health:${ip}`,
    RateLimits.health.limit,
    RateLimits.health.windowSeconds,
  );
  if (!rl.success) {
    return fail(429, {
      code: "RATE_LIMITED",
      message: "Too many requests.",
      headers: rateLimitHeaders(rl, RateLimits.health.limit),
    });
  }
  return ok(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: siteConfig.name,
    },
    {
      message: "healthy",
      headers: rateLimitHeaders(rl, RateLimits.health.limit),
    },
  );
}

export function POST() {
  return methodNotAllowed(["GET"]);
}
export const PUT = POST;
export const PATCH = POST;
export const DELETE = POST;
