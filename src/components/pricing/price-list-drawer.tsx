"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { usePriceList } from "@/context/price-list-context";
import {
  priceListCategories,
  getWhatsAppBookingUrlForService,
} from "@/data/price-list";

export function PriceListDrawer() {
  const { isOpen, closePriceList, selectedCategory } = usePriceList();
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // Sync selectedCategory from context if provided
  React.useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // Reset search when opened
  React.useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Lock background body scroll completely while drawer is open
  React.useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;

    // Prevent background scrolling across desktop and mobile iOS
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePriceList();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, closePriceList]);

  // Filtered categories & items
  const filteredCategories = React.useMemo(() => {
    return priceListCategories
      .map((cat) => {
        // Category filter
        if (activeCategory !== "all" && cat.slug !== activeCategory) {
          return null;
        }

        // Search query filter
        const matchingItems = cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (matchingItems.length === 0) return null;

        return {
          ...cat,
          items: matchingItems,
        };
      })
      .filter(Boolean) as typeof priceListCategories;
  }, [activeCategory, searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop with Soft Dark Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closePriceList}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Left Slide-In Panel / Page - Ultra-Legible, Pure Luxury White */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260, mass: 0.8 }}
            className="relative z-10 w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-full max-h-screen bg-white text-noir-950 shadow-[10px_0_50px_rgba(0,0,0,0.25)] border-r border-neutral-200 flex flex-col will-change-transform"
          >
            {/* Top Bar / Header - Fixed, High Contrast */}
            <div className="flex-none p-3.5 sm:p-6 border-b border-neutral-200 bg-white shadow-sm z-20">
              <div className="flex items-center justify-between gap-3">
                {/* Brand Kicker & Main Title */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-jakarta text-[10px] sm:text-[11px] font-bold text-neutral-500 tracking-[0.2em] uppercase">
                      Reset Men Salon Dubai
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] font-semibold text-neutral-700">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      All-Inclusive AED
                    </span>
                  </div>
                  <h2 className="font-editorial text-xl sm:text-3xl font-bold tracking-tight text-noir-950 mt-0.5">
                    Services & Price List
                  </h2>
                </div>

                {/* Prominent Close Button */}
                <button
                  type="button"
                  onClick={closePriceList}
                  aria-label="Close price list"
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-neutral-100 hover:bg-noir-950 hover:text-white border border-neutral-200 flex items-center justify-center text-noir-950 transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Search Bar with Instant Clear */}
              <div className="mt-3 sm:mt-4 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search haircuts, beard, head spa, massage, nails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-14 py-2 sm:py-3 rounded-xl bg-neutral-100/90 border border-neutral-200/90 font-jakarta text-sm text-noir-950 placeholder:text-neutral-500 focus:outline-none focus:border-noir-950 focus:bg-white focus:ring-2 focus:ring-noir-950/10 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-xs font-jakarta font-semibold text-neutral-600 hover:text-noir-950 hover:bg-neutral-200 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Quick Filter Pills - Scrollable Horizontally with Edge Padding */}
              <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className={`px-3.5 py-1.5 sm:py-2 rounded-full font-jakarta font-bold transition-all whitespace-nowrap shadow-sm ${
                    activeCategory === "all"
                      ? "bg-noir-950 text-white shadow-md scale-[1.02]"
                      : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 hover:text-noir-950 border border-neutral-200"
                  }`}
                >
                  All Services ({priceListCategories.reduce((acc, c) => acc + c.items.length, 0)})
                </button>
                {priceListCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full font-jakarta font-semibold transition-all whitespace-nowrap ${
                      activeCategory === cat.slug
                        ? "bg-noir-950 text-white shadow-md scale-[1.02]"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-noir-950 border border-neutral-200"
                    }`}
                  >
                    {cat.title} ({cat.items.length})
                  </button>
                ))}
              </div>
            </div>

            {/* Dedicated Scrollable Price List Body (Only this area scrolls!) */}
            <div
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-6 md:p-8 space-y-5 sm:space-y-8 bg-neutral-50/60"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {filteredCategories.length === 0 ? (
                <div className="py-16 text-center text-neutral-600 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                  <p className="font-editorial text-xl sm:text-2xl font-bold text-noir-950">No treatments found</p>
                  <p className="font-jakarta text-xs sm:text-sm mt-2 text-neutral-600">
                    No services match &ldquo;{searchQuery}&rdquo;. Try another search term or click &ldquo;All Services&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    className="mt-4 px-5 py-2.5 rounded-full bg-noir-950 text-white font-jakarta text-xs font-semibold hover:bg-noir-800 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredCategories.map((cat) => (
                  <div key={cat.id} className="space-y-2.5 sm:space-y-3">
                    {/* Category Title Header & Description */}
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-200 gap-2">
                      <div className="min-w-0">
                        <h3 className="font-editorial text-lg sm:text-2xl font-bold tracking-tight text-noir-950 truncate">
                          {cat.title}
                        </h3>
                        <p className="font-jakarta text-[11px] sm:text-xs text-neutral-500 line-clamp-1">
                          {cat.description}
                        </p>
                      </div>
                      <span className="font-jakarta text-[11px] sm:text-xs font-bold px-2.5 py-0.5 sm:py-1 rounded-full bg-white border border-neutral-200 text-neutral-800 shadow-sm shrink-0">
                        {cat.items.length} options
                      </span>
                    </div>

                    {/* Highly Legible Service Cards */}
                    <div className="grid grid-cols-1 gap-2 sm:gap-3">
                      {cat.items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl sm:rounded-2xl border border-neutral-200/90 p-3 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 shadow-sm hover:shadow-md hover:border-neutral-400 transition-all group"
                        >
                          {/* Service Name & Tag */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                              <h4 className="font-jakarta text-[13px] sm:text-base font-bold text-noir-950 group-hover:text-black leading-snug">
                                {item.name}
                              </h4>
                              {item.popular && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-[10px] font-jakarta font-bold text-amber-900 shadow-sm">
                                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                                  Popular
                                </span>
                              )}
                            </div>
                            <span className="font-jakarta text-[11px] text-neutral-500 block mt-0.5">
                              {cat.title}
                            </span>
                          </div>

                          {/* Price Tag & WhatsApp Direct Booking Action */}
                          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-1.5 sm:pt-0 border-t border-neutral-100 sm:border-0">
                            <div className="text-right">
                              <div className="font-editorial text-base sm:text-2xl font-bold text-noir-950 tracking-tight whitespace-nowrap">
                                {item.priceAED}{" "}
                                <span className="text-[11px] sm:text-sm font-jakarta font-bold text-neutral-600">
                                  AED
                                </span>
                              </div>
                            </div>

                            <a
                              href={getWhatsAppBookingUrlForService(item.name, item.priceAED)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-noir-950 hover:bg-[#25D366] text-white text-xs sm:text-sm font-jakarta font-bold transition-all hover:scale-105 active:scale-95 shadow-sm whitespace-nowrap"
                              title={`Book ${item.name} via WhatsApp`}
                            >
                              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              <span>Book</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Footer Bar - Fixed, Clean & Friendly */}
            <div className="flex-none p-4 sm:p-5 border-t border-neutral-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-jakarta text-neutral-700 shadow-md">
              <div className="flex items-center gap-3">
                <a
                  href="tel:+97145655688"
                  className="inline-flex items-center gap-1.5 text-noir-950 font-bold hover:text-black transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-noir-950" />
                  <span>+971 4565 5688</span>
                </a>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-600 font-medium">Business Bay, Dubai</span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/pricing"
                  onClick={closePriceList}
                  className="inline-flex items-center gap-1 text-noir-950 font-bold underline underline-offset-4 decoration-neutral-400 hover:decoration-noir-950 transition-colors"
                >
                  <span>Open Full Pricing Page</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
