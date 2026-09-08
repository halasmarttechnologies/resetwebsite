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
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category.slug === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, posts]);

  // Format date like screenshot: "27. July 2026"
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.toLocaleString("en-US", { month: "long" });
    const year = d.getFullYear();
    return `${day}. ${month} ${year}`;
  };

  return (
    <div className="w-full bg-white text-noir-950 min-h-screen pt-28 sm:pt-36 md:pt-40 pb-24 sm:pb-36">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        {/* ── Top Header Bar (Title & Subtitle on Left, Search Bar on Right) ── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Left Column */}
          <div className="max-w-2xl">
            <h1 className="font-editorial font-bold text-4xl sm:text-5xl md:text-6xl text-noir-950 tracking-tight">
              Blog
            </h1>
            <p className="mt-3 font-jakarta text-sm sm:text-base text-noir-600 leading-relaxed max-w-xl">
              Stay informed and inspired with Reset’s grooming journal — your
              source for need-to-know trends, strategic insights, and helpful
              resources.
            </p>
          </div>

          {/* Right Column: Search Bar with Magnifying Glass Icon */}
          <div className="w-full sm:w-auto self-start">
            <div className="relative w-full sm:w-80">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-noir-400 pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-noir-200 bg-white font-jakarta text-sm text-noir-900 placeholder:text-noir-400 focus:outline-none focus:border-noir-950 focus:ring-1 focus:ring-noir-950 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* ── Categories Row ── */}
        <div className="mb-8">
          <span className="block font-jakarta text-xs sm:text-sm font-semibold text-noir-900 mb-3">
            Categories
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-1.5 rounded-full font-jakarta text-xs sm:text-sm transition-all duration-200 border ${
                selectedCategory === "all"
                  ? "bg-noir-950 text-white font-medium border-noir-950 shadow-sm"
                  : "bg-white text-noir-700 border-noir-200/90 hover:border-noir-400"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-1.5 rounded-full font-jakarta text-xs sm:text-sm transition-all duration-200 border ${
                  selectedCategory === cat.slug
                    ? "bg-noir-950 text-white font-medium border-noir-950 shadow-sm"
                    : "bg-white text-noir-700 border-noir-200/90 hover:border-noir-400"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* ── Subtle Horizontal Divider Line ── */}
        <div className="w-full border-b border-noir-200/80 mb-10 sm:mb-12" />

        {/* ── Articles Grid (3 Cards per Row, matching screenshot) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {filteredPosts.map((post) => (
              <article key={post.id} className="flex flex-col group">
                {/* 1. Cover Image (Rounded rectangle with soft corners) */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100 block mb-4"
                >
                  <Image
                    src={post.coverImage.url}
                    alt={post.coverImage.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>

                {/* 2. Date */}
                <span className="font-jakarta text-xs text-noir-500 font-normal mb-2">
                  {formatDate(post.publishedAt)}
                </span>

                {/* 3. Headline */}
                <h2 className="font-editorial font-bold text-lg sm:text-xl text-noir-950 leading-snug tracking-tight group-hover:text-brand-DEFAULT transition-colors duration-200 line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                {/* 4. Category Tag Pill (below headline) */}
                <div className="mt-3">
                  <span className="inline-block rounded-md border border-noir-200 bg-white px-2.5 py-1 font-jakarta text-2xs font-medium text-noir-700 tracking-wide">
                    {post.category.title}
                  </span>
                </div>

                {/* 5. Bottom Divider Line (Under each card column) */}
                <div className="w-full border-b border-noir-300/60 mt-6" />
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="font-jakarta text-base text-noir-500">
              No articles found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
