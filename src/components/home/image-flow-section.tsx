"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface FlowCard {
  id: string;
  index: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

const flowCards: FlowCard[] = [
  {
    id: "head-spa",
    index: "01",
    tag: "HEAD SPA",
    title: "Japanese Head Spa",
    subtitle: "Waterfall Hydrotherapy",
    image: "/images/salon/japanese-head-spa-halo.webp",
    alt: "Reset Japanese Head Spa Waterfall Hydrotherapy",
  },
  {
    id: "facial-care",
    index: "02",
    tag: "FACIAL CARE",
    title: "Cryo Skin Therapy",
    subtitle: "Facial Sculpting & Glow",
    image: "/images/salon/japanese-head-spa-massage.webp",
    alt: "Reset Men Salon Cryo Facial Therapy",
  },
  {
    id: "scalp-rinse",
    index: "03",
    tag: "SCALP RITUAL",
    title: "Scalp Rinse Ritual",
    subtitle: "Deep Follicle Care",
    image: "/images/salon/scalp-rinse-treatment.webp",
    alt: "Reset Artisanal Botanicals and Scalp Rinse Infusion",
  },
  {
    id: "barber-shave",
    index: "04",
    tag: "MASTER BARBER",
    title: "Straight Razor Detailing",
    subtitle: "Hot Towel Shave",
    image: "/images/salon/barber-straight-razor-shave.webp",
    alt: "Reset Master Barber Traditional Straight Razor Detailing",
  },
  {
    id: "hair-cut",
    index: "05",
    tag: "HAIR ARTISTRY",
    title: "Precision Haircut & Fade",
    subtitle: "Bespoke Barbering",
    image: "/images/salon/haircut-skin-fade-profile.webp",
    alt: "Reset Master Barber Precision Haircut and Skin Fade",
  },
];

export function ImageFlowSection() {
  const containerRef = React.useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  // Smooth lens scroll-driven subtle breathing motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const lensScale = useTransform(smoothScroll, [0, 0.5, 1], [0.97, 1, 0.97]);

  // Gentle auto-rotation that pauses when hovering over any card
  React.useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % flowCards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <motion.section
      ref={containerRef}
      style={{ scale: lensScale }}
      className="relative w-full bg-[#070708] text-white py-10 sm:py-14 md:py-16 overflow-hidden select-none"
    >
      {/* Background Soft Optical Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      {/* Container matching screenshot */}
      <div className="w-full max-w-[951px] mx-auto px-3 sm:px-4 md:px-0">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full h-[390px] sm:h-[420px] md:h-[455px] flex flex-row items-stretch gap-2 overflow-hidden"
        >
          {flowCards.map((card, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={card.id}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                style={{ flex: isActive ? 2.66 : 1 }}
                className={`group relative h-full min-w-0 overflow-hidden rounded-xl border border-white/10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer will-change-[flex,transform] ${
                  isActive
                    ? "shadow-2xl ring-1 ring-white/20"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                {/* Background Image with Lens Transition */}
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 80vw, 400px"
                  priority={idx === 0}
                  className={`object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "scale-100 brightness-100 saturate-100"
                      : "scale-105 brightness-[0.45] saturate-75 group-hover:brightness-[0.62]"
                  }`}
                />

                {/* Contrast Gradient Overlays */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                    isActive
                      ? "bg-gradient-to-t from-black/85 via-black/15 to-black/30"
                      : "bg-black/50 group-hover:bg-black/30"
                  }`}
                />

                {/* ── ACTIVE CARD: TOP CLEAN CATEGORY TAG ── */}
                <div
                  className={`absolute top-0 right-0 p-3.5 sm:p-4 z-10 transition-all duration-300 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <span className="font-jakarta text-[10px] sm:text-[11px] text-white/90 font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                    {card.tag}
                  </span>
                </div>

                {/* ── ACTIVE CARD: MINIMAL CLEAN SERVICE TITLE & SUBTITLE ── */}
                <div
                  className={`absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 transition-all duration-500 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
                  }`}
                >
                  <h3 className="font-editorial text-base sm:text-lg md:text-xl text-white font-bold tracking-tight leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-jakarta text-xs text-white/75 mt-0.5 font-normal">
                    {card.subtitle}
                  </p>
                </div>

                {/* ── INACTIVE CARD: MINIMAL SERVICE TITLE ONLY ── */}
                <div
                  className={`absolute bottom-0 inset-x-0 p-2.5 sm:p-3 z-10 transition-all duration-500 pointer-events-none ${
                    !isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                >
                  <p className="font-editorial text-[10px] sm:text-[11px] text-white/90 font-semibold truncate leading-tight">
                    {card.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
