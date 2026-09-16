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
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 mb-12 sm:mb-16"
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
                className="w-full h-full"
              >
                <a
                  href={service.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col h-full bg-white transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-noir-950 cursor-pointer"
                >
                  {/* 1. Top Media Container */}
                  <div className="relative w-full aspect-[4/4.4] overflow-hidden bg-[#f4f4f6] shrink-0 border border-black/[0.06]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104"
                    />
                  </div>

                  {/* 2. Text & Meta Information Area */}
                  <div className="pt-3 pb-2.5 px-0.5 flex flex-col bg-white">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-jakarta font-medium text-sm sm:text-[15px] md:text-base text-noir-950 tracking-tight group-hover:text-neutral-700 transition-colors">
                        {service.title}
                      </h3>
                      <span className="font-jakarta text-xs sm:text-sm font-normal text-noir-950 shrink-0">
                        {service.price}
                      </span>
                    </div>

                    <div className="mt-0.5">
                      <span className="font-jakarta text-xs text-neutral-500 font-normal">
                        {service.duration || service.category}
                      </span>
                    </div>
                  </div>

                  {/* 3. Bottom Full-Width Solid Button */}
                  <div className="mt-1 w-full">
                    <div className="w-full py-2.5 sm:py-3 bg-noir-950 group-hover:bg-neutral-800 text-white text-xs sm:text-[13px] font-jakarta font-medium tracking-wide text-center transition-colors">
                      Select Service
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
