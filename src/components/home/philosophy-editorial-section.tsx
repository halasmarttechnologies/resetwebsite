"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function PhilosophyEditorialSection() {
  const containerRef = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll-driven subtle scale effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  return (
    <motion.section
      ref={containerRef}
      style={{ scale }}
      className="relative w-full bg-white text-noir-950 flex flex-col justify-center items-center py-16 sm:py-20 md:py-28 px-4 sm:px-8 md:px-16 overflow-hidden border-b border-noir-950/[0.08]"
    >
      <div className="relative z-10 max-w-[1240px] mx-auto w-full flex flex-col items-center text-center">
        {/* 1. Small Top Eyebrow Badge (Sentence Case / Lowercase) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 sm:mb-8"
        >
          <span className="font-editorial text-xs sm:text-sm font-medium tracking-wide text-noir-500">
            Empower your grooming &amp; skin care
          </span>
        </motion.div>

        {/* 2. Statement Headline with Exact Lowercase / Sentence Case Typography */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto mb-8 sm:mb-12"
        >
          <h2 className="font-editorial font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] text-noir-950 tracking-[-0.03em] leading-[1.12] text-center max-w-5xl mx-auto">
            The harmony between
            <br />
            <span className="text-noir-800">powerful ingredients</span>
            <br />
            and refined gentlemen routines
          </h2>
        </motion.div>

        {/* 3. Oval Pill Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4"
        >
          <Link
            href="/about"
            className="group relative inline-flex items-center justify-center px-7 sm:px-10 py-2.5 sm:py-3 rounded-full border border-noir-900 bg-transparent text-noir-950 hover:bg-noir-950 hover:text-white text-xs sm:text-sm font-editorial font-semibold tracking-wider transition-all duration-300 hover:scale-105"
          >
            <span>Read more</span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
