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
    <span className="relative inline-block overflow-hidden h-[1.08em] leading-[0.92] align-baseline">
      <motion.span
        initial={{ y: "120%", rotateX: -60 }}
        animate={{ y: "0%", rotateX: 0 }}
        transition={{
          duration: 1.1,
          delay: delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="inline-block transform-gpu origin-bottom will-change-transform text-white select-none"
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

  // Smooth scroll-driven parallax movement
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white flex justify-center overflow-hidden"
    >
      {/* Centered Structured Frame matching website grid layout */}
      <div className="relative w-full max-w-[1720px] h-screen min-h-[700px] max-h-[1050px] overflow-hidden flex flex-col justify-between rounded-none md:rounded-b-3xl">
        {/* 1. Full-Bleed High-Fashion Background Portrait (Crisp Sunlight & Blue Sky, 100% Clearly Visible) */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 h-full w-full will-change-transform"
        >
          <Image
            src="/images/hero/hero-user.png"
            alt="Reset Men Salon — Dubai Luxury Grooming"
            fill
            priority
            quality={95}
            sizes="(max-width: 1720px) 100vw, 1720px"
            className="object-cover object-[center_28%] md:object-[center_20%]"
          />
        </motion.div>

        {/* Spacer for Top Header */}
        <div className="h-32 sm:h-36 md:h-40 w-full relative z-10" />

        {/* 2. Hero Content Overlay (Aligned to Header Grid: max-w-[1600px] px-6 sm:px-10 md:px-14 lg:px-16) */}
        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pb-8 sm:pb-10 md:pb-12 pointer-events-none">
          <motion.div style={{ y: textY }} className="w-full">
            {/* Bottom-Left Micro Copy & Action Link (Pure White, Smooth Intro) */}
            <div className="mb-4 sm:mb-6 max-w-md pointer-events-auto overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-jakarta text-white text-sm sm:text-base md:text-lg font-medium tracking-wide leading-snug mb-1.5"
              >
                Your glow begins here. Welcome to Reset.
              </motion.p>
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href={siteConfig.booking.primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-jakarta group inline-flex items-center text-white text-base sm:text-lg md:text-xl font-semibold underline underline-offset-4 decoration-white hover:text-white/80 transition-all duration-300"
                >
                  <span>Book an Appointment</span>
                </a>
              </motion.div>
            </div>

            {/* Monumental Typography: MEN'S SALON (Increased Size, Pure White, Smooth Staggered Rolling Intro) */}
            <div className="w-full flex items-baseline justify-start overflow-hidden">
              <h1 className="flex items-center flex-wrap gap-x-4 sm:gap-x-6 md:gap-x-8 font-jakarta font-extrabold tracking-[-0.035em] text-white text-6xl sm:text-7xl md:text-8xl lg:text-[7.5vw] xl:text-[8.0vw] leading-[0.92] uppercase">
                {/* Word 1: MEN'S */}
                <span className="inline-flex items-center">
                  <RollingLetter char="M" delay={0.1} />
                  <RollingLetter char="E" delay={0.16} />
                  <RollingLetter char="N" delay={0.22} />
                  <RollingLetter char="'" delay={0.28} />
                  <RollingLetter char="S" delay={0.34} />
                </span>

                {/* Word 2: SALON */}
                <span className="inline-flex items-center">
                  <RollingLetter char="S" delay={0.42} />
                  <RollingLetter char="A" delay={0.48} />
                  <RollingLetter char="L" delay={0.54} />
                  <RollingLetter char="O" delay={0.60} />
                  <RollingLetter char="N" delay={0.66} />
                </span>
              </h1>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
