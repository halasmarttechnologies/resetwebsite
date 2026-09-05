"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";

export function ContactView() {
  return (
    <section className="w-full bg-white text-noir-950 py-24 sm:py-32">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 text-center">
        <h1 className="font-editorial font-black text-4xl sm:text-6xl uppercase mb-6">
          CONTACT US
        </h1>
        <p className="font-jakarta text-noir-600 mb-8 max-w-lg mx-auto">
          Business Bay, Dubai, UAE • Open Daily 10:00 AM – 10:00 PM
        </p>
        <div className="flex justify-center gap-4">
          <a
            href={siteConfig.booking.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-noir-950 text-white font-semibold text-sm hover:bg-noir-800 transition-all"
          >
            WhatsApp Concierge
          </a>
        </div>
      </div>
    </section>
  );
}
