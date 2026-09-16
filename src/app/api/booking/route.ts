import { NextRequest } from "next/server";
import { z } from "zod";
import {
  checkRateLimit,
  rateLimitHeaders,
  RateLimits,
} from "@/lib/security/rate-limiter";
import {
  resolveClientIp,
  readBoundedJsonText,
  sanitizeText,
  PayloadTooLargeError,
} from "@/lib/api/request-utils";
import { ok, fail, serverError, methodNotAllowed } from "@/lib/api/response";
import { logger, newRequestId } from "@/lib/logger";

/**
 * Booking intent endpoint.
 *
 * The current business flow lives on WhatsApp: this endpoint validates,
 * records the intent to server logs (durable through Vercel Logs), and
 * returns a prebuilt WhatsApp deep-link that the client opens. If the
 * business later swaps in a real booking backend, only this route needs
 * to change — the client contract stays the same.
 *
 * Duplicate submissions are absorbed via an idempotency key so a
 * double-tap on the "Book" button cannot produce two log entries or
 * two WhatsApp threads.
 */

const MAX_BODY_BYTES = 4 * 1024;

const bookingSchema = z.object({
  serviceSlug: z
    .string()
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(1, "Please choose a service")
        .max(80)
        .regex(/^[a-z0-9-]+$/i, "Invalid service reference"),
    ),
  preferredDate: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(1, "Please choose a date").max(40)),
  preferredTime: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(1, "Please choose a time").max(40)),
  customerName: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(2, "Please enter your name").max(100)),
  customerPhone: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(7, "Please provide a valid phone number").max(32)),
  customerEmail: z
    .union([
      z.literal(""),
      z
        .string()
        .transform((s) => s.trim().toLowerCase())
        .pipe(z.string().email("Please provide a valid email address").max(254)),
    ])
    .optional(),
  notes: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().max(1000))
    .optional(),
  channel: z.enum(["whatsapp", "online", "phone"]).default("whatsapp"),
  honeypot: z.string().max(0).optional().default(""),
});

/**
 * Dedupe recently-seen idempotency keys. Same in-memory caveats as the
 * rate limiter — swap for Redis when going multi-instance.
 */
const seenIdempotencyKeys = new Map<string, number>();
const IDEMPOTENCY_TTL_MS = 5 * 60 * 1000;

function rememberIdempotencyKey(key: string): boolean {
  const now = Date.now();
  for (const [k, ts] of seenIdempotencyKeys) {
    if (now - ts > IDEMPOTENCY_TTL_MS) seenIdempotencyKeys.delete(k);
  }
  if (seenIdempotencyKeys.has(key)) return false;
  seenIdempotencyKeys.set(key, now);
  return true;
}

export async function POST(req: NextRequest) {
  const requestId = newRequestId();
  const ip = resolveClientIp(req);

  try {
    const rl = checkRateLimit(`booking:${ip}`, RateLimits.booking.limit, RateLimits.booking.windowSeconds);
    if (!rl.success) {
      logger.warn("booking.rate_limited", { requestId, ip });
      return fail(429, {
        requestId,
        code: "RATE_LIMITED",
        message:
          "Too many requests. Please connect with us directly via WhatsApp.",
        headers: rateLimitHeaders(rl, RateLimits.booking.limit),
      });
    }

    let raw: string;
    try {
      raw = await readBoundedJsonText(req, MAX_BODY_BYTES);
    } catch (err) {
      if (err instanceof PayloadTooLargeError) {
        return fail(413, {
          requestId,
          code: "PAYLOAD_TOO_LARGE",
          message: "Booking payload too large.",
        });
      }
      throw err;
    }

    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch {
      return fail(400, {
        requestId,
        code: "INVALID_JSON",
        message: "Request body was not valid JSON.",
      });
    }

    const validated = bookingSchema.safeParse(json);
    if (!validated.success) {
      return fail(400, {
        requestId,
        code: "VALIDATION_FAILED",
        message: "Please review the highlighted fields and try again.",
        errors: validated.error.flatten().fieldErrors,
      });
    }
    const data = validated.data;

    // Idempotency — client sends a stable key per intent (e.g. UUID).
    const idempotencyKey = req.headers.get("idempotency-key");
    if (idempotencyKey) {
      const fresh = rememberIdempotencyKey(`booking:${ip}:${idempotencyKey}`);
      if (!fresh) {
        logger.info("booking.duplicate_absorbed", { requestId, ip });
        return ok(
          {
            redirectUrl: buildWhatsappUrl(data),
            duplicate: true,
          },
          {
            requestId,
            message: "Booking already received — reopening WhatsApp.",
            headers: rateLimitHeaders(rl, RateLimits.booking.limit),
          },
        );
      }
    }

    const redirectUrl = buildWhatsappUrl(data);

    logger.info("booking.intent", {
      requestId,
      ip,
      service: data.serviceSlug,
      channel: data.channel,
      hasEmail: Boolean(data.customerEmail),
    });

    return ok(
      { redirectUrl },
      {
        requestId,
        message: "Booking intent recorded. Redirecting to WhatsApp concierge.",
        headers: rateLimitHeaders(rl, RateLimits.booking.limit),
      },
    );
  } catch (err) {
    logger.error("booking.unhandled", {
      requestId,
      ip,
      error: (err as Error).message,
      stack: (err as Error).stack,
    });
    return serverError({ requestId });
  }
}

function buildWhatsappUrl(data: z.infer<typeof bookingSchema>): string {
  const lines = [
    "Hello Reset Men Salon, I would like to book an appointment:",
    `- Service: ${data.serviceSlug}`,
    `- Date:    ${data.preferredDate}`,
    `- Time:    ${data.preferredTime}`,
    `- Name:    ${data.customerName}`,
    `- Phone:   ${data.customerPhone}`,
  ];
  if (data.customerEmail) lines.push(`- Email:   ${data.customerEmail}`);
  if (data.notes) lines.push(`- Notes:   ${data.notes}`);
  return `https://wa.me/971581021540?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function GET() {
  return methodNotAllowed(["POST"]);
}
export const PUT = GET;
export const PATCH = GET;
export const DELETE = GET;
