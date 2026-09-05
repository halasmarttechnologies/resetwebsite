"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function PhilosophyEditorialSection() {
  const containerRef = React.useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll-driven subtle scale effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ scale }}
      className="relative sticky top-0 z-20 w-full min-h-[550px] md:min-h-screen bg-[#fbfbf9] text-noir-950 flex flex-col justify-center items-center select-none py-16 sm:py-28 md:py-40 px-4 sm:px-8 md:px-16 overflow-hidden rounded-none border-t border-b border-noir-950/[0.08]"
    >
      {/* Interactive Smooth Lens / Glow Cursor Follower */}
      <motion.div
        animate={{
          x: mousePos.x - 75,
          y: mousePos.y - 75,
          opacity: isHovered ? 0.35 : 0,
          scale: isHovered ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.2 }}
        className="pointer-events-none absolute w-[150px] h-[150px] rounded-full bg-gradient-to-tr from-amber-200/30 to-brand-gold/20 blur-2xl z-0"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto w-full flex flex-col items-center text-center">
        {/* 1. Small Top Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 sm:mb-8"
        >
          <span className="font-editorial text-[0.65rem] sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] text-noir-500 uppercase">
            EMPOWER YOUR GROOMING &amp; SKIN CARE
          </span>
        </motion.div>

        {/* 2. Monumental Statement Headline with Exact Font from Second Section */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto mb-8 sm:mb-12"
        >
          <h2 className="font-editorial font-semibold text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-[4.6rem] xl:text-[5rem] text-noir-950 tracking-[-0.035em] leading-[1.08] uppercase text-center">
            THE HARMONY BETWEEN
            <br />
            <span className="text-noir-800">POWERFUL INGREDIENTS</span>
            <br />
            AND REFINED
            <br />
            GENTLEMEN ROUTINES
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
            className="group relative inline-flex items-center justify-center px-7 sm:px-10 py-2.5 sm:py-3 rounded-full border border-noir-900 bg-transparent text-noir-950 hover:bg-noir-950 hover:text-white text-xs sm:text-sm font-editorial font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105"
          >
            <span>READ MORE</span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
