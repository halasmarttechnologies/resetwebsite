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
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closePriceList}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Left Slide-In Panel / Page */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.6, right: 0.05 }}
            onDragEnd={handleDragEnd}
            className="relative z-10 w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-full bg-gradient-to-b from-[#141416] via-[#0d0d0f] to-[#080809] text-white shadow-[20px_0_60px_rgba(0,0,0,0.85)] border-r border-white/10 flex flex-col will-change-transform select-none touch-pan-y"
          >
            {/* Top Bar / Header */}
            <div className="flex-none p-5 sm:p-7 border-b border-white/10 bg-black/40 backdrop-blur-lg">
              <div className="flex items-center justify-between gap-4">
                {/* Brand & Kicker */}
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <div>
                    <span className="block font-jakarta text-[11px] font-semibold text-white/50 tracking-[0.2em] uppercase">
                      Reset Men Salon • Dubai
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      Services & Price List
                    </h2>
                  </div>
                </div>

                {/* Close Button & Swipe Hint */}
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline font-jakarta text-xs text-white/40">
                    Swipe left or ESC
                  </span>
                  <button
                    type="button"
                    onClick={closePriceList}
                    aria-label="Close price list"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mt-5 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search haircuts, beard, head spa, massage..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-none bg-white/5 border border-white/15 font-jakarta text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Quick Filter Pills */}
              <div className="mt-3.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className={`px-3 py-1.5 rounded-full font-jakarta font-semibold transition-all whitespace-nowrap ${
                    activeCategory === "all"
                      ? "bg-white text-noir-950 shadow-sm"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  All Services
                </button>
                {priceListCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`px-3 py-1.5 rounded-full font-jakarta font-semibold transition-all whitespace-nowrap ${
                      activeCategory === cat.slug
                        ? "bg-white text-noir-950 shadow-sm"
                        : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Price List Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8 space-y-10 custom-scrollbar">
              {filteredCategories.length === 0 ? (
                <div className="py-20 text-center text-white/50">
                  <p className="font-editorial text-xl">No services found</p>
                  <p className="font-jakarta text-sm mt-1">Try another search term or select All Services</p>
                </div>
              ) : (
                filteredCategories.map((cat) => (
                  <div key={cat.id} className="space-y-3">
                    {/* Category Title Header */}
                    <div className="flex items-center justify-between border-b border-white/15 pb-2">
                      <h3 className="font-editorial text-lg sm:text-xl font-bold tracking-wider text-white">
                        {cat.title}
                      </h3>
                      <span className="font-jakarta text-xs text-white/40">
                        {cat.items.length} options
                      </span>
                    </div>

                    {/* Services Items List */}
                    <div className="divide-y divide-white/5">
                      {cat.items.map((item) => (
                        <div
                          key={item.id}
                          className="group py-3.5 sm:py-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] px-2 -mx-2 transition-colors rounded"
                        >
                          {/* Service Name & Badge */}
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="flex items-center gap-2">
                              <span className="font-jakarta text-sm sm:text-base font-medium text-white/95 group-hover:text-white transition-colors">
                                {item.name}
                              </span>
                              {item.popular && (
                                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-jakarta font-semibold text-white/90">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  Popular
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Price Tag & WhatsApp Booking Trigger */}
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-editorial text-base sm:text-lg font-bold text-white tracking-tight">
                              {item.priceAED} <span className="text-xs font-jakarta font-semibold text-white/60">AED</span>
                            </span>

                            <a
                              href={getWhatsAppBookingUrlForService(item.name, item.priceAED)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#25D366] text-white hover:text-white text-xs font-jakarta font-semibold transition-all hover:scale-105 active:scale-95"
                              title={`Book ${item.name} via WhatsApp`}
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span className="hidden xs:inline">Book</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Footer Bar */}
            <div className="flex-none p-4 sm:p-5 border-t border-white/10 bg-black/60 backdrop-blur-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-jakarta text-white/60">
              <div className="flex items-center gap-3">
                <a
                  href="tel:+97145655688"
                  className="inline-flex items-center gap-1 text-white hover:text-white/80 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+971 4565 5688</span>
                </a>
                <span>•</span>
                <span>Business Bay, Dubai</span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/pricing"
                  onClick={closePriceList}
                  className="inline-flex items-center gap-1 text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
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
