"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface FlowCard {
  id: string;
  index: string;
  tag: string;
  image: string;
  alt: string;
  col1Title: string;
  col1Subtitle: string;
  col2Title: string;
  col2Subtitle: string;
  col3Title: string;
  col3Subtitle: string;
}

const flowCards: FlowCard[] = [
  {
    id: "head-spa",
    index: "01",
    tag: "HEAD SPA",
    image: "/site-pics/site-3.jpg",
    alt: "Reset Japanese Head Spa Waterfall Hydrotherapy",
    col1Title: "Japanese Head Spa",
    col1Subtitle: "Waterfall hydrotherapy",
    col2Title: "Monday — Sunday",
    col2Subtitle: "10:00 AM — 10:00 PM",
    col3Title: "Business Bay, Dubai",
    col3Subtitle: "Private suite booking",
  },
  {
    id: "facial-care",
    index: "02",
    tag: "FACIAL CARE",
    image: "/site-pics/site-2.jpg",
    alt: "Reset Men Salon Cryo Facial Therapy",
    col1Title: "Cryo Skin Therapy",
    col1Subtitle: "Facial sculpting & glow",
    col2Title: "Daily Appointments",
    col2Subtitle: "45 & 60 min rituals",
    col3Title: "Clinical Botanicals",
    col3Subtitle: "Deep hydration barrier",
  },
  {
    id: "botanicals",
    index: "03",
    tag: "BOTANICALS",
    image: "/site-pics/site-4.jpg",
    alt: "Reset Artisanal Botanicals and Scalp Serum Pipette Infusion",
    col1Title: "Botanical Infusion",
    col1Subtitle: "Targeted scalp serums",
    col2Title: "Organic Actives",
    col2Subtitle: "Oribe · Davines · Shu",
    col3Title: "Custom Blends",
    col3Subtitle: "Tailored follicle care",
  },
  {
    id: "acupressure",
    index: "04",
    tag: "RECOVERY",
    image: "/site-pics/site-7.jpg",
    alt: "Reset Therapeutic Acupressure Tension Release Massage",
    col1Title: "Acupressure Relief",
    col1Subtitle: "Deep tension recovery",
    col2Title: "Master Barbers",
    col2Subtitle: "Over 10+ years craft",
    col3Title: "Mental Reset",
    col3Subtitle: "Cervical & scalp release",
  },
  {
    id: "steam-ritual",
    index: "05",
    tag: "SANCTUARY",
    image: "/site-pics/site-12.jpg",
    alt: "Reset Herbal Steam Mist and Facial Mask Experience",
    col1Title: "Herbal Steam Ritual",
    col1Subtitle: "Pore purification",
    col2Title: "Full Sanctuary",
    col2Subtitle: "Quiet luxury lounge",
    col3Title: "Executive Care",
    col3Subtitle: "Business Bay, Dubai",
  },
];

export function ImageFlowSection() {
  const containerRef = React.useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [mode, setMode] = React.useState<"manual" | "auto">("manual");
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

  // Auto-play interval when in "auto" mode and not actively hovering
  React.useEffect(() => {
    if (mode !== "auto" || isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % flowCards.length);
    }, 3400);

    return () => clearInterval(interval);
  }, [mode, isHovered]);

  return (
    <motion.section
      ref={containerRef}
      style={{ scale: lensScale }}
      className="relative w-full bg-[#070708] text-white py-10 sm:py-14 md:py-16 overflow-hidden select-none"
    >
      {/* Background Soft Optical Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      {/* 
        Container mathematically tuned to match the screenshot 1:1:
        Total width: 951px (Active: 367px, 4 Inactive: 138px each, 4 gaps: 8px each)
        Total height: 455px (Active ratio: ~4:5 / 0.807)
        Generous dark canvas margins on left & right on desktop.
      */}
      <div className="w-full max-w-[951px] mx-auto px-3 sm:px-4 md:px-0">
        {/* ────────────────────────────────────────────────────────
            5-CARD ACCORDION FLOW
            Exact dimensions from screenshot:
            Container: 951px x 455px
            Active card: 367px x 455px
            Inactive cards: 138px x 455px
            Gap: 8px (gap-2)
            ──────────────────────────────────────────────────────── */}
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
                      ? "bg-gradient-to-t from-black/90 via-black/20 to-black/40"
                      : "bg-black/50 group-hover:bg-black/30"
                  }`}
                />

                {/* ── ACTIVE CARD: TOP HEADER (Logo Left, Tag Right Matching Screenshot) ── */}
                <div
                  className={`absolute top-0 inset-x-0 p-3.5 sm:p-4 md:p-5 flex items-center justify-between z-10 transition-all duration-300 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-white inline-block shadow-sm" />
                    <span className="font-editorial text-xs sm:text-sm font-bold tracking-widest text-white uppercase">
                      RESET
                    </span>
                  </div>
                  <span className="font-jakarta text-[10px] sm:text-xs text-neutral-300 font-semibold tracking-wider uppercase">
                    {card.tag}
                  </span>
                </div>

                {/* ── ACTIVE CARD: BOTTOM 3-COL METADATA (Matching Screenshot - Floating Text, No Divider) ── */}
                <div
                  className={`absolute bottom-0 inset-x-0 p-3.5 sm:p-4 md:p-5 z-10 transition-all duration-500 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
                  }`}
                >
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <p className="font-editorial text-[11px] sm:text-xs text-white font-semibold leading-tight truncate">
                        {card.col1Title}
                      </p>
                      <p className="font-jakarta text-[10px] text-neutral-400 mt-0.5 truncate">
                        {card.col1Subtitle}
                      </p>
                    </div>
                    <div>
                      <p className="font-editorial text-[11px] sm:text-xs text-white font-semibold leading-tight truncate">
                        {card.col2Title}
                      </p>
                      <p className="font-jakarta text-[10px] text-neutral-400 mt-0.5 truncate">
                        {card.col2Subtitle}
                      </p>
                    </div>
                    <div>
                      <p className="font-editorial text-[11px] sm:text-xs text-white font-semibold leading-tight truncate">
                        {card.col3Title}
                      </p>
                      <p className="font-jakarta text-[10px] text-neutral-400 mt-0.5 truncate">
                        {card.col3Subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── INACTIVE CARD: BOTTOM 2-LINE MUTED TEXT (Matching Screenshot) ── */}
                <div
                  className={`absolute bottom-0 inset-x-0 p-2.5 sm:p-3 z-10 transition-all duration-500 pointer-events-none ${
                    !isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                >
                  <p className="font-editorial text-[10px] sm:text-[11px] text-neutral-400 font-medium truncate leading-tight">
                    {card.col1Title}
                  </p>
                  <p className="font-jakarta text-[9px] sm:text-[10px] text-neutral-500 truncate mt-0.5">
                    {card.col2Title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ────────────────────────────────────────────────────────
            BOTTOM CONTROLS PILL: [ Manual ] / [ Auto ]
            Matching Screenshot 1:1
            ──────────────────────────────────────────────────────── */}
        <div className="flex justify-center items-center mt-6 sm:mt-8">
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#161618] border border-white/10 shadow-lg backdrop-blur-md">
            <button
              onClick={() => setMode("manual")}
              className={`px-4 sm:px-5 py-1 sm:py-1.5 rounded-full font-jakarta text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-300 ${
                mode === "manual"
                  ? "bg-white text-noir-950 shadow-md scale-100"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Manual
            </button>
            <button
              onClick={() => setMode("auto")}
              className={`px-4 sm:px-5 py-1 sm:py-1.5 rounded-full font-jakarta text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-300 ${
                mode === "auto"
                  ? "bg-white text-noir-950 shadow-md scale-100"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Auto
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
