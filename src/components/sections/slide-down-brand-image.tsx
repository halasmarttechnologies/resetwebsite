"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function SlideDownBrandImage() {
  const containerRef = React.useRef<HTMLElement>(null);

  // Track scroll position of this section relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Silky smooth spring physics for scroll response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    mass: 0.7,
  });

  // Slide Down: The image starts higher up (-80px) and slides down into position as you scroll
  const y = useTransform(smoothProgress, [0, 1], [-80, 0]);

  // Opens Up: Starts slightly condensed (0.92) and opens up to full 1.0 scale
  const scale = useTransform(smoothProgress, [0, 1], [0.92, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-6 sm:py-10 md:py-14 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          style={{ y, scale }}
          className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-noir-950/[0.08] bg-noir-950 will-change-transform"
        >
          <Image
            src="/picture.webp"
            alt="Reset Men Salon Experience"
            width={1672}
            height={941}
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="w-full h-auto object-cover rounded-none block"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
