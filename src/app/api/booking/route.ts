import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/security/rate-limiter";

const bookingSchema = z.object({
  serviceSlug: z.string().min(1, "Service selection is required"),
  preferredDate: z.string().min(1, "Date selection is required"),
  preferredTime: z.string().min(1, "Time selection is required"),
  customerName: z.string().min(2, "Name is required"),
  customerPhone: z.string().min(7, "Valid phone number is required"),
  customerEmail: z.string().email().optional().or(z.literal("")),
  notes: z.string().optional(),
  channel: z.enum(["whatsapp", "online", "phone"]).default("whatsapp"),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const rateLimit = checkRateLimit(`booking:${ip}`, 5, 60);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please connect with us directly via WhatsApp.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validated = bookingSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validated.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validated.data;
    const message = encodeURIComponent(
      `Hello Reset Men Salon, I would like to book an appointment:\n` +
      `- Service: ${data.serviceSlug}\n` +
      `- Date: ${data.preferredDate}\n` +
      `- Time: ${data.preferredTime}\n` +
      `- Name: ${data.customerName}\n` +
      `- Phone: ${data.customerPhone}\n` +
      (data.notes ? `- Notes: ${data.notes}` : "")
    );

    const whatsappRedirectUrl = `https://wa.me/971581021540?text=${message}`;

    return NextResponse.json(
      {
        success: true,
        redirectUrl: whatsappRedirectUrl,
        message: "Booking intent recorded. Redirecting to WhatsApp concierge.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
