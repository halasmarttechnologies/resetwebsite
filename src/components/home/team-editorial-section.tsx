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

export function TeamEditorialSection() {
  return (
    <section
      id="team"
      className="relative w-full overflow-hidden bg-white text-noir-950 pt-16 sm:pt-20 md:pt-28 pb-10 sm:pb-14"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-8 md:px-12">
        {/* ── Centered Header with website font (Outfit / font-editorial) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-editorial text-xs font-semibold uppercase tracking-[0.2em] text-noir-500">
            Our Specialists
          </span>

          <h2 className="mt-3 font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-noir-950">
            Our Team Specialists
          </h2>

          <p className="mt-4 font-jakarta text-sm sm:text-base leading-relaxed text-noir-600">
            The Reset team is passionate about the art of male grooming. From
            precision haircuts to advanced Japanese scalp therapies, our
            specialists combine craftsmanship, technique, and care to deliver
            flawless results.
          </p>
        </motion.div>

        {/* ── Team Cards: Single and bigger on mobile, 5 in one row on desktop ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 sm:gap-4 md:gap-6 w-full max-w-[380px] sm:max-w-[1300px] mx-auto"
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

        {/* ── Booking Link ────────────────────────────────────────── */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href={siteConfig.booking.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-noir-950 px-8 py-3 font-editorial text-xs font-semibold tracking-wider text-white transition-all duration-300 hover:scale-105 hover:bg-noir-800"
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
