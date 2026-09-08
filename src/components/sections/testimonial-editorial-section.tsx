"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function TestimonialEditorialSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeTestimonial = testimonials[activeIndex] ?? testimonials[0];

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-white text-noir-950 pt-10 sm:pt-14 pb-20 sm:pb-28 border-b border-noir-950/10"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-8 md:px-12 text-center">
        {/* Eyebrow */}
        <span className="font-editorial text-xs font-semibold uppercase tracking-[0.2em] text-noir-500">
          Testimonials
        </span>

        {/* Title matching reference screenshot with website font */}
        <h2 className="mt-3 font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-noir-950">
          What Our Clients Say?
        </h2>

        {/* 5 Solid Stars */}
        <div className="mt-5 flex items-center justify-center gap-1 text-noir-950">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="h-4 w-4 fill-current sm:h-5 sm:w-5"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Active Testimonial Quote with smooth transition */}
        <div className="relative mx-auto mt-6 min-h-[140px] max-w-3xl sm:mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: LUXURY_EASE }}
              className="flex flex-col items-center"
            >
              <blockquote className="font-jakarta text-base sm:text-lg md:text-xl font-normal leading-relaxed text-noir-800">
                &ldquo;{activeTestimonial.comment}&rdquo;
              </blockquote>

              <div className="mt-5 text-center">
                <p className="font-jakarta text-sm font-semibold text-noir-950">
                  {activeTestimonial.authorName}
                </p>
                <p className="mt-0.5 font-jakarta text-xs text-noir-500">
                  {activeTestimonial.authorTitle}
                  {activeTestimonial.serviceMentioned
                    ? ` · ${activeTestimonial.serviceMentioned}`
                    : ""}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Circular Client Avatars Row matching reference screenshot */}
        <div className="mt-10 flex items-center justify-center gap-3 sm:gap-4">
          {testimonials.map((t, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={t.id}
                type="button"
                aria-label={`View testimonial by ${t.authorName}`}
                onClick={() => setActiveIndex(idx)}
                className={`relative h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden transition-all duration-300 focus:outline-none ${
                  isActive
                    ? "scale-110 ring-2 ring-noir-950 ring-offset-2 ring-offset-white opacity-100 shadow-sm"
                    : "opacity-45 hover:opacity-90 hover:scale-105"
                }`}
              >
                {t.avatar?.url ? (
                  <Image
                    src={t.avatar.url}
                    alt={t.authorName}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-noir-200 text-xs font-bold text-noir-700">
                    {t.authorName.charAt(0)}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
