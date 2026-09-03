"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/config/site";

// Rolling Text component for 3D cylinder roll effect without black fading
function RollingLetter({
  char,
  delay = 0,
  isArch = false,
}: {
  char: string;
  delay?: number;
  isArch?: boolean;
}) {
  return (
    <span className="relative inline-block overflow-hidden h-[1em] leading-[0.88] align-baseline">
      <motion.span
        initial={{ y: "115%", rotateX: -65 }}
        animate={{ y: "0%", rotateX: 0 }}
        transition={{
          duration: 1.1,
          delay: delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="inline-flex items-center justify-center transform-gpu origin-bottom will-change-transform"
      >
        {isArch ? (
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
        ) : (
          <span>{char}</span>
        )}
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

  // Smooth scroll-driven parallax movement
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-noir-950 select-none flex flex-col justify-between"
    >
      {/* 1. Full-Bleed High-Fashion Background Portrait (No Black Fade - Pure Sunlit Crisp Sky) */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 h-full w-full will-change-transform"
      >
        <Image
          src="/images/hero/hero-model.jpg"
          alt="Reset Men Salon — Dubai Luxury Grooming Model in Sunlit Blue Sky"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[center_26%] md:object-[center_20%]"
        />
      </motion.div>

      {/* Spacer for Top Floating Header */}
      <div className="h-28 md:h-36 w-full relative z-10" />

      {/* 2. Hero Content Overlay */}
      <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 lg:px-16 pb-3 sm:pb-4 md:pb-6 pointer-events-none">
        <motion.div style={{ y: textY }} className="w-full">
          {/* Bottom-Left Micro Copy & Action Link */}
          <div className="mb-4 sm:mb-6 md:mb-8 max-w-sm pointer-events-auto overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-white text-xs sm:text-sm md:text-base font-normal tracking-wide leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] mb-1.5"
            >
              Your glow begins here. Welcome to Reset.
            </motion.p>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={siteConfig.booking.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center text-white text-sm sm:text-base md:text-lg font-medium underline underline-offset-4 decoration-white/90 hover:text-brand-300 hover:decoration-brand-300 transition-all duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
              >
                <span>Book an Appointment</span>
              </a>
            </motion.div>
          </div>

          {/* Monumental Bottom-Anchored Full-Width Typography: MEN'S SALON (With Rolling Effect & Zero Black Fade) */}
          <div className="w-full flex items-baseline justify-between overflow-hidden">
            <h1 className="w-full flex items-center justify-between font-sans font-black tracking-[-0.04em] text-white text-[13vw] sm:text-[14vw] md:text-[14.8vw] lg:text-[15.2vw] leading-[0.88] uppercase drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
              {/* Word 1: MEN'S */}
              <span className="inline-flex items-center">
                <RollingLetter char="M" delay={0.1} />
                <RollingLetter char="E" delay={0.16} />
                <RollingLetter char="N" delay={0.22} />
                <RollingLetter char="'" delay={0.28} />
                <RollingLetter char="S" delay={0.34} />
              </span>

              {/* Word 2: SALON (With stylized custom arch glyph on 'A') */}
              <span className="inline-flex items-center ml-4 sm:ml-6 md:ml-10">
                <RollingLetter char="S" delay={0.4} />
                <RollingLetter char="A" delay={0.46} isArch={true} />
                <RollingLetter char="L" delay={0.52} />
                <RollingLetter char="O" delay={0.58} />
                <RollingLetter char="N" delay={0.64} />
              </span>
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
