"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface TrueParallaxItem {
  id: string;
  src: string;
  alt: string;
  badge?: string;
  title?: string;
  subtitle?: string;
}

const defaultParallaxItems: TrueParallaxItem[] = [
  {
    id: "parallax-head-spa",
    src: "/images/salon/japanese-head-spa-halo.webp",
    alt: "Reset Men Salon Japanese Head Spa Hydro Halo Bed Treatment",
  },
  {
    id: "parallax-haircut",
    src: "/images/salon/haircut-skin-fade-profile.webp",
    alt: "Reset Master Barber Precision Haircut and Skin Fade",
  },
  {
    id: "parallax-razor",
    src: "/images/salon/barber-straight-razor-shave.webp",
    alt: "Master Barber Traditional Straight Razor Detailing and Shave",
  },
  {
    id: "parallax-massage",
    src: "/images/salon/japanese-head-spa-massage.webp",
    alt: "Reset Men Salon Facial Massage and Scalp Care Ritual",
  },
  {
    id: "parallax-scissor",
    src: "/images/salon/haircut-scissor-detailing.webp",
    alt: "Reset Master Barber Precision Scissor Detailing",
  },
  {
    id: "parallax-pedicure",
    src: "/images/salon/pedicure-luxury-soak.webp",
    alt: "Reset Men Salon Executive Foot Care & Luxury Soak",
  },
];

interface TrueParallaxCardProps {
  item: TrueParallaxItem;
  priority?: boolean;
}

function TrueParallaxCard({ item, priority = false }: TrueParallaxCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Track vertical scroll progress of this specific container relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Architecturally tuned spring physics for buttery smooth motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.7,
    restDelta: 0.001,
  });

  // Map vertical scroll progress (0 = entering bottom, 1 = exiting top)
  // Internal image offset translates from -14% to +14% creating cinematic parallax depth
  const y = useTransform(smoothProgress, [0, 1], ["-14%", "14%"]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1.08, 1.03, 1.08]);

  return (
    <div
      ref={containerRef}
      className="group relative w-full aspect-[16/9] sm:aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-none shadow-sm bg-neutral-950 select-none"
    >
      {/* 
        The internal image is oversized (-top-[16%] and h-[132%])
        so that vertical parallax translation reveals new areas of the image
        seamlessly without ever clipping or showing container edges.
      */}
      <motion.div
        style={{ y, scale }}
        className="absolute -top-[16%] left-0 right-0 h-[132%] w-full will-change-transform"
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 1920px) 100vw, 1920px"
          priority={priority}
          className="object-cover object-center pointer-events-none select-none rounded-none transition-opacity duration-700"
        />
      </motion.div>
    </div>
  );
}

export function TrueParallaxShowcaseSection({
  items = defaultParallaxItems,
}: {
  items?: TrueParallaxItem[];
}) {
  return (
    <section className="relative w-full bg-white py-4 sm:py-6 md:py-8 overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-4 space-y-2 sm:space-y-3">
        {items.map((item, index) => (
          <TrueParallaxCard
            key={item.id}
            item={item}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
