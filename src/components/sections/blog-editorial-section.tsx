"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { blogPosts } from "@/data/blog";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: LUXURY_EASE },
  },
};

export function BlogEditorialSection() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section
      id="journal"
      className="relative w-full overflow-hidden bg-white text-noir-950 py-20 sm:py-28 md:py-32 border-b border-noir-950/10"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-8 md:px-12">
        {/* ── Section Header (Neat & Clean White Aesthetic) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-editorial text-xs font-semibold uppercase tracking-[0.2em] text-noir-500">
            The Editorial Journal
          </span>

          <h2 className="mt-3 font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-noir-950 uppercase">
            Grooming & Scalp Insights
          </h2>

          <p className="mt-4 font-jakarta text-sm sm:text-base leading-relaxed text-noir-600">
            Thoughtful guides on Japanese head spa rituals, beard sculpting, and
            hair architecture from our master specialists in Business Bay, Dubai.
          </p>
        </motion.div>

        {/* ── Blog Grid (3 Clean, Neat White Editorial Cards) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-[1300px] mx-auto"
        >
          {featuredPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-noir-950/10 transition-all duration-500 hover:shadow-xl hover:border-noir-950/25"
            >
              {/* Cover Image Frame */}
              <Link
                href={`/blog/${post.slug}`}
                className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 block"
              >
                <Image
                  src={post.coverImage.url}
                  alt={post.coverImage.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500" />

                {/* Category Badge */}
                <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 font-editorial text-2xs font-semibold uppercase tracking-wider text-noir-950 shadow-sm">
                  {post.category.title}
                </span>

                {/* Reading Time */}
                <span className="absolute bottom-4 right-4 rounded-full bg-black/70 backdrop-blur-md px-2.5 py-0.5 font-jakarta text-2xs text-white/90">
                  {post.readingTimeMinutes} min read
                </span>
              </Link>

              {/* Editorial Content */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7 bg-white">
                <div>
                  <span className="font-jakarta text-2xs font-medium uppercase tracking-wider text-noir-400">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>

                  <h3 className="mt-2 font-editorial text-xl sm:text-2xl font-bold leading-snug tracking-tight text-noir-950 group-hover:text-brand-DEFAULT transition-colors duration-300">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-3 font-jakarta text-sm leading-relaxed text-noir-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author Byline & Read Link */}
                <div className="mt-6 pt-4 border-t border-noir-950/10 flex items-center justify-between">
                  <div>
                    <p className="font-editorial text-xs font-semibold text-noir-950">
                      {post.authorName}
                    </p>
                    <p className="font-jakarta text-2xs text-noir-500">
                      {post.authorRole}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-editorial text-xs font-bold uppercase tracking-wider text-noir-950 inline-flex items-center gap-1.5 group/link hover:text-brand-DEFAULT transition-colors"
                  >
                    <span>Read</span>
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ── View All Journal Articles CTA ── */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-noir-950/20 bg-white px-8 py-3.5 font-editorial text-xs sm:text-sm font-semibold tracking-wider text-noir-950 transition-all duration-300 hover:scale-105 hover:bg-noir-950 hover:text-white shadow-sm"
          >
            <span>Explore All Journal Articles</span>
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
