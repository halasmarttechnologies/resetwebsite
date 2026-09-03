"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/config/site";

// Clean Rolling Letter component without shadows or box artifacts
function RollingLetter({
  char,
  delay = 0,
}: {
  char: string;
  delay?: number;
}) {
  return (
    <span className="relative inline-block overflow-hidden h-[1.05em] leading-[0.92] align-baseline">
      <motion.span
        initial={{ y: "115%", rotateX: -60 }}
        animate={{ y: "0%", rotateX: 0 }}
        transition={{
          duration: 1.0,
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

  // Smooth scroll-driven parallax movement
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white flex justify-center overflow-hidden"
    >
      {/* Centered Structured Frame for Clean Alignment */}
      <div className="relative w-full max-w-[1720px] h-screen min-h-[680px] max-h-[1020px] overflow-hidden flex flex-col justify-between rounded-none md:rounded-b-2xl">
        {/* 1. Full-Bleed High-Fashion Background Portrait (User Image, Clean, Zero Dark Fades) */}
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
        <div className="h-28 md:h-36 w-full relative z-10" />

        {/* 2. Hero Content Overlay (Aligned to Left Grid, Clean Text, Zero Highlights or Box Shadows) */}
        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 sm:px-10 md:px-12 lg:px-14 pb-6 sm:pb-8 md:pb-10 pointer-events-none">
          <motion.div style={{ y: textY }} className="w-full">
            {/* Bottom-Left Micro Copy & Action Link */}
            <div className="mb-4 sm:mb-6 max-w-sm pointer-events-auto overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-jakarta text-white text-xs sm:text-sm md:text-base font-medium tracking-wide leading-snug mb-1.5"
              >
                Your glow begins here. Welcome to Reset.
              </motion.p>
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href={siteConfig.booking.primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-jakarta group inline-flex items-center text-white text-sm sm:text-base md:text-lg font-semibold underline underline-offset-4 decoration-white/90 hover:text-brand-300 hover:decoration-brand-300 transition-all duration-300"
                >
                  <span>Book an Appointment</span>
                </a>
              </motion.div>
            </div>

            {/* Combined MEN'S SALON (Together Side-by-Side on the Left, Pure Clean White, No Shadows or Highlights) */}
            <div className="w-full flex items-baseline justify-start overflow-hidden">
              <h1 className="flex items-center flex-wrap gap-x-4 sm:gap-x-6 md:gap-x-8 font-jakarta font-bold tracking-[-0.03em] text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.92] uppercase">
                {/* Word 1: MEN'S */}
                <span className="inline-flex items-center">
                  <RollingLetter char="M" delay={0.1} />
                  <RollingLetter char="E" delay={0.15} />
                  <RollingLetter char="N" delay={0.2} />
                  <RollingLetter char="'" delay={0.25} />
                  <RollingLetter char="S" delay={0.3} />
                </span>

                {/* Word 2: SALON (Placed together with MEN'S) */}
                <span className="inline-flex items-center">
                  <RollingLetter char="S" delay={0.36} />
                  <RollingLetter char="A" delay={0.41} />
                  <RollingLetter char="L" delay={0.46} />
                  <RollingLetter char="O" delay={0.51} />
                  <RollingLetter char="N" delay={0.56} />
                </span>
              </h1>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
