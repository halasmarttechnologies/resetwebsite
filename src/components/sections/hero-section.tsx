"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/config/site";

// Smooth 3D Rolling Letter component for elegant entrance without shadows or highlights
function RollingLetter({
  char,
  delay = 0,
}: {
  char: string;
  delay?: number;
}) {
  return (
    <span className="relative inline-block overflow-hidden h-[1.15em] leading-[0.92] align-baseline select-none">
      <motion.span
        initial={{ y: "115%", rotateX: -50 }}
        animate={{ y: "0%", rotateX: 0 }}
        transition={{
          duration: 0.95,
          delay: delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="inline-block transform-gpu origin-bottom will-change-transform text-white"
      >
        {char}
      </motion.span>
    </span>
  );
}

export function HeroSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Subtle scroll-driven parallax movement
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white flex justify-center overflow-hidden"
    >
      {/* Centered Structured Frame: Straight bottom edge (rounded-none), perfect layout alignment */}
      <div className="relative w-full max-w-[1720px] h-[92vh] min-h-[640px] max-h-[1000px] overflow-hidden rounded-none">
        {/* 1. Full-Bleed Compressed WebP Portrait (148KB, Crisp Sunlight & Blue Sky) */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 h-full w-full will-change-transform"
        >
          <Image
            src="/images/hero/hero-user.webp"
            alt="Reset Men Salon — Dubai Luxury Grooming"
            fill
            priority
            quality={90}
            sizes="(max-width: 1720px) 100vw, 1720px"
            className="object-cover object-[center_26%] md:object-[center_20%]"
          />
        </motion.div>

        {/* 2. Hero Bottom Content Overlay (Anchored to Bottom, Aligned to Grid, Never Overlaps Header) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 w-full pb-8 sm:pb-10 md:pb-12 pointer-events-none">
          <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-10 md:px-14 lg:px-16">
            {/* Bottom-Left Micro Copy & Action Link */}
            <div className="mb-2.5 sm:mb-3.5 max-w-md pointer-events-auto overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-jakarta text-white text-xs sm:text-sm md:text-base font-medium tracking-wide leading-snug mb-1"
              >
                Your glow begins here. Welcome to Reset.
              </motion.p>
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href={siteConfig.booking.primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-jakarta group inline-flex items-center text-white text-sm sm:text-base md:text-lg font-semibold underline underline-offset-4 decoration-white hover:text-white/85 transition-all duration-300"
                >
                  <span>Book an Appointment</span>
                </a>
              </motion.div>
            </div>

            {/* Monumental Typography: MEN'S SALON (Creative Syne Font, Impactful & Big, Straight Edge, Single Line, Pure White) */}
            <div className="w-full overflow-hidden pt-1">
              <h1 className="inline-flex items-center flex-nowrap whitespace-nowrap gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 font-syne font-extrabold tracking-[-0.035em] text-white text-[clamp(2.4rem,6.6vw,7.0rem)] leading-none uppercase">
                {/* Word 1: MEN'S */}
                <span className="inline-flex items-center whitespace-nowrap">
                  <RollingLetter char="M" delay={0.08} />
                  <RollingLetter char="E" delay={0.13} />
                  <RollingLetter char="N" delay={0.18} />
                  <RollingLetter char="'" delay={0.23} />
                  <RollingLetter char="S" delay={0.28} />
                </span>

                {/* Word 2: SALON */}
                <span className="inline-flex items-center whitespace-nowrap">
                  <RollingLetter char="S" delay={0.35} />
                  <RollingLetter char="A" delay={0.40} />
                  <RollingLetter char="L" delay={0.45} />
                  <RollingLetter char="O" delay={0.50} />
                  <RollingLetter char="N" delay={0.55} />
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
