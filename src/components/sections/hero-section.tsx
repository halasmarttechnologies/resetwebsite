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
    <span className="relative inline-block overflow-hidden h-[1.12em] leading-[0.88] align-baseline select-none">
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
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.02]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-screen overflow-hidden bg-noir-950 flex items-center justify-center"
    >
      {/* 1. Full Viewport Responsive Fitted Image (Fully Visible, Perfectly Framed) */}
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
          sizes="100vw"
          className="object-cover object-[center_top] sm:object-[center_18%] md:object-[center_15%] lg:object-[center_12%]"
        />
      </motion.div>

      {/* 2. Hero Bottom Content Overlay (Anchored to Bottom Edge, Aligned to Grid) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full pb-6 sm:pb-8 md:pb-10 pointer-events-none">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          {/* Bottom-Left Micro Copy & Action Link (Book an Appointment on TOP, Subtext UNDER it) */}
          <div className="mb-3 sm:mb-4 max-w-md pointer-events-auto overflow-hidden flex flex-col items-start">
            {/* Action Link: Book an Appointment (First) */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={siteConfig.booking.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-jakarta group inline-flex items-center text-white text-lg sm:text-xl md:text-2xl font-bold underline underline-offset-4 decoration-white hover:text-white/85 transition-all duration-300 mb-1"
              >
                <span>Book an Appointment</span>
              </a>
            </motion.div>

            {/* Subtext: Your glow begins here. Welcome to Reset. (Underneath Book an Appointment) */}
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="font-jakarta text-white text-sm sm:text-base md:text-lg font-medium tracking-wide leading-snug"
            >
              Your glow begins here. Welcome to Reset.
            </motion.p>
          </div>

          {/* Monumental Typography: MEN'S SALON (Balanced Grand Scale on Mobile & Desktop) */}
          <div className="w-full overflow-hidden pt-1">
            <h1 className="inline-flex items-center flex-nowrap whitespace-nowrap gap-x-2 sm:gap-x-4 md:gap-x-7 lg:gap-x-10 font-editorial font-bold sm:font-black tracking-[-0.04em] text-white text-[clamp(3.5rem,11.8vw,11.5rem)] leading-[0.88] uppercase">
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
    </section>
  );
}
