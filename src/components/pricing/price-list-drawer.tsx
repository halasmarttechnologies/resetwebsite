"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
  X,
  Search,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
  Phone,
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

  // Handle drag to dismiss (swipe left)
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -300) {
      closePriceList();
    }
  };

  // Filtered categories & items
  const filteredCategories = React.useMemo(() => {
    return priceListCategories
      .map((cat) => {
        // Category filter
        if (activeCategory !== "all" && cat.slug !== activeCategory) {
          return null;
        }

        // Search query filter
        const matchingItems = cat.items.filter((item) =>
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
          {/* Backdrop with Soft Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closePriceList}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Left Slide-In Panel / Page - Pure Crisp Luxury White */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.6, right: 0.05 }}
            onDragEnd={handleDragEnd}
            className="relative z-10 w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-full bg-white text-noir-950 shadow-[10px_0_40px_rgba(0,0,0,0.18)] border-r border-noir-200 flex flex-col will-change-transform select-none touch-pan-y"
          >
            {/* Top Bar / Header - Clean, Crisp White */}
            <div className="flex-none p-4 sm:p-6 border-b border-noir-200 bg-white/95 backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                {/* Brand & Kicker - Clean, No Dots */}
                <div>
                  <span className="block font-jakarta text-[11px] font-semibold text-noir-500 tracking-[0.2em] uppercase">
                    Reset Men Salon Dubai
                  </span>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-noir-950">
                    Services & Price List
                  </h2>
                </div>

                {/* Close Button & Swipe Hint */}
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline font-jakarta text-xs text-noir-400">
                    Swipe left
                  </span>
                  <button
                    type="button"
                    onClick={closePriceList}
                    aria-label="Close price list"
                    className="w-10 h-10 rounded-full bg-noir-100 hover:bg-noir-200 active:bg-noir-300 border border-noir-200 flex items-center justify-center text-noir-900 transition-all hover:scale-105 active:scale-95"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mt-4 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-noir-400" />
                <input
                  type="text"
                  placeholder="Search haircuts, beard, head spa, massage..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 rounded-lg bg-noir-50 border border-noir-200 font-jakarta text-sm text-noir-950 placeholder:text-noir-400 focus:outline-none focus:border-noir-950 focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-jakarta font-medium text-noir-500 hover:text-noir-950"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Quick Filter Pills */}
              <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className={`px-3.5 py-1.5 rounded-full font-jakarta font-semibold transition-all whitespace-nowrap ${
                    activeCategory === "all"
                      ? "bg-noir-950 text-white shadow-sm"
                      : "bg-noir-100 text-noir-700 hover:bg-noir-200 hover:text-noir-950 border border-noir-200"
                  }`}
                >
                  All Services
                </button>
                {priceListCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`px-3.5 py-1.5 rounded-full font-jakarta font-semibold transition-all whitespace-nowrap ${
                      activeCategory === cat.slug
                        ? "bg-noir-950 text-white shadow-sm"
                        : "bg-noir-100 text-noir-700 hover:bg-noir-200 hover:text-noir-950 border border-noir-200"
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Price List Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-8 space-y-8 custom-scrollbar bg-white">
              {filteredCategories.length === 0 ? (
                <div className="py-20 text-center text-noir-500 bg-noir-50/50 border border-noir-200 rounded-xl p-8">
                  <p className="font-editorial text-xl font-bold text-noir-900">No services found</p>
                  <p className="font-jakarta text-sm mt-1 text-noir-600">Try another search term or select All Services</p>
                </div>
              ) : (
                filteredCategories.map((cat) => (
                  <div key={cat.id} className="space-y-3">
                    {/* Category Title Header - Clean, No Dots */}
                    <div className="flex items-center justify-between border-b border-noir-200 pb-2">
                      <h3 className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-noir-950">
                        {cat.title}
                      </h3>
                      <span className="font-jakarta text-xs font-semibold px-2 py-0.5 rounded-md bg-noir-100 text-noir-700">
                        {cat.items.length} options
                      </span>
                    </div>

                    {/* Services Items List */}
                    <div className="divide-y divide-noir-100">
                      {cat.items.map((item) => (
                        <div
                          key={item.id}
                          className="group py-3.5 flex items-center justify-between gap-3 hover:bg-neutral-50 px-2 -mx-2 transition-colors rounded-lg"
                        >
                          {/* Service Name & Popular Badge */}
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                              <span className="font-jakarta text-sm sm:text-base font-semibold text-noir-900 group-hover:text-black">
                                {item.name}
                              </span>
                              {item.popular && (
                                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200/70 text-[10px] font-jakarta font-semibold text-amber-900">
                                  <Sparkles className="w-2.5 h-2.5 text-amber-700" />
                                  Popular
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Price Tag & WhatsApp Booking Trigger */}
                          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                            <span className="font-editorial text-base sm:text-lg font-bold text-noir-950 tracking-tight whitespace-nowrap">
                              {item.priceAED}{" "}
                              <span className="text-xs font-jakarta font-semibold text-noir-500">
                                AED
                              </span>
                            </span>

                            <a
                              href={getWhatsAppBookingUrlForService(item.name, item.priceAED)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-full bg-noir-950 hover:bg-[#25D366] text-white text-xs font-jakarta font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
                              title={`Book ${item.name} via WhatsApp`}
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span className="text-xs">Book</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Footer Bar - Clean, No Dots */}
            <div className="flex-none p-4 sm:p-5 border-t border-noir-200 bg-white/95 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-jakarta text-noir-600">
              <div className="flex items-center gap-4">
                <a
                  href="tel:+97145655688"
                  className="inline-flex items-center gap-1.5 text-noir-900 font-semibold hover:text-brand-500 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-noir-700" />
                  <span>+971 4565 5688</span>
                </a>
                <span className="text-noir-400">|</span>
                <span className="text-noir-600">Business Bay, Dubai</span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/pricing"
                  onClick={closePriceList}
                  className="inline-flex items-center gap-1 text-noir-950 font-semibold underline underline-offset-4 decoration-noir-300 hover:decoration-noir-950 transition-colors"
                >
                  <span>View Full Page</span>
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
