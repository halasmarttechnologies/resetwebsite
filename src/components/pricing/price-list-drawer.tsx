"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, MessageCircle, Phone, FileText, ListFilter, Maximize2 } from "lucide-react";
import { usePriceList } from "@/context/price-list-context";
import {
  priceListCategories,
  priceListMeta,
  getWhatsAppBookingUrlForService,
} from "@/data/price-list";

export function PriceListDrawer() {
  const { isOpen, closePriceList, selectedCategory } = usePriceList();
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [viewMode, setViewMode] = React.useState<"list" | "image">("list");
  const [isImageExpanded, setIsImageExpanded] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  // Track desktop vs mobile for responsive slide direction
  React.useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Sync selectedCategory from context if provided
  React.useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // Reset search and view mode when opened
  React.useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setViewMode("list");
      setIsImageExpanded(false);
    }
  }, [isOpen]);

  // Complete background website freeze when open (iOS, Android, Desktop + Lenis)
  React.useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;

    // Freeze background document completely
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    // Pause Lenis smooth scrolling
    const win = window as unknown as { __lenis?: { stop: () => void; start: () => void } };
    win.__lenis?.stop();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isImageExpanded) {
          setIsImageExpanded(false);
        } else {
          closePriceList();
        }
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
      win.__lenis?.start();
    };
  }, [isOpen, closePriceList, isImageExpanded]);

  // Filter categories & items
  const filteredCategories = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return priceListCategories
      .map((cat) => {
        if (activeCategory !== "all" && cat.slug !== activeCategory) {
          return null;
        }

        if (!query) {
          return cat;
        }

        const matchingItems = cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) || cat.title.toLowerCase().includes(query)
        );

        if (matchingItems.length === 0) return null;

        return {
          ...cat,
          items: matchingItems,
        };
      })
      .filter(Boolean) as typeof priceListCategories;
  }, [activeCategory, searchQuery]);

  // Animation variants: Desktop slides from left; Mobile slides from bottom
  const desktopVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  const mobileVariants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
    exit: { y: "100%" },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          className={`fixed inset-0 z-[9999] flex ${
            isDesktop ? "items-stretch justify-start" : "items-center justify-end"
          }`}
        >
          {/* Backdrop with click to dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closePriceList}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Drawer Panel: Desktop (slide from left) / Mobile (slide from bottom) */}
          <motion.div
            variants={isDesktop ? desktopVariants : mobileVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            drag={isDesktop ? false : "y"}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.5 }}
            onDragEnd={(_e, info) => {
              if (!isDesktop && (info.offset.y > 120 || info.velocity.y > 500)) {
                closePriceList();
              }
            }}
            data-lenis-prevent="true"
            className={`relative z-10 flex flex-col overflow-hidden bg-white text-noir-950 shadow-2xl will-change-transform ${
              isDesktop
                ? "h-full max-h-screen w-full max-w-xl border-r border-neutral-200 lg:max-w-2xl"
                : "h-[90dvh] max-h-[90dvh] w-full rounded-t-2xl"
            }`}
          >
            {/* Top Drag / Swipe Handle on Mobile */}
            {!isDesktop && (
              <div className="flex w-full shrink-0 cursor-grab justify-center bg-white pb-1 pt-2.5 active:cursor-grabbing">
                <div className="h-1.5 w-12 rounded-full bg-neutral-300" />
              </div>
            )}

            {/* Header: Row 1 (Title + Close), Row 2 (View Mode Segmented Control) */}
            <div className="shrink-0 border-b border-neutral-100 bg-white px-5 pb-3 pt-4 sm:px-7">
              {/* Row 1: Brand kicker & Main Title on left, Close button on right */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="block font-jakarta text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 sm:text-[11px]">
                    Reset Men Salon Dubai
                  </span>
                  <h2 className="whitespace-nowrap font-editorial text-xl font-bold tracking-tight text-noir-950 sm:text-2xl">
                    Official Price List
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closePriceList}
                  aria-label="Close price list"
                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-noir-950 transition-colors hover:bg-neutral-200 active:scale-95"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Row 2: View Switcher - Clean, spacious segmented control */}
              <div className="mt-3 flex items-center justify-center">
                <div className="inline-flex w-full items-center rounded-full border border-neutral-200/80 bg-neutral-100 p-1 sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-1.5 font-jakarta text-xs font-bold transition-all sm:flex-initial ${
                      viewMode === "list"
                        ? "bg-noir-950 text-white shadow-sm"
                        : "text-neutral-600 hover:text-black"
                    }`}
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span>Services Directory ({priceListMeta.totalServices})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("image")}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-1.5 font-jakarta text-xs font-bold transition-all sm:flex-initial ${
                      viewMode === "image"
                        ? "bg-noir-950 text-white shadow-sm"
                        : "text-neutral-600 hover:text-black"
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Menu Sheet (Photo)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* View Mode 1: Interactive Services List */}
            {viewMode === "list" && (
              <div className="flex min-h-0 flex-1 flex-col">
                {/* Search Bar & Category Filter Pills */}
                <div className="shrink-0 space-y-2.5 border-b border-neutral-100 bg-white px-5 pb-2.5 pt-3.5 sm:px-7">
                  {/* Live Search */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search haircuts, beard, head spa, massage, nails..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-100 py-2 pl-10 pr-12 font-jakarta text-sm text-noir-950 transition-all placeholder:text-neutral-400 focus:border-noir-950 focus:bg-white focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 font-jakarta text-xs font-bold text-neutral-500 hover:text-black"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Horizontal Scrollable Category Pills */}
                  <div className="no-scrollbar -mx-5 flex items-center gap-1.5 overflow-x-auto px-5 py-1 text-xs sm:mx-0 sm:px-0">
                    <button
                      type="button"
                      onClick={() => setActiveCategory("all")}
                      className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 font-jakarta font-bold transition-all ${
                        activeCategory === "all"
                          ? "bg-noir-950 text-white shadow-sm"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      }`}
                    >
                      All ({priceListMeta.totalServices})
                    </button>
                    {priceListCategories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat.slug)}
                        className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 font-jakarta font-bold transition-all ${
                          activeCategory === cat.slug
                            ? "bg-noir-950 text-white shadow-sm"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                      >
                        {cat.title} ({cat.items.length})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dedicated Scrollable Services Directory Container */}
                <div
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  className="flex-1 space-y-6 overflow-y-auto overscroll-contain bg-neutral-50/40 px-5 py-4 sm:px-7"
                  style={{
                    WebkitOverflowScrolling: "touch",
                    touchAction: "pan-y",
                  }}
                >
                  {filteredCategories.length === 0 ? (
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 py-12 text-center text-neutral-500">
                      <p className="font-editorial text-lg font-bold text-noir-950">
                        No services match &ldquo;{searchQuery}&rdquo;
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setActiveCategory("all");
                        }}
                        className="mt-3 cursor-pointer rounded-full bg-noir-950 px-4 py-1.5 font-jakarta text-xs font-semibold text-white"
                      >
                        Reset Search
                      </button>
                    </div>
                  ) : (
                    filteredCategories.map((cat) => (
                      <div key={cat.id} className="space-y-2.5">
                        <div className="flex items-center justify-between border-b border-neutral-200 pb-1.5">
                          <div>
                            <h3 className="font-editorial text-lg font-bold text-noir-950 sm:text-xl">
                              {cat.title}
                            </h3>
                            <p className="font-jakarta text-[11px] text-neutral-500">
                              {cat.description}
                            </p>
                          </div>
                          <span className="shrink-0 font-jakarta text-xs font-semibold text-neutral-500">
                            {cat.items.length} options
                          </span>
                        </div>

                        <div className="space-y-2">
                          {cat.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200/90 bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors hover:border-neutral-400 sm:p-4"
                            >
                              {/* Service Name & Category: Full text, never truncated */}
                              <div className="min-w-0 flex-1 pr-2">
                                <h4 className="font-jakarta text-sm font-bold leading-snug text-noir-950 sm:text-[15px]">
                                  {item.name}
                                </h4>
                                <span className="mt-0.5 block font-jakarta text-[11px] text-neutral-400">
                                  {cat.title}
                                </span>
                              </div>

                              {/* Price & Direct WhatsApp Booking Action: Always neatly aligned */}
                              <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
                                <span className="whitespace-nowrap font-editorial text-base font-bold text-noir-950 sm:text-lg">
                                  {item.priceAED}{" "}
                                  <span className="font-jakarta text-[11px] font-bold text-neutral-500">
                                    AED
                                  </span>
                                </span>

                                <a
                                  href={getWhatsAppBookingUrlForService(item.name, item.priceAED)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-noir-950 px-3 py-1.5 font-jakarta text-xs font-bold text-white transition-all hover:bg-[#25D366] active:scale-95"
                                  title={`Book ${item.name} via WhatsApp`}
                                >
                                  <MessageCircle className="h-3.5 w-3.5" />
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
              </div>
            )}

            {/* View Mode 2: Official Menu Sheet Picture */}
            {viewMode === "image" && (
              <div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="flex flex-1 flex-col items-center justify-start overflow-y-auto overscroll-contain bg-neutral-100 p-4 sm:p-6"
              >
                <div className="relative w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-2.5 shadow-md">
                  <div
                    onClick={() => setIsImageExpanded(true)}
                    className="group relative aspect-[1/1.4] w-full cursor-pointer overflow-hidden rounded-xl bg-neutral-50"
                    title="Click to view full size"
                  >
                    <Image
                      src="/images/reset-price-list.jpg"
                      alt="Official Reset Men Salon Price List"
                      fill
                      className="group-hover:scale-102 object-contain transition-transform duration-300"
                      priority
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/25">
                      <span className="rounded-full bg-black/80 px-3 py-1.5 font-jakarta text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                        Click to Expand Full Screen
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-neutral-100 px-2 pt-2.5 font-jakarta text-xs text-neutral-600">
                    <span className="font-semibold text-noir-950">
                      Official In-Salon Menu Sheet
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsImageExpanded(true)}
                      className="inline-flex cursor-pointer items-center gap-1 font-bold text-noir-950 hover:underline"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Full Screen</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Bar: Quick direct communication */}
            <div className="flex shrink-0 items-center justify-between border-t border-neutral-200 bg-white px-5 py-3 font-jakarta text-xs text-neutral-600 sm:px-7">
              <a
                href="tel:+97145655688"
                className="inline-flex items-center gap-1.5 font-bold text-noir-950 transition-colors hover:text-black"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>+971 4 565 5688</span>
              </a>

              <Link
                href="/pricing"
                onClick={closePriceList}
                className="font-bold text-noir-950 hover:underline"
              >
                Pricing Page →
              </Link>
            </div>
          </motion.div>

          {/* Full Screen Image Modal if expanded */}
          {isImageExpanded && (
            <div
              className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/95 p-4"
              onClick={() => setIsImageExpanded(false)}
            >
              <button
                type="button"
                onClick={() => setIsImageExpanded(false)}
                className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
                aria-label="Close full view"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="relative h-[85vh] w-full max-w-2xl">
                <Image
                  src="/images/reset-price-list.jpg"
                  alt="Official Reset Men Salon Price List Full View"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
