"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { ServiceCategory, ServiceItem } from "@/types/cms";

export interface ServicesCatalogViewProps {
  categories?: ServiceCategory[];
  services?: ServiceItem[];
}

export function ServicesCatalogView({}: ServicesCatalogViewProps = {}) {
  const [activeCategorySlug, setActiveCategorySlug] = React.useState<string>("facial");

  // Filter tabs definition matching screenshot 1:1
  const tabs = [
    {
      id: "all",
      slug: "all",
      label: "ALL",
      count: "54 services",
      icon: "○",
      image: "/images/hero/hero-user.webp",
      title: "ALL MASTER SERVICES",
      description1:
        "The complete Reset repertoire: engineered for modern gentlemen who command distinction. Every service is delivered with precision tools, master barbering techniques, and bespoke botanical formulations.",
      description2:
        "Whether you seek an executive haircut, beard architecture, an authentic Japanese head spa ritual, or revitalizing skincare, our master artisans execute each treatment with uncompromising standards.",
    },
    {
      id: "facial",
      slug: "facial",
      label: "SKIN CARE",
      count: "24 services",
      icon: "✕",
      image: "/site-pics/site-2.jpg",
      title: "SKIN CARE",
      description1:
        "Inspired by nature, light, and the soft rhythm of self-care, our skin treatments are designed to restore balance, nourish deeply, and reveal your natural radiance.",
      description2:
        "Whether you seek a glow before a big event or long-term skin health, each treatment is performed with intention, clinical-grade serums, and master touch.",
    },
    {
      id: "japanese-head-spa",
      slug: "japanese-head-spa",
      label: "BODY RITUALS",
      count: "18 services",
      icon: "⬡",
      image: "/site-pics/site-3.jpg",
      title: "BODY RITUALS",
      description1:
        "Dubai's premier Japanese Head Spa and body recovery sanctuary. Immersive hydrotherapy, microscopic scalp analysis, and acupressure tension release.",
      description2:
        "Cascading herbal waterfall rings, organic scalp infusions, and deep neck-to-shoulder release designed to melt away mental fatigue and stimulate healthy follicle growth.",
    },
    {
      id: "hair-and-beard",
      slug: "hair-and-beard",
      label: "HAIR TREATMENTS",
      count: "12 services",
      icon: "✕",
      image: "/images/services/service-hair-beard.webp",
      title: "HAIR TREATMENTS",
      description1:
        "Precision scissor-over-comb cuts, architectural fades, and traditional royal hot-towel razor shaves crafted by Dubai's top senior barbers.",
      description2:
        "Complete grooming consultations paired with organic beard oils, hair reconstruction keratin, and subtle grey blending tailored to your personal aesthetic.",
    },
  ];

  const currentTab = tabs.find((t) => t.slug === activeCategorySlug) || tabs[1];

  // Staggered container animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="w-full flex flex-col bg-white">
      <section className="relative w-full bg-white text-noir-950 flex flex-col justify-center items-center py-8 sm:py-12 md:py-16 overflow-hidden border-b border-noir-950/[0.08]">
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-center">
          {/* Category Cards Grid (Square Boxes, rounded-none) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6 mb-8 sm:mb-14"
          >
            {tabs.map((tab) => {
              const isActive = tab.slug === activeCategorySlug;

              return (
                <motion.button
                  key={tab.id}
                  variants={itemVariants}
                  onClick={() => setActiveCategorySlug(tab.slug)}
                  onMouseEnter={() => setActiveCategorySlug(tab.slug)}
                  onFocus={() => setActiveCategorySlug(tab.slug)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] overflow-hidden rounded-none text-left p-3.5 sm:p-5 md:p-6 flex flex-col justify-end transition-all duration-500 cursor-pointer ${
                    isActive
                      ? "ring-2 ring-noir-950 shadow-2xl scale-[1.02]"
                      : "border border-noir-300 hover:border-noir-900 shadow-sm"
                  }`}
                >
                  {/* Background Image */}
                  <Image
                    src={tab.image}
                    alt={tab.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
                      isActive ? "scale-105" : "scale-100"
                    }`}
                  />

                  {/* Subtle Contrast Gradient for Crystal Clear Text */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive
                        ? "bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100"
                        : "bg-gradient-to-t from-black/80 via-black/35 to-black/10 opacity-95 group-hover:opacity-100"
                    }`}
                  />

                  {/* Content Anchored at Bottom */}
                  <div className="relative z-10 w-full flex items-end justify-between">
                    <div>
                      <h3 className="font-editorial font-semibold text-sm sm:text-base md:text-lg text-white uppercase tracking-tight">
                        {tab.label}
                      </h3>
                      <p className="font-jakarta text-xs sm:text-xs text-white/80">
                        {tab.count}
                      </p>
                    </div>

                    {/* Icon */}
                    <span
                      className={`font-mono text-xs sm:text-base font-bold text-white transition-transform duration-300 ${
                        isActive ? "rotate-45 scale-110" : "group-hover:rotate-45"
                      }`}
                    >
                      {tab.icon}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* 3. Lower Dynamic Detail Section (Title on Left, Philosophy on Right) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-16 items-start pb-4 sm:pb-6">
                {/* Left Column: Huge Category Title */}
                <div className="lg:col-span-5">
                  <h3 className="font-editorial font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-noir-950 tracking-[-0.035em] uppercase leading-tight">
                    {currentTab.title}
                  </h3>
                </div>

                {/* Right Column: 2 Editorial Philosophy Paragraphs */}
                <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
                  <p className="font-jakarta text-noir-700 text-sm sm:text-base md:text-lg font-normal leading-relaxed">
                    {currentTab.description1}
                  </p>
                  <p className="font-jakarta text-noir-600 text-sm sm:text-base font-normal leading-relaxed">
                    {currentTab.description2}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
