"use client";

import * as React from "react";
import Image from "next/image";
import {
  Flame,
  Droplets,
  Atom,
  Leaf,
  HeartHandshake,
} from "lucide-react";

export interface BenefitMediaItem {
  id: string;
  title: string;
  posterImage: string;
}

export interface BenefitsGridSectionProps {
  categoryLabel?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  description?: string;
  mediaItems?: BenefitMediaItem[];
}

const defaultMediaItems: BenefitMediaItem[] = [
  // 1. Top-Center Media (Row 1, Column 2)
  {
    id: "media-1",
    title: "Radiant Skin & Scalp Glow",
    posterImage: "/images/salon/scalp-rinse-treatment.webp",
  },
  // 2. Middle-Left Media (Row 2, Column 1)
  {
    id: "media-2",
    title: "Head Spa Massage Therapy",
    posterImage: "/images/salon/japanese-head-spa-massage.webp",
  },
  // 3. Middle-Right Media (Row 2, Column 3)
  {
    id: "media-3",
    title: "Precision Styling & Detail",
    posterImage: "/images/salon/stylist-haircut-mirror.webp",
  },
  // 4. Bottom-Center Media (Row 3, Column 2)
  {
    id: "media-4",
    title: "Client Freshness & Vitality",
    posterImage: "/images/salon/stylist-client-satisfaction.webp",
  },
];

export function BenefitsGridSection({
  categoryLabel = "BENEFITS",
  headlineLine1 = "elevated care",
  headlineLine2 = "for modern skin",
  description = "Skincare shouldn't be complicated. Our focused formulas provide visible results while respecting your skin's natural function, giving you balance, comfort, and confidence every day.",
  mediaItems = defaultMediaItems,
}: {
  categoryLabel?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  description?: string;
  mediaItems?: BenefitMediaItem[];
}) {
  return (
    <section className="relative w-full bg-white text-noir-950 py-14 sm:py-20 md:py-24 border-t border-b border-noir-950/[0.08] select-none overflow-hidden">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-stretch">
          
          {/* ── LEFT COLUMN: Typography & Narrative (Website Black & White) ── */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2 sm:py-4">
            {/* Top: Category & Headline */}
            <div>
              <span className="block text-[11px] sm:text-xs font-jakarta font-bold tracking-[0.22em] text-neutral-500 uppercase mb-4 sm:mb-6">
                {categoryLabel}
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold tracking-tight text-noir-950 leading-[1.06]">
                <span>{headlineLine1}</span>
                <br />
                <span>{headlineLine2}</span>
              </h2>
            </div>

            {/* Bottom: Description text */}
            <div className="mt-12 sm:mt-20 lg:mt-0 max-w-md">
              <p className="font-jakarta text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                {description}
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: 3x3 Alternating Checkerboard Grid ────────────── */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div className="w-full max-w-[620px] aspect-square grid grid-cols-3 gap-2.5 sm:gap-3 md:gap-3.5 bg-transparent">
              
              {/* ── ROW 1, COL 1: Text Card (Designed for Real Skin) ─── */}
              <div className="relative aspect-square bg-[#F8F9FA] border border-black/[0.06] p-3.5 sm:p-5 md:p-6 flex flex-col justify-between rounded-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-noir-950 flex items-center justify-center text-white shadow-xs">
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <h3 className="font-jakarta font-semibold text-xs sm:text-sm md:text-[15px] lg:text-base text-noir-950 leading-tight tracking-tight">
                  Designed
                  <br />
                  for Real Skin
                </h3>
              </div>

              {/* ── ROW 1, COL 2: Pure Static Image Card 1 ──────────────── */}
              <div className="group relative aspect-square bg-noir-950 overflow-hidden rounded-sm border border-black/[0.06]">
                <Image
                  src={mediaItems[0]?.posterImage || "/images/salon/scalp-rinse-treatment.webp"}
                  alt={mediaItems[0]?.title || "Treatment"}
                  fill
                  sizes="(max-width: 768px) 33vw, 220px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* ── ROW 1, COL 3: Text Card (Visible Results, Simplified) ── */}
              <div className="relative aspect-square bg-[#F8F9FA] border border-black/[0.06] p-3.5 sm:p-5 md:p-6 flex flex-col justify-between rounded-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-noir-950 flex items-center justify-center text-white shadow-xs">
                  <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <h3 className="font-jakarta font-semibold text-xs sm:text-sm md:text-[15px] lg:text-base text-noir-950 leading-tight tracking-tight">
                  Visible Results,
                  <br />
                  Simplified
                </h3>
              </div>

              {/* ── ROW 2, COL 1: Pure Static Image Card 2 ──────────────── */}
              <div className="group relative aspect-square bg-noir-950 overflow-hidden rounded-sm border border-black/[0.06]">
                <Image
                  src={mediaItems[1]?.posterImage || "/images/salon/japanese-head-spa-massage.webp"}
                  alt={mediaItems[1]?.title || "Treatment"}
                  fill
                  sizes="(max-width: 768px) 33vw, 220px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* ── ROW 2, COL 2: Text Card (Science with Sensibility) ──── */}
              <div className="relative aspect-square bg-[#F8F9FA] border border-black/[0.06] p-3.5 sm:p-5 md:p-6 flex flex-col justify-between rounded-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-noir-950 flex items-center justify-center text-white shadow-xs">
                  <Atom className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <h3 className="font-jakarta font-semibold text-xs sm:text-sm md:text-[15px] lg:text-base text-noir-950 leading-tight tracking-tight">
                  Science with
                  <br />
                  Sensibility
                </h3>
              </div>

              {/* ── ROW 2, COL 3: Pure Static Image Card 3 ──────────────── */}
              <div className="group relative aspect-square bg-noir-950 overflow-hidden rounded-sm border border-black/[0.06]">
                <Image
                  src={mediaItems[2]?.posterImage || "/images/salon/stylist-haircut-mirror.webp"}
                  alt={mediaItems[2]?.title || "Treatment"}
                  fill
                  sizes="(max-width: 768px) 33vw, 220px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* ── ROW 3, COL 1: Text Card (Gentle Yet Effective) ─────── */}
              <div className="relative aspect-square bg-[#F8F9FA] border border-black/[0.06] p-3.5 sm:p-5 md:p-6 flex flex-col justify-between rounded-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-noir-950 flex items-center justify-center text-white shadow-xs">
                  <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <h3 className="font-jakarta font-semibold text-xs sm:text-sm md:text-[15px] lg:text-base text-noir-950 leading-tight tracking-tight">
                  Gentle Yet
                  <br />
                  Effective
                </h3>
              </div>

              {/* ── ROW 3, COL 2: Pure Static Image Card 4 ──────────────── */}
              <div className="group relative aspect-square bg-noir-950 overflow-hidden rounded-sm border border-black/[0.06]">
                <Image
                  src={mediaItems[3]?.posterImage || "/images/salon/stylist-client-satisfaction.webp"}
                  alt={mediaItems[3]?.title || "Treatment"}
                  fill
                  sizes="(max-width: 768px) 33vw, 220px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* ── ROW 3, COL 3: Text Card (Made to be Lived in) ───────── */}
              <div className="relative aspect-square bg-[#F8F9FA] border border-black/[0.06] p-3.5 sm:p-5 md:p-6 flex flex-col justify-between rounded-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-noir-950 flex items-center justify-center text-white shadow-xs">
                  <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <h3 className="font-jakarta font-semibold text-xs sm:text-sm md:text-[15px] lg:text-base text-noir-950 leading-tight tracking-tight">
                  Made to
                  <br />
                  be Lived in
                </h3>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
