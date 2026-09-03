"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth parallax transformations
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-noir-950 select-none flex flex-col justify-between"
    >
      {/* 1. Full-Bleed High-Fashion Background Portrait with Parallax */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 h-full w-full will-change-transform"
      >
        <Image
          src="/images/hero/hero-model.jpg"
          alt="Reset Men Salon — Luxury Grooming Model in Sunlit Blue Sky"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[center_28%] md:object-[center_22%]"
        />

        {/* Subtle Atmospheric Lighting Overlays for high-contrast text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/65 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />
      </motion.div>

      {/* Spacer for Top Header */}
      <div className="h-28 md:h-36 w-full relative z-10" />

      {/* 2. Hero Content Overlay */}
      <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 lg:px-16 pb-4 md:pb-6 pointer-events-none">
        <motion.div style={{ y: textY, opacity }} className="w-full">
          {/* Bottom-Left Micro Copy & Action Link (Matches Screenshot Exactly) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 sm:mb-6 md:mb-8 max-w-sm pointer-events-auto"
          >
            <p className="text-white/95 text-xs sm:text-sm md:text-base font-normal tracking-wide leading-snug drop-shadow-md mb-1.5">
              Your glow begins here. Welcome to Reset.
            </p>
            <a
              href={siteConfig.booking.primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center text-white text-sm sm:text-base md:text-lg font-medium underline underline-offset-4 decoration-white/90 hover:text-brand-300 hover:decoration-brand-300 transition-all duration-300"
            >
              <span>Book an Appointment</span>
            </a>
          </motion.div>

          {/* Monumental Bottom-Anchored Full-Width Typography (BEAUTY / RESET SALON) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex items-baseline justify-between overflow-hidden"
          >
            <h1 className="w-full flex items-center justify-between font-sans font-black tracking-[-0.04em] text-white text-[13.5vw] sm:text-[14.5vw] md:text-[15vw] lg:text-[15.5vw] leading-[0.85] uppercase drop-shadow-2xl">
              {/* Word 1: BEAXTY / RESET with custom stylized arch glyph */}
              <span className="inline-flex items-center">
                <span>BEA</span>
                {/* Bespoke Rounded Arch Glyph matching the exact screenshot design */}
                <span className="inline-flex items-center justify-center mx-[0.02em] transform translate-y-[-0.04em]">
                  <svg
                    viewBox="0 0 100 100"
                    fill="currentColor"
                    className="w-[0.82em] h-[0.82em] text-white"
                  >
                    <path
                      d="M20,95 C20,50 30,15 50,15 C70,15 80,50 80,95 L62,95 C62,60 56,36 50,36 C44,36 38,60 38,95 Z"
                      fill="currentColor"
                    />
                    <circle cx="50" cy="82" r="14" fill="#0B0B0C" />
                  </svg>
                </span>
                <span>TY</span>
              </span>

              {/* Word 2: SALON */}
              <span className="inline-block ml-4 sm:ml-6 md:ml-10">SALON</span>
            </h1>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Edge Subtle Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-noir-950 to-transparent pointer-events-none z-30" />
    </section>
  );
}
