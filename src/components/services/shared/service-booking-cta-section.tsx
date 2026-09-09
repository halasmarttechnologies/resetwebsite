"use client";

import * as React from "react";
import Image from "next/image";
import { MessageCircle, Phone, ShieldCheck, Clock, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * Booking CTA banner shared across every service page. Every original
 * copy differed only in headline, subhead, background image, three
 * trust badges, and the WhatsApp URL. Badge icons were the same three
 * lucide icons across all services, so they're baked in here rather
 * than passed through — the data file supplies only the badge labels.
 */

export interface BookingCtaProps {
  id?: string;
  headline: string;
  description: string;
  backgroundImage: {
    src: string;
    alt: string;
  };
  trustBadges: [string, string, string];
  whatsappUrl: string;
}

const BADGE_ICONS = [ShieldCheck, Clock, MapPin] as const;

export function ServiceBookingCtaSection({
  id = "booking-cta",
  headline,
  description,
  backgroundImage,
  trustBadges,
  whatsappUrl,
}: BookingCtaProps) {
  return (
    <section
      id={id}
      className="relative w-full bg-white py-10 sm:py-14 md:py-16 overflow-hidden border-b border-noir-950/10"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="relative rounded-none bg-noir-950 text-white overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-white/10">
          {/* Background Atmosphere */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <Image
              src={backgroundImage.src}
              alt={backgroundImage.alt}
              fill
              className="object-cover object-center mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-noir-950 via-noir-950/95 to-noir-950/80" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-[1.15]">
              {headline}
            </h2>

            <p className="mt-3.5 sm:mt-4 font-jakarta text-xs sm:text-sm md:text-[15px] text-neutral-300 leading-relaxed font-normal">
              {description}
            </p>

            <div className="mt-5 pt-5 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-jakarta text-neutral-300">
              {trustBadges.map((label, i) => {
                const Icon = BADGE_ICONS[i];
                return (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-jakarta text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 shadow-[0_6px_20px_rgba(37,211,102,0.3)] hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book on WhatsApp</span>
              </a>

              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-jakarta text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300"
              >
                <Phone className="w-3.5 h-3.5 text-white" />
                <span>Call {siteConfig.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
