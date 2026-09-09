import { ok, methodNotAllowed } from "@/lib/api/response";
import { siteConfig } from "@/config/site";

/**
 * Liveness/readiness probe. Kept intentionally cheap — no DB, no CMS,
 * no third-party calls. Uptime monitors and platform health checks hit
 * this every few seconds; anything expensive here would inflate cost.
 */
export function GET() {
  return ok(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: siteConfig.name,
    },
    { message: "healthy" },
  );
}

export function POST() {
  return methodNotAllowed(["GET"]);
}
export const PUT = POST;
export const PATCH = POST;
export const DELETE = POST;
