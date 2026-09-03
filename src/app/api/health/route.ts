import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: siteConfig.name,
      location: "Business Bay, Dubai",
      version: "1.0.0",
      architecture: "Next.js App Router (RSC) + TypeScript",
      cms: process.env.CMS_PROVIDER || "mock",
    },
    { status: 200 }
  );
}
