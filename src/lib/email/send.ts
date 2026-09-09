import { logger } from "@/lib/logger";
import { withTimeout, TimeoutError } from "@/lib/api/request-utils";

/**
 * Email adapter — fail-safe.
 *
 * If `RESEND_API_KEY` is configured the message is sent through Resend's
 * REST API. If not (dev, preview, misconfiguration) the call becomes a
 * structured log entry instead of throwing. The caller therefore never
 * has to guard against the mail service being down or unset — a failed
 * delivery is logged with severity `warn` and reported back as
 * `{ delivered: false, reason }`, but the form request itself still
 * completes with a `success: true` response so the user experience
 * degrades gracefully.
 *
 * Timeout is capped so a slow provider cannot hang the API route.
 */

export interface SendEmailInput {
  to: string;
  from?: string;
  subject: string;
  text: string;
  /** Optional Reply-To used for contact/booking so a staffer can reply directly. */
  replyTo?: string;
}

export interface SendEmailResult {
  delivered: boolean;
  provider: "resend" | "logger";
  id?: string;
  reason?: string;
}

const DEFAULT_TIMEOUT_MS = 5000;
const DEFAULT_FROM = "Reset Men Salon <no-reply@resetmensalon.ae>";

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // No delivery configured — treat as a controlled no-op. Log the
    // payload metadata (never the body) so ops can see the volume.
    logger.info("email.no_provider", {
      to: hashRecipient(input.to),
      subject: input.subject,
      bytes: input.text.length,
    });
    return {
      delivered: false,
      provider: "logger",
      reason: "RESEND_API_KEY not configured",
    };
  }

  try {
    const response = await withTimeout(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: input.from ?? DEFAULT_FROM,
          to: [input.to],
          subject: input.subject,
          text: input.text,
          ...(input.replyTo ? { reply_to: input.replyTo } : {}),
        }),
      }),
      DEFAULT_TIMEOUT_MS,
    );

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      logger.warn("email.provider_error", {
        status: response.status,
        // Truncate provider response so a verbose HTML error page can
        // never blow up the log line.
        body: body.slice(0, 400),
      });
      return {
        delivered: false,
        provider: "resend",
        reason: `Provider returned ${response.status}`,
      };
    }

    const data = (await response.json().catch(() => ({}))) as { id?: string };
    return { delivered: true, provider: "resend", id: data.id };
  } catch (err) {
    const reason =
      err instanceof TimeoutError ? "provider timeout" : (err as Error).message;
    logger.warn("email.send_failed", { reason });
    return { delivered: false, provider: "resend", reason };
  }
}

/** Non-cryptographic recipient fingerprint for log grouping. */
function hashRecipient(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i += 1) {
    hash = (hash * 31 + email.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(36);
}
