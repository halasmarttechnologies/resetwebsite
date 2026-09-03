"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/config/site";

// Rolling Letter component for 3D cylinder roll effect without black fading
function RollingLetter({
  char,
  delay = 0,
}: {
  char: string;
  delay?: number;
}) {
  return (
    <span className="relative inline-block overflow-hidden h-[1em] leading-[0.9] align-baseline">
      <motion.span
        initial={{ y: "115%", rotateX: -65 }}
        animate={{ y: "0%", rotateX: 0 }}
        transition={{
          duration: 1.1,
          delay: delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="inline-block transform-gpu origin-bottom will-change-transform"
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
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-noir-950 flex justify-center"
    >
      {/* Centered Structured Frame for Clean Alignment when Zooming Out */}
      <div className="relative w-full max-w-[1920px] h-screen min-h-[700px] max-h-[1080px] overflow-hidden flex flex-col justify-between">
        {/* 1. Full-Bleed High-Fashion Background Portrait (User Image, No Black Fade) */}
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
            sizes="(max-width: 1920px) 100vw, 1920px"
            className="object-cover object-[center_28%] md:object-[center_20%]"
          />
        </motion.div>

        {/* Spacer for Top Header */}
        <div className="h-28 md:h-36 w-full relative z-10" />

        {/* 2. Hero Content Overlay (Aligned to Structured Grid) */}
        <div className="relative z-20 w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pb-3 sm:pb-5 md:pb-8 pointer-events-none">
          <motion.div style={{ y: textY }} className="w-full">
            {/* Bottom-Left Micro Copy & Action Link */}
            <div className="mb-4 sm:mb-6 md:mb-8 max-w-sm pointer-events-auto overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-white text-xs sm:text-sm md:text-base font-normal tracking-wide leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] mb-1.5"
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
                  className="group inline-flex items-center text-white text-sm sm:text-base md:text-lg font-medium underline underline-offset-4 decoration-white/90 hover:text-brand-300 hover:decoration-brand-300 transition-all duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
                >
                  <span>Book an Appointment</span>
                </a>
              </motion.div>
            </div>

            {/* Monumental Bottom-Anchored Typography: MEN'S SALON (Clean Avalance Font, Perfectly Sized for 100% Viewport) */}
            <div className="w-full flex items-baseline justify-between overflow-hidden">
              <h1 className="w-full flex items-center justify-between font-avalance font-extrabold tracking-[-0.03em] text-white text-[7.5vw] sm:text-[8.5vw] md:text-[9.2vw] lg:text-[9.8vw] xl:text-[9.5vw] max-w-full leading-[0.9] uppercase drop-shadow-[0_6px_24px_rgba(0,0,0,0.4)]">
                {/* Word 1: MEN'S */}
                <span className="inline-flex items-center">
                  <RollingLetter char="M" delay={0.1} />
                  <RollingLetter char="E" delay={0.16} />
                  <RollingLetter char="N" delay={0.22} />
                  <RollingLetter char="'" delay={0.28} />
                  <RollingLetter char="S" delay={0.34} />
                </span>

                {/* Word 2: SALON (Pure Clean Geometric Font Avalance 'A') */}
                <span className="inline-flex items-center ml-4 sm:ml-6 md:ml-10">
                  <RollingLetter char="S" delay={0.4} />
                  <RollingLetter char="A" delay={0.46} />
                  <RollingLetter char="L" delay={0.52} />
                  <RollingLetter char="O" delay={0.58} />
                  <RollingLetter char="N" delay={0.64} />
                </span>
              </h1>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
