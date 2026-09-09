"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * Shared "why choose" 5-pillar ribbon.
 *
 * The 7 per-service originals were structurally identical (5-column
 * grid, index numbers, custom inline SVG icons, hover accent). The
 * icons remain per-service — each discipline has bespoke iconography —
 * so `pillars[].icon` is a JSX node passed straight through; that's
 * why the calling data file uses the `.tsx` extension.
 */

export interface WhyChoosePillar {
  number: string;
  title: string;
  shortDesc: string;
  icon: React.ReactNode;
}

interface WhyChooseSectionProps {
  id?: string;
  eyebrow: string;
  title: string;
  intro: string;
  pillars: WhyChoosePillar[];
}

export function WhyChooseSection({
  id,
  eyebrow,
  title,
  intro,
  pillars,
}: WhyChooseSectionProps) {
  // Tailwind can't see dynamic `lg:grid-cols-${N}` strings during purge,
  // so pick from a static map of the counts we actually use.
  const gridColsByCount: Record<number, string> = {
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
  };
  const lgCols = gridColsByCount[pillars.length] ?? "lg:grid-cols-5";
  const gridClass = `grid grid-cols-1 sm:grid-cols-2 ${lgCols} border-y border-noir-200 divide-y sm:divide-y-0 sm:divide-x divide-noir-200`;

  return (
    <section
      id={id}
      className="relative w-full bg-white text-noir-950 py-12 sm:py-16 md:py-20 border-b border-noir-950/[0.08]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        {/* Compact Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="font-editorial text-[11px] font-semibold tracking-[0.25em] text-noir-500">
              {eyebrow}
            </span>
            <h2 className="mt-2 font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-noir-950">
              {title}
            </h2>
          </div>
          <p className="font-jakarta text-xs sm:text-sm text-noir-600 max-w-md leading-relaxed">
            {intro}
          </p>
        </div>

        <div className={gridClass}>
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="group p-5 sm:p-6 lg:p-7 flex flex-col justify-between hover:bg-neutral-50/80 transition-colors duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-full border border-noir-200 flex items-center justify-center text-noir-950 group-hover:border-noir-950 group-hover:bg-noir-950 group-hover:text-white transition-all duration-300">
                    {pillar.icon}
                  </div>
                  <span className="font-editorial text-xs font-bold text-noir-400 tracking-wider">
                    {pillar.number}
                  </span>
                </div>

                <h3 className="font-editorial text-base sm:text-lg font-bold text-noir-950 leading-snug tracking-tight group-hover:text-black transition-colors">
                  {pillar.title}
                </h3>

                <p className="mt-2.5 font-jakarta text-xs leading-relaxed text-noir-600">
                  {pillar.shortDesc}
                </p>
              </div>

              <div className="mt-6 pt-2 border-t border-transparent group-hover:border-noir-950/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
