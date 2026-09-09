"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";

/**
 * Shared "menu" grid for each service page. Original per-service copies
 * differed only in the item list, the section title, subtitle, and the
 * filter tab labels. Everything else — card layout, filter pill styling,
 * stagger + entrance animation, WhatsApp deep-link handling — was
 * identical, so it lives here once.
 */

const LUXURY_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export interface ServiceItemCard {
  id: string;
  title: string;
  /** Free-form filter bucket key — must match one of `filters.categories[].id`. */
  category: string;
  description: string;
  price: string;
  image: string;
  whatsappUrl: string;
  /**
   * Optional duration pill (e.g. "75 Minutes") rendered next to the
   * price when present. Currently only used by Japanese Head Spa
   * ritual cards — preserved from the original component.
   */
  duration?: string;
}

export interface ServiceFilterCategory {
  id: string;
  label: string;
  /** Optional badge count shown in parentheses next to the label. */
  count?: number;
}

interface ServiceListSectionProps {
  id?: string;
  title: string;
  subtitle: string;
  items: ServiceItemCard[];
  filters?: {
    /** Label for the "no filter" pill. Defaults to `All`. */
    allLabel?: string;
    categories: ServiceFilterCategory[];
  };
  /** Bottom CTA text + link. */
  footerCta: {
    label: string;
    href: string;
  };
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: LUXURY_EASE },
  },
};

export function ServiceListSection({
  id,
  title,
  subtitle,
  items,
  filters,
  footerCta,
}: ServiceListSectionProps) {
  const [activeTab, setActiveTab] = React.useState<string>("all");

  const filteredItems = React.useMemo(() => {
    if (activeTab === "all") return items;
    return items.filter((item) => item.category === activeTab);
  }, [activeTab, items]);

  const pillClass = (isActive: boolean) =>
    `px-5 py-1.5 rounded-full text-xs font-jakarta font-bold tracking-wider transition-all duration-200 ${
      isActive
        ? "bg-noir-950 text-white shadow-sm"
        : "text-noir-600 hover:text-noir-950"
    }`;

  return (
    <section
      id={id}
      className="relative w-full py-14 sm:py-20 md:py-24 bg-white overflow-hidden flex flex-col justify-center items-center border-b border-noir-950/[0.08]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="mb-8 sm:mb-12 text-center max-w-2xl"
        >
          <h2 className="font-editorial font-bold text-3xl sm:text-4xl md:text-5xl text-noir-950 tracking-tight">
            {title}
          </h2>
          <p className="mt-3 font-jakarta text-sm sm:text-base text-noir-600 leading-relaxed">
            {subtitle}
          </p>

          {/* Optional Interactive Filter Pills */}
          {filters ? (
            <div className="mt-6 inline-flex items-center p-1 rounded-full bg-neutral-100 border border-noir-200">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={pillClass(activeTab === "all")}
              >
                {filters.allLabel ?? "All"} ({items.length})
              </button>
              {filters.categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={pillClass(activeTab === cat.id)}
                >
                  {cat.label}
                  {cat.count !== undefined ? ` (${cat.count})` : ""}
                </button>
              ))}
            </div>
          ) : null}
        </motion.div>

        {/* Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-14"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <a
                  href={service.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block w-full aspect-[16/10] sm:aspect-[16/11] overflow-hidden bg-noir-900 rounded-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-noir-950"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />

                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
                    {service.duration ? (
                      <span className="font-jakarta text-[11px] font-semibold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/15">
                        {service.duration}
                      </span>
                    ) : null}
                    <span className="font-editorial text-xs sm:text-sm font-bold text-white bg-black/75 backdrop-blur-md px-3 py-1 border border-white/20 tracking-wider">
                      {service.price}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-7 flex items-end justify-between z-10">
                    <div className="flex flex-col text-left pr-3">
                      <h3 className="font-editorial font-semibold text-base sm:text-xl md:text-2xl text-white tracking-[-0.02em] leading-tight transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="font-jakarta text-2xs sm:text-xs text-white/80 font-normal mt-1 tracking-wide line-clamp-2 max-w-xs">
                        {service.description}
                      </p>
                      <span className="mt-2.5 inline-flex items-center gap-1 font-jakarta text-[11px] tracking-wider text-white font-semibold underline underline-offset-4 decoration-white/60 group-hover:decoration-white">
                        <span>Schedule a Visit</span>
                      </span>
                    </div>

                    <div className="shrink-0 flex items-center justify-center text-white/90 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 sm:w-6 sm:h-6"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: LUXURY_EASE }}
          className="flex justify-center"
        >
          <a
            href={footerCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex flex-col items-center text-noir-950 font-jakarta text-base sm:text-lg md:text-xl font-semibold tracking-wide hover:text-noir-700 transition-colors duration-300"
          >
            <span>{footerCta.label}</span>
            <span className="w-full h-[1.5px] bg-noir-950 mt-1 origin-left transition-transform duration-300 group-hover:scale-x-110" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
