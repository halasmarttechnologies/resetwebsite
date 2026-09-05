"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function AboutStatementSection() {
  return (
    <section className="relative w-full min-h-[560px] md:min-h-screen py-16 sm:py-24 md:py-32 bg-white overflow-hidden flex flex-col justify-center items-center select-none border-b border-noir-950/[0.08]">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 md:px-14 lg:px-16 flex flex-col items-center text-center">
        {/* 1. Monumental Statement Headline (Clean, Highly Readable Neo-Grotesque Font Matching Screenshot 1:1) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10"
        >
          <h2 className="font-editorial font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.3rem] text-noir-950 tracking-[-0.04em] leading-[1.04] uppercase text-center">
            WE HELP CREATE
            <br />
            MOMENTS OF BEAUTY
            <br />
            FOR YOU AND
            <br />
            YOUR GLOW
          </h2>
        </motion.div>

        {/* 2. Editorial Description Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl sm:max-w-2xl mx-auto flex flex-col items-center text-center"
        >
          <p className="font-jakarta text-noir-600 text-sm sm:text-base md:text-lg font-normal leading-relaxed text-center mb-6 sm:mb-8 max-w-lg sm:max-w-xl">
            Reset is a premier beauty and grooming studio for modern gentlemen,
            offering expert care for skin, body, and hair. We provide
            personalized consultations to select treatments that precisely
            address each client&apos;s individual needs.
          </p>

          {/* 3. Underlined Action Link (Read More) */}
          <Link
            href="/about"
            className="group relative inline-flex flex-col items-center text-noir-950 font-jakarta text-base sm:text-lg md:text-xl font-semibold tracking-wide hover:text-noir-700 transition-colors duration-300"
          >
            <span>Read More</span>
            {/* Animated Underline */}
            <span className="w-full h-[1.5px] bg-noir-950 mt-1 origin-left transition-transform duration-300 group-hover:scale-x-110" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
