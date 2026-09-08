"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { BlogCategory, BlogPost } from "@/types/blog";

interface BlogViewProps {
  categories: BlogCategory[];
  posts: BlogPost[];
}

export function BlogView({ categories, posts }: BlogViewProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const filteredPosts = React.useMemo(() => {
    if (selectedCategory === "all") return posts;
    return posts.filter((p) => p.category.slug === selectedCategory);
  }, [selectedCategory, posts]);

  return (
    <div className="w-full bg-white text-noir-950 min-h-screen pt-28 sm:pt-36 md:pt-40 pb-20 sm:pb-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
        {/* ── Page Header (Neat & Clean White Design) ── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="font-editorial text-xs font-semibold uppercase tracking-[0.25em] text-noir-500">
            Trichology & Male Aesthetics
          </span>

          <h1 className="mt-3 font-editorial font-bold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-noir-950">
            The Grooming Journal
          </h1>

          <p className="mt-4 font-jakarta text-base sm:text-lg text-noir-600 leading-relaxed">
            Essential trichology insights, Japanese scalp hydrotherapy protocols,
            and master barbering techniques curated for the Dubai gentleman.
          </p>

          {/* ── Category Filter Pills ── */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-2 rounded-full font-editorial text-xs font-semibold tracking-wider uppercase transition-all duration-300 border ${
                selectedCategory === "all"
                  ? "bg-noir-950 text-white border-noir-950 shadow-md"
                  : "bg-white text-noir-600 border-noir-950/15 hover:border-noir-950/40 hover:text-noir-950"
              }`}
            >
              All Articles ({posts.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-5 py-2 rounded-full font-editorial text-xs font-semibold tracking-wider uppercase transition-all duration-300 border ${
                  selectedCategory === cat.slug
                    ? "bg-noir-950 text-white border-noir-950 shadow-md"
                    : "bg-white text-noir-600 border-noir-950/15 hover:border-noir-950/40 hover:text-noir-950"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* ── Articles Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-[1300px] mx-auto"
          >
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-noir-950/10 transition-all duration-500 hover:shadow-xl hover:border-noir-950/25"
              >
                {/* Image */}
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

                  <span className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 font-editorial text-2xs font-semibold uppercase tracking-wider text-noir-950 shadow-sm">
                    {post.category.title}
                  </span>

                  <span className="absolute bottom-4 right-4 rounded-full bg-black/70 backdrop-blur-md px-2.5 py-0.5 font-jakarta text-2xs text-white/90">
                    {post.readingTimeMinutes} min read
                  </span>
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7 bg-white">
                  <div>
                    <span className="font-jakarta text-2xs font-medium uppercase tracking-wider text-noir-400">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>

                    <h2 className="mt-2 font-editorial text-xl sm:text-2xl font-bold leading-snug tracking-tight text-noir-950 group-hover:text-brand-DEFAULT transition-colors duration-300">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="mt-3 font-jakarta text-sm leading-relaxed text-noir-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

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
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
