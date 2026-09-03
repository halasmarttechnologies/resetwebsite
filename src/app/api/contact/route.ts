import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/security/rate-limiter";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(7, "Please provide a valid phone number"),
  serviceCategory: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters").max(1000),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const rateLimit = checkRateLimit(`contact:${ip}`, 5, 60);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please wait before submitting another inquiry.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validated = contactSchema.safeParse(body);

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

    // Process inquiry (Mock / Resend email / CRM Webhook)
    console.log("Contact Inquiry Received:", validated.data);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you. Our salon concierge will reach out to you shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
