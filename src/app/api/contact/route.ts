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
import { sendEmail } from "@/lib/email/send";
import { siteConfig } from "@/config/site";

/**
 * Contact form endpoint.
 *
 * Guarantees:
 *   • Zod validates + sanitizes every field.
 *   • Honeypot + a min-time-on-page token filter naïve bots (a real
 *     submission takes at least ~1.5s; automated bots submit under 500ms).
 *   • Body is capped at 8 KB so a hostile POST cannot exhaust memory.
 *   • Rate-limited per IP (defaults live in RATE_LIMIT_* env vars).
 *   • Email delivery is best-effort — if Resend is down or unset the
 *     endpoint still returns 200 so the user does not see a broken form.
 *   • Every response carries a `requestId` matching the server log line
 *     so support can trace an individual submission.
 */

const MAX_BODY_BYTES = 8 * 1024;
const MIN_FORM_FILL_MS = 1200;

const contactSchema = z.object({
  name: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(2, "Please enter your name").max(100)),
  email: z
    .string()
    .transform((s) => s.trim().toLowerCase())
    .pipe(z.string().email("Please provide a valid email address").max(254)),
  phone: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(7, "Please provide a valid phone number").max(32)),
  serviceCategory: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().max(80))
    .optional(),
  message: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(5, "Please share a short message").max(2000)),
  /** Honeypot: real submissions leave this empty. */
  honeypot: z.string().max(0).optional().default(""),
  /** Millisecond timestamp when the form was rendered, set by the client. */
  formRenderedAt: z.number().int().positive().optional(),
});

export async function POST(req: NextRequest) {
  const requestId = newRequestId();
  const ip = resolveClientIp(req);

  try {
    // 1. Rate-limit first — cheapest gate.
    const rl = checkRateLimit(
      `contact:${ip}`,
      RateLimits.contact.limit,
      RateLimits.contact.windowSeconds,
    );
    if (!rl.success) {
      logger.warn("contact.rate_limited", { requestId, ip });
      return fail(429, {
        requestId,
        code: "RATE_LIMITED",
        message:
          "Too many requests. Please wait a minute before submitting another inquiry.",
        headers: rateLimitHeaders(rl, RateLimits.contact.limit),
      });
    }

    // 2. Read the body under a size cap.
    let raw: string;
    try {
      raw = await readBoundedJsonText(req, MAX_BODY_BYTES);
    } catch (err) {
      if (err instanceof PayloadTooLargeError) {
        logger.warn("contact.payload_too_large", {
          requestId,
          ip,
          bytes: err.received,
        });
        return fail(413, {
          requestId,
          code: "PAYLOAD_TOO_LARGE",
          message: "Your message is too large. Please shorten it and try again.",
        });
      }
      throw err;
    }

    // 3. Parse JSON with a specific error rather than a stack trace.
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

    // 4. Schema-validate.
    const validated = contactSchema.safeParse(json);
    if (!validated.success) {
      return fail(400, {
        requestId,
        code: "VALIDATION_FAILED",
        message: "Please review the highlighted fields and try again.",
        errors: validated.error.flatten().fieldErrors,
      });
    }
    const data = validated.data;

    // 5. Bot heuristics — honeypot already caught by schema (max=0),
    //    now also verify the form was on-screen long enough to fill.
    if (data.formRenderedAt) {
      const elapsed = Date.now() - data.formRenderedAt;
      if (elapsed < MIN_FORM_FILL_MS) {
        logger.warn("contact.bot_suspected", { requestId, ip, elapsed });
        // Return the same success shape a human would see so bots
        // gain no signal from our response.
        return ok(
          { queued: true },
          {
            requestId,
            message: "Thank you. Our salon concierge will reach out to you shortly.",
            headers: rateLimitHeaders(rl, RateLimits.contact.limit),
          },
        );
      }
    }

    // 6. Fire the notification email (best-effort).
    const emailText = [
      "New contact inquiry — Reset Men Salon",
      "",
      `Name:     ${data.name}`,
      `Email:    ${data.email}`,
      `Phone:    ${data.phone}`,
      `Service:  ${data.serviceCategory ?? "(not specified)"}`,
      "",
      "Message:",
      data.message,
      "",
      `Request ID: ${requestId}`,
      `Source IP:  ${ip}`,
    ].join("\n");

    const notifyTo =
      process.env.CONTACT_NOTIFICATION_EMAIL || siteConfig.contact.email;

    const delivery = await sendEmail({
      to: notifyTo,
      subject: `New inquiry — ${data.name}`,
      text: emailText,
      replyTo: data.email,
    });

    logger.info("contact.received", {
      requestId,
      ip,
      delivered: delivery.delivered,
      provider: delivery.provider,
      serviceCategory: data.serviceCategory ?? null,
    });

    return ok(
      { queued: true },
      {
        requestId,
        message: "Thank you. Our salon concierge will reach out to you shortly.",
        headers: rateLimitHeaders(rl, RateLimits.contact.limit),
      },
    );
  } catch (err) {
    logger.error("contact.unhandled", {
      requestId,
      ip,
      error: (err as Error).message,
      stack: (err as Error).stack,
    });
    return serverError({ requestId });
  }
}

export function GET() {
  return methodNotAllowed(["POST"]);
}
export const PUT = GET;
export const PATCH = GET;
export const DELETE = GET;
