"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/config/site";

// Smooth 3D Rolling Letter component for elegant entrance without shadows or highlights
function RollingLetter({
  char,
  delay = 0,
  className = "",
}: {
  char: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block overflow-hidden h-[1.12em] leading-[0.88] align-baseline -mr-[0.02em] sm:-mr-[0.025em] last:mr-0 ${className}`}
    >
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
      className="relative w-full h-[calc(100dvh-52px)] sm:h-[calc(100dvh-56px)] md:h-[calc(100dvh-60px)] min-h-[540px] sm:min-h-[660px] overflow-hidden bg-noir-950 flex items-center justify-center"
    >
      {/* 1. Full Viewport Responsive Fitted Image (Landscape 16:9 Architectural View) */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 h-full w-full will-change-transform"
      >
        {/* High-Resolution Hero Background Image */}
        <Image
          src="/images/hero-salon-landscape.jpg"
          alt="Reset Men Salon — Luxury Interior Business Bay Dubai"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle Contrast Gradient Overlay for Text Readability & Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 pointer-events-none" />
      </motion.div>

      {/* 2. Hero Content Overlay (Lifted up safely in viewport on mobile) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full pb-14 sm:pb-8 md:pb-10 pb-[max(3.5rem,env(safe-area-inset-bottom))] pointer-events-none">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          {/* Micro Copy & Action Link (Lifted with responsive gap) */}
          <div className="mb-3 sm:mb-6 max-w-lg pointer-events-auto overflow-hidden flex flex-col items-start gap-1.5 sm:gap-3">
            {/* Action Link: Book an Appointment */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={siteConfig.booking.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-red-rose group inline-flex items-center text-white text-lg sm:text-2xl md:text-2xl font-bold underline underline-offset-6 sm:underline-offset-8 decoration-white/90 hover:decoration-white hover:text-white/85 transition-all duration-300"
              >
                <span>Book an Appointment</span>
              </a>
            </motion.div>

            {/* Subtext: Your glow begins here. Welcome to Reset. */}
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="font-red-rose text-white/90 text-sm sm:text-base md:text-lg font-normal tracking-wide leading-relaxed"
            >
              Your glow begins here. Welcome to Reset.
            </motion.p>
          </div>

          {/* Monumental Typography: MEN'S on line 1, SALON on line 2 on mobile; horizontal on desktop */}
          <div className="w-full overflow-hidden pt-0.5">
            <h1 className="flex flex-col sm:flex-row items-start sm:items-center gap-y-1 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 font-red-rose font-bold tracking-tight text-white text-[clamp(2.6rem,11.5vw,12rem)] sm:text-[clamp(4.2rem,13vw,13rem)] leading-[0.88] uppercase text-left">
              {/* Word 1: MEN'S */}
              <span className="inline-flex items-center whitespace-nowrap">
                <RollingLetter char="M" delay={0.08} />
                <RollingLetter char="E" delay={0.13} />
                <RollingLetter char="N" delay={0.18} />
                <RollingLetter char="'" delay={0.23} className="-mx-[0.02em]" />
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
