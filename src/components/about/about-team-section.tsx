"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { teamMembers } from "@/data/team";
import { siteConfig } from "@/config/site";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: LUXURY_EASE },
  },
};

export function AboutTeamSection() {
  return (
    <section
      id="about-team"
      className="relative w-full overflow-hidden bg-white text-noir-950 pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 border-b border-noir-950/10"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-8 md:px-12">
        {/* ── Section Header with Client's Exact Manifesto ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="font-editorial text-xs font-semibold uppercase tracking-[0.2em] text-noir-500">
            Sanctuary & Mastery
          </span>

          <h2 className="mt-3 font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-noir-950 uppercase">
            Our Team
          </h2>

          <p className="mt-6 font-jakarta text-base sm:text-lg md:text-xl leading-relaxed text-noir-700 font-normal">
            At Reset, we go beyond a standard barbershop, offering a complete
            men’s grooming experience. Our skilled team provides precise
            haircuts, beard shaping, advanced hair treatments, professional
            coloring, facials, nail care, relaxing massages, detailed waxing,
            and the signature Japanese Head Spa for total scalp health and deep
            relaxation. Each service is delivered with expert technique in a calm
            setting, so you leave looking sharp, feeling confident, and
            refreshed.
          </p>
        </motion.div>

        {/* ── Team Specialist Cards: Single & Bigger on Mobile, 5 in One Row on Desktop ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-4 md:gap-6 w-full max-w-[380px] sm:max-w-[1300px] mx-auto"
        >
          {teamMembers.map((member) => (
            <motion.article
              key={member.id}
              variants={cardVariants}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-noir-950 border border-noir-950/10 shadow-sm transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                src={member.avatar.url}
                alt={member.avatar.alt}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 20vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.article>
          ))}
        </motion.div>

        {/* ── CTA Action ── */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href={siteConfig.booking.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-noir-950 px-9 py-3.5 font-editorial text-xs sm:text-sm font-semibold tracking-wider text-white transition-all duration-300 hover:scale-105 hover:bg-noir-800"
          >
            <span>Book With A Master</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
              aria-hidden
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
