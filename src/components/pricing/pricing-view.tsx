"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";

export function PricingView() {
  return (
    <section className="w-full bg-white text-noir-950 py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <h1 className="font-editorial font-black text-4xl sm:text-6xl text-center uppercase mb-12">
          PRICING MENU
        </h1>
        <div className="flex justify-center">
          <a
            href={siteConfig.booking.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-noir-950 text-white font-semibold text-sm hover:bg-noir-800 transition-all"
          >
            Book an Appointment
          </a>
        </div>
      </div>
    </section>
  );
}
