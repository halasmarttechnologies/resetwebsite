"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function AboutStatementSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 md:py-32 bg-white overflow-hidden flex flex-col justify-center items-center border-b border-noir-950/[0.08]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center">
        {/* 1. Monumental Statement Headline */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.85, ease: LUXURY_EASE }}
          className="w-full max-w-5xl mx-auto mb-10 sm:mb-14 md:mb-16 text-center"
        >
          <span className="font-jakarta text-xs font-bold uppercase tracking-[0.25em] text-noir-400 mb-3 block">
            The Reset Philosophy
          </span>
          <h2 className="font-editorial font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.2rem] text-noir-950 tracking-[-0.04em] leading-[1.04] uppercase text-center">
            WE HELP CREATE
            <br />
            MOMENTS OF BEAUTY
            <br />
            FOR YOU AND
            <br />
            YOUR GLOW
          </h2>
        </motion.div>

        {/* 2. Editorial Layout: Contextual Salon Images Flanking the Manifesto Paragraph */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Photographic Vignette: Lounge Atmosphere */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: LUXURY_EASE }}
            className="hidden lg:block lg:col-span-3"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-noir-200/80 group">
              <Image
                src="/images/salon/salon-lounge-interior.webp"
                alt="Reset Men Salon Private Lounge Sanctuary Business Bay"
                fill
                sizes="(max-width: 1200px) 25vw, 300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="font-jakarta text-[11px] font-bold text-white uppercase tracking-wider block">
                  Private Sanctuary
                </span>
                <span className="font-jakarta text-[10px] text-white/80">
                  Business Bay, Dubai
                </span>
              </div>
            </div>
          </motion.div>

          {/* Center Editorial Paragraph & Action */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.85, delay: 0.15, ease: LUXURY_EASE }}
            className="w-full lg:col-span-6 flex flex-col items-center text-center px-2 sm:px-6"
          >
            {/* Editorial quote badge */}
            <div className="w-10 h-0.5 bg-noir-950 mb-6" />

            <p className="font-jakarta text-noir-700 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-center mb-6 sm:mb-8">
              Reset is a premier beauty and grooming studio for modern gentlemen,
              offering expert care for skin, body, and hair. We provide
              personalized consultations to select treatments that precisely
              address each client&apos;s individual needs.
            </p>

            {/* Subtle Pill Metrics */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
              <span className="font-jakarta text-xs font-semibold text-noir-800 bg-neutral-100 px-3.5 py-1.5 rounded-full border border-noir-200/60">
                10+ Master Artisans
              </span>
              <span className="font-jakarta text-xs font-semibold text-noir-800 bg-neutral-100 px-3.5 py-1.5 rounded-full border border-noir-200/60">
                Japanese Head Spa Suite
              </span>
              <span className="font-jakarta text-xs font-semibold text-noir-800 bg-neutral-100 px-3.5 py-1.5 rounded-full border border-noir-200/60">
                Business Bay Location
              </span>
            </div>

            {/* Underlined Action Link (Read More) */}
            <Link
              href="/about"
              className="group relative inline-flex flex-col items-center text-noir-950 font-jakarta text-base sm:text-lg md:text-xl font-semibold tracking-wide hover:text-noir-700 transition-colors duration-300"
            >
              <span>Read More</span>
              {/* Animated Underline */}
              <span className="w-full h-[1.5px] bg-noir-950 mt-1 origin-left transition-transform duration-300 group-hover:scale-x-110" />
            </Link>
          </motion.div>

          {/* Right Photographic Vignette: Master Barbering */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: LUXURY_EASE }}
            className="hidden lg:block lg:col-span-3"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-noir-200/80 group">
              <Image
                src="/images/salon/haircut-scissor-detailing.webp"
                alt="Master Scissor Craftsmanship and Detailing at Reset Men Salon"
                fill
                sizes="(max-width: 1200px) 25vw, 300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="font-jakarta text-[11px] font-bold text-white uppercase tracking-wider block">
                  Master Barbering
                </span>
                <span className="font-jakarta text-[10px] text-white/80">
                  Precision Scissor Craft
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
