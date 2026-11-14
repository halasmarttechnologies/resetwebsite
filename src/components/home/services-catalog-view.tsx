"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { ServiceCategory, ServiceItem } from "@/types/cms";
import { usePriceList } from "@/context/price-list-context";

export interface ServicesCatalogViewProps {
  categories?: ServiceCategory[];
  services?: ServiceItem[];
}

export function ServicesCatalogView({}: ServicesCatalogViewProps = {}) {
  const [activeCategorySlug, setActiveCategorySlug] = React.useState<string>("facial");
  const { openPriceList } = usePriceList();

  const tabs = [
    {
      id: "all",
      slug: "all",
      label: "ALL RITUALS",
      count: "44 services",
      image: "/images/salon/salon-chairs-floor.webp",
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
      count: "6 services",
      image: "/images/salon/japanese-head-spa-massage.webp",
      title: "FACIAL & SKIN CARE",
      description1:
        "Inspired by nature, light, and the soft rhythm of self-care, our skin treatments are designed to restore balance, nourish deeply, and reveal your natural skin health.",
      description2:
        "From targeted blackhead extraction and face scrubs to high-potency Vitamin C infusions, each facial is performed with clinical-grade serums and master technique.",
    },
    {
      id: "japanese-head-spa",
      slug: "japanese-head-spa",
      label: "HEAD SPA",
      count: "3 rituals",
      image: "/images/salon/japanese-head-spa-halo.webp",
      title: "JAPANESE HEAD SPA",
      description1:
        "Dubai's premier Japanese Head Spa and body recovery sanctuary. Immersive hydrotherapy, microscopic scalp analysis, and acupressure tension release.",
      description2:
        "Cascading herbal waterfall rings, organic scalp infusions, and deep neck-to-shoulder release designed to melt away mental fatigue and stimulate healthy follicle growth.",
    },
    {
      id: "hair-and-beard",
      slug: "hair-and-beard",
      label: "HAIR & BEARD",
      count: "6 services",
      image: "/images/salon/haircut-scissor-detailing.webp",
      title: "HAIR & BEARD CRAFT",
      description1:
        "Precision scissor-over-comb cuts, architectural fades, and traditional royal hot-towel razor shaves crafted by Dubai's top senior barbers.",
      description2:
        "Complete grooming consultations paired with organic beard oils, hair relaxing, and subtle coloring tailored to your personal aesthetic.",
    },
  ];

  const currentTab = tabs.find((t) => t.slug === activeCategorySlug) || tabs[1];

  return (
    <div className="flex w-full flex-col bg-white">
      <section className="relative flex w-full flex-col items-center justify-center border-b border-neutral-200 bg-white py-10 text-noir-950 sm:py-16 md:py-20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16">
          {/* Header Title */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
            <div>
              <span className="block font-jakarta text-xs font-bold uppercase tracking-wider text-neutral-400">
                Treatment Categories
              </span>
              <h2 className="mt-1 font-editorial text-2xl font-bold tracking-tight text-noir-950 sm:text-4xl">
                Explore The Disciplines
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openPriceList()}
                className="rounded-full bg-noir-950 px-4 py-2 font-jakarta text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Slide Price List
              </button>
              <Link
                href="/services"
                className="font-jakarta text-xs font-bold text-noir-950 hover:underline"
              >
                View Full Services Menu →
              </Link>
            </div>
          </div>

          {/* Category Cards Grid */}
          <div className="mb-8 grid w-full grid-cols-2 gap-3 sm:mb-12 sm:gap-5 md:grid-cols-4">
            {tabs.map((tab) => {
              const isActive = tab.slug === activeCategorySlug;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategorySlug(tab.slug)}
                  onMouseEnter={() => setActiveCategorySlug(tab.slug)}
                  className={`group relative flex aspect-[4/3] w-full cursor-pointer flex-col justify-end overflow-hidden rounded-xl p-4 text-left transition-all duration-300 sm:aspect-square sm:p-5 md:aspect-[4/3] ${
                    isActive
                      ? "scale-[1.02] shadow-lg ring-2 ring-noir-950"
                      : "border border-neutral-200 shadow-sm hover:border-neutral-400"
                  }`}
                >
                  {/* Background Image */}
                  <Image
                    src={tab.image}
                    alt={tab.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* High Contrast Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 w-full">
                    <h3 className="font-editorial text-sm font-bold uppercase tracking-tight text-white sm:text-base md:text-lg">
                      {tab.label}
                    </h3>
                    <p className="font-jakarta text-xs text-white/80">{tab.count}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Lower Dynamic Detail Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <div className="grid grid-cols-1 items-start gap-5 pb-4 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <h3 className="font-editorial text-2xl font-bold uppercase leading-tight text-noir-950 sm:text-3xl md:text-4xl">
                    {currentTab.title}
                  </h3>
                </div>

                <div className="space-y-3 lg:col-span-7">
                  <p className="font-jakarta text-sm leading-relaxed text-neutral-700 sm:text-base">
                    {currentTab.description1}
                  </p>
                  <p className="font-jakarta text-sm leading-relaxed text-neutral-500">
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
