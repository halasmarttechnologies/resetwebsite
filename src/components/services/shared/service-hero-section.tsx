"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Shared hero section for every service page. Every service used to
 * ship its own 140-line copy of this file — the only differences were
 * the image, the two headline words, the subtitle, and the WhatsApp
 * message. Those now come in as props from `src/data/service-pages.tsx`.
 *
 * Visual behavior — the rolling-letter animation, parallax scroll on
 * the image, mobile/desktop image swap, gradient overlay, monumental
 * typography — is byte-for-byte the same as the per-service originals.
 *
 * `titleClass` lets massage + colouring override the default clamp
 * scale (they use smaller typography because their words are longer).
 */

interface ServiceHeroSectionProps {
  desktopImageSrc: string;
  desktopImageAlt: string;
  mobileImageSrc?: string;
  mobileImageAlt?: string;
  /** Two-word title split across the animated hero. */
  titleWords: [string, string];
  subtitle: string;
  whatsappUrl: string;
  /** Optional override for the massive H1 typography scale. */
  titleClass?: string;
  /** Optional override for the gap between title words. */
  titleGapClass?: string;
}

const DEFAULT_TITLE_CLASS =
  "flex flex-col sm:flex-row items-start sm:items-center gap-y-0.5 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 font-editorial font-bold sm:font-black tracking-[-0.03em] text-white text-[clamp(2.9rem,13.5vw,11.5rem)] sm:text-[clamp(4.2rem,12vw,12rem)] leading-[0.86] uppercase text-left";

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
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="inline-block transform-gpu origin-bottom will-change-transform text-white"
      >
        {char}
      </motion.span>
    </span>
  );
}

/** Render one word as a run of rolling letters, timed from `startDelay`. */
function RollingWord({ word, startDelay }: { word: string; startDelay: number }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap">
      {Array.from(word).map((char, i) => (
        <RollingLetter
          key={`${word}-${i}`}
          char={char}
          delay={startDelay + i * 0.05}
        />
      ))}
    </span>
  );
}

export function ServiceHeroSection({
  desktopImageSrc,
  desktopImageAlt,
  mobileImageSrc = "/images/salon/salon-chairs-floor.webp",
  mobileImageAlt,
  titleWords,
  subtitle,
  whatsappUrl,
  titleClass = DEFAULT_TITLE_CLASS,
}: ServiceHeroSectionProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.02]);

  // Second word starts after the first word finishes rolling in.
  const wordOneStart = 0.08;
  const wordTwoStart = wordOneStart + titleWords[0].length * 0.05 + 0.02;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[calc(100vh-44px)] sm:h-[calc(100vh-48px)] min-h-[580px] sm:min-h-[660px] overflow-hidden bg-noir-950 flex items-center justify-center"
    >
      {/* 1. Full Viewport Responsive Fitted Image */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 h-full w-full will-change-transform"
      >
        {/* Desktop Hero Image */}
        <Image
          src={desktopImageSrc}
          alt={desktopImageAlt}
          fill
          priority
          quality={90}
          sizes="(max-width: 640px) 1px, 100vw"
          className="hidden sm:block object-cover object-center"
        />
        {/* Mobile Hero Image */}
        <Image
          src={mobileImageSrc}
          alt={mobileImageAlt ?? desktopImageAlt}
          fill
          priority
          quality={90}
          sizes="(max-width: 640px) 100vw, 1px"
          className="block sm:hidden object-cover object-center"
        />
        {/* Contrast Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 sm:from-black/85 sm:via-black/40 sm:to-black/20 pointer-events-none" />
      </motion.div>

      {/* 2. Hero Bottom Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full pb-16 sm:pb-8 md:pb-10 pointer-events-none">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="mb-4 sm:mb-6 max-w-xl pointer-events-auto overflow-hidden flex flex-col items-start gap-2.5 sm:gap-3">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-jakarta group inline-flex items-center text-white text-xl sm:text-2xl md:text-2xl font-bold underline underline-offset-8 decoration-white/90 hover:decoration-white hover:text-white/85 transition-all duration-300"
              >
                <span>Book an Appointment</span>
              </a>
            </motion.div>

            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="font-jakarta text-white/90 text-base sm:text-lg md:text-lg font-normal tracking-wide leading-relaxed pt-0.5"
            >
              {subtitle}
            </motion.p>
          </div>

          <div className="w-full overflow-hidden pt-1">
            <h1 className={titleClass}>
              <RollingWord word={titleWords[0]} startDelay={wordOneStart} />
              <RollingWord word={titleWords[1]} startDelay={wordTwoStart} />
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
