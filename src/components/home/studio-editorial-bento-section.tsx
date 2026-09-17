"use client";

import * as React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { siteConfig } from "@/config/site";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: LUXURY_EASE,
    },
  },
};

export function StudioEditorialBentoSection() {
  return (
    <section className="relative w-full bg-[#0d0d0f] text-white py-16 sm:py-24 md:py-32 overflow-hidden border-b border-white/[0.08]">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row items-start gap-10 xl:gap-14">
          {/* ══════════════════════════════════════════════════════════
              LEFT COLUMN: Sticky Studio & Brand Manifesto Sidebar
              ══════════════════════════════════════════════════════════ */}
          <div className="w-full lg:w-[35%] xl:w-[32%] shrink-0 lg:sticky lg:top-28 lg:self-start space-y-7 sm:space-y-8">
            {/* 1. Header Profile Widget (Avatar + Brand Name & Title) */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex items-center gap-3.5"
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/20 shrink-0 bg-neutral-900">
                <Image
                  src="/team/A7R07323-1-922x1024.webp"
                  alt="Reset Master Barber & Sanctuary"
                  fill
                  sizes="48px"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-editorial font-bold text-base sm:text-lg text-white leading-tight">
                  Reset Men Salon
                </h3>
                <p className="font-jakarta text-xs text-neutral-400 font-normal">
                  Luxury Grooming &amp; Head Spa
                </p>
              </div>
            </motion.div>

            {/* 2. Hero Statement / Value Proposition */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-4 sm:space-y-5"
            >
              <p className="font-jakarta text-base sm:text-lg md:text-[1.15rem] leading-[1.45] text-neutral-300 font-normal tracking-[-0.01em]">
                We engineer bespoke grooming experiences — from modern haircuts
                and precision beard architecture to Japanese head spa therapy —{" "}
                <strong className="font-semibold text-white">
                  focused on precision, deep restoration, and modern distinction.
                </strong>
              </p>

              {/* Status Indicator: Glowing Green Dot */}
              <div className="flex items-center gap-2 pt-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-jakarta text-xs sm:text-sm text-neutral-400 font-normal">
                  Available for bookings.
                </span>
              </div>

              {/* Pill Button: Get in touch */}
              <div className="pt-2">
                <a
                  href={siteConfig.booking.primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white text-noir-950 font-jakarta text-xs sm:text-sm font-semibold tracking-wide hover:bg-neutral-200 transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
                >
                  <span>Get in touch</span>
                </a>
              </div>
            </motion.div>

            {/* Divider Line */}
            <div className="border-t border-white/[0.08]" />

            {/* 3. Monochrome Recognition / Partner Brands Row */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex items-center justify-between gap-4 py-1 text-neutral-400 overflow-x-auto no-scrollbar"
            >
              <span className="font-editorial text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-neutral-400 hover:text-white transition-colors duration-300">
                ORIBE
              </span>
              <span className="font-editorial text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-neutral-400 hover:text-white transition-colors duration-300">
                DAVINES
              </span>
              <span className="font-editorial text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors duration-300">
                TAKARA
              </span>
              <span className="font-editorial text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-neutral-400 hover:text-white transition-colors duration-300">
                DYSON
              </span>
              <span className="font-editorial text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-neutral-400 hover:text-white transition-colors duration-300">
                SHU
              </span>
            </motion.div>

            {/* Divider Line */}
            <div className="border-t border-white/[0.08]" />

            {/* 4. About Us & Key Metrics */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-4"
            >
              <h4 className="font-editorial font-bold text-base sm:text-lg text-white tracking-tight">
                About us.
              </h4>
              <p className="font-jakarta text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                Reset is Dubai&apos;s flagship luxury grooming destination based
                in Business Bay with senior master barbers, authentic Japanese
                head spa hydrotherapists, and bespoke botanical regimens.
              </p>

              {/* Stats List Matching Reference Screenshot (Bold number + bullet + label) */}
              <div className="space-y-2 pt-2 font-jakarta text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm sm:text-base">
                    10+
                  </span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-300 font-normal">
                    Years of master experience
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm sm:text-base">
                    5,000+
                  </span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-300 font-normal">
                    Gentlemen served
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm sm:text-base">
                    54
                  </span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-300 font-normal">
                    Curated services
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm sm:text-base">
                    99%
                  </span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-300 font-normal">
                    Client satisfaction rate
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Divider Line */}
            <div className="border-t border-white/[0.08]" />

            {/* 5. Services List (Numbered & Bulleted matching screenshot) */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-4 pb-4"
            >
              <h4 className="font-editorial font-bold text-base sm:text-lg text-white tracking-tight">
                Services.
              </h4>

              <div className="space-y-4 font-jakarta text-xs sm:text-sm">
                {/* 1. Hair & Beard Architecture */}
                <div>
                  <p className="font-semibold text-neutral-200">
                    1. Hair &amp; Beard Architecture
                  </p>
                  <ul className="mt-1.5 ml-4 space-y-1 text-neutral-400 text-xs list-disc font-normal">
                    <li>Bespoke scissor cuts</li>
                    <li>Beard sculpting &amp; contouring</li>
                    <li>Royal hot-towel razor shaves</li>
                    <li>Scalp diagnostics</li>
                  </ul>
                </div>

                {/* 2. Japanese Head Spa */}
                <div>
                  <p className="font-semibold text-neutral-200">
                    2. Japanese Head Spa
                  </p>
                  <ul className="mt-1.5 ml-4 space-y-1 text-neutral-400 text-xs list-disc font-normal">
                    <li>Microscopic follicle diagnostics</li>
                    <li>Herbal waterfall hydrotherapy</li>
                    <li>Acupressure tension release</li>
                  </ul>
                </div>

                {/* 3. Skincare & Facials */}
                <div>
                  <p className="font-semibold text-neutral-200">
                    3. Skincare &amp; Facial Therapies
                  </p>
                  <ul className="mt-1.5 ml-4 space-y-1 text-neutral-400 text-xs list-disc font-normal">
                    <li>Deep pore purification</li>
                    <li>Cryo soothing recovery</li>
                    <li>Botanical hydration barrier</li>
                  </ul>
                </div>

                {/* 4. Body Care & Grooming */}
                <div>
                  <p className="font-semibold text-neutral-200">
                    4. Body Recovery
                  </p>
                  <ul className="mt-1.5 ml-4 space-y-1 text-neutral-400 text-xs list-disc font-normal">
                    <li>Neck &amp; shoulder relief</li>
                    <li>Executive manicure &amp; pedicure</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT COLUMNS: Multi-Column Visual Bento Gallery
              ══════════════════════════════════════════════════════════ */}
          <div className="w-full lg:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* ────────────────────────────────────────────────────────
                MIDDLE COLUMN (Cards 1 & 2)
                ──────────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-5 sm:gap-6">
              {/* Card 1: Japanese Head Spa Halo Hydrotherapy */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="group relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-900 border border-white/[0.08] shadow-2xl"
              >
                <Image
                  src="/images/salon/japanese-head-spa-halo.webp"
                  alt="Reset Signature Japanese Head Spa Waterfall Hydrotherapy"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  priority
                />

                {/* Bottom Contrast Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Corner Badge Text */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between z-10">
                  <span className="font-editorial font-bold text-white text-sm sm:text-base tracking-wide">
                    Japanese Head Spa
                  </span>
                  <span className="font-jakarta text-xs text-neutral-300 font-normal">
                    Waterfall Hydrotherapy
                  </span>
                </div>
              </motion.div>

              {/* Card 2: Cryo Sculpt & Revitalizing Facial Care */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="group relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-900 border border-white/[0.08] shadow-2xl"
              >
                <Image
                  src="/images/salon/japanese-head-spa-massage.webp"
                  alt="Reset Sanctuary Facial Care and Scalp Therapy"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                {/* Bottom Contrast Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Corner Badge Text */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between z-10">
                  <span className="font-editorial font-bold text-white text-sm sm:text-base tracking-wide">
                    Facial Sanctuary
                  </span>
                  <span className="font-jakarta text-xs text-neutral-300 font-normal">
                    Acupressure &amp; Skin Care
                  </span>
                </div>
              </motion.div>
            </div>

            {/* ────────────────────────────────────────────────────────
                RIGHT COLUMN (Cards 3 & 4)
                ──────────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-5 sm:gap-6">
              {/* Card 3: Targeted Scalp Serum Infusion */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="group relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-900 border border-white/[0.08] shadow-2xl"
              >
                <Image
                  src="/images/salon/scalp-rinse-treatment.webp"
                  alt="Reset Scalp Rinse and Follicle Detoxification"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                {/* Bottom Contrast Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Corner Badge Text */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between z-10">
                  <span className="font-editorial font-bold text-white text-sm sm:text-base tracking-wide">
                    Scalp Detox
                  </span>
                  <span className="font-jakarta text-xs text-neutral-300 font-normal">
                    Targeted Rinse Infusion
                  </span>
                </div>
              </motion.div>

              {/* Card 4: Master Barber Straight Razor Shave */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="group relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-900 border border-white/[0.08] shadow-2xl"
              >
                <Image
                  src="/images/salon/barber-straight-razor-shave.webp"
                  alt="Reset Master Barber Traditional Straight Razor Detailing"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                {/* Bottom Contrast Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Corner Badge Text */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between z-10">
                  <span className="font-editorial font-bold text-white text-sm sm:text-base tracking-wide">
                    Master Barber
                  </span>
                  <span className="font-jakarta text-xs text-neutral-300 font-normal">
                    Straight Razor Detailing
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
