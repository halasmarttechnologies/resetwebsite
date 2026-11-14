"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MessageCircle, Phone, ArrowUpRight, FileText, Maximize2, X } from "lucide-react";
import { usePriceList } from "@/context/price-list-context";
import {
  priceListCategories,
  priceListMeta,
  getWhatsAppBookingUrlForService,
} from "@/data/price-list";

export function ServicesPageView() {
  const { openPriceList } = usePriceList();
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);

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

  return (
    <div className="min-h-screen w-full bg-white text-noir-950">
      {/* 1. Simple, Clean Header */}
      <section className="w-full border-b border-neutral-200 bg-white px-4 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl text-center sm:text-left">
          <span className="block font-jakarta text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
            Reset Men Salon Dubai · Business Bay
          </span>
          <h1 className="mt-2 font-editorial text-3xl font-bold tracking-tight text-noir-950 sm:text-5xl md:text-6xl">
            Services & Pricing
          </h1>
          <p className="mt-3 max-w-2xl font-jakarta text-sm leading-relaxed text-neutral-600 sm:text-base md:text-lg">
            All prices are in AED with transparent rates. Precision haircuts, beard styling,
            authentic Japanese head spa, restorative facials, therapeutic massages, and nail care.
          </p>

          {/* Quick Action Buttons for Phones & Website */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start sm:gap-3">
            <button
              type="button"
              onClick={() => openPriceList()}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-noir-950 px-5 py-2.5 font-jakarta text-xs font-semibold tracking-wide text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95 sm:text-sm"
            >
              <FileText className="h-4 w-4" />
              <span>Slide-Up Price List</span>
            </button>

            <a
              href="tel:+97145655688"
              className="flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 font-jakarta text-xs font-semibold text-noir-950 transition-all hover:border-black active:scale-95 sm:text-sm"
            >
              <Phone className="h-4 w-4" />
              <span>Call +971 4 565 5688</span>
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=971581021540&text=Hello%20Reset%20Barber%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 font-jakarta text-xs font-semibold text-noir-950 transition-all hover:border-[#25D366] hover:text-[#25D366] active:scale-95 sm:text-sm"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Official In-Salon Menu Sheet Picture Showcase */}
      <section className="w-full border-b border-neutral-200 bg-neutral-50 px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:gap-8 sm:p-8 md:flex-row">
            <div className="flex-1 space-y-3 text-center md:text-left">
              <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 font-jakarta text-xs font-bold uppercase tracking-wider text-neutral-700">
                Official In-Salon Menu
              </span>
              <h2 className="font-editorial text-2xl font-bold text-noir-950 sm:text-3xl">
                Official Price List Sheet
              </h2>
              <p className="max-w-md font-jakarta text-xs leading-relaxed text-neutral-600 sm:text-sm">
                View the official menu sheet as displayed in our Business Bay salon. All 44
                services, hair treatments, head spa rituals, and massages at a glance.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 md:justify-start">
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(true)}
                  className="flex items-center gap-1.5 rounded-full bg-noir-950 px-4 py-2 font-jakarta text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>View Full Menu Sheet</span>
                </button>
                <button
                  type="button"
                  onClick={() => openPriceList()}
                  className="rounded-full border border-neutral-300 px-4 py-2 font-jakarta text-xs font-semibold text-noir-950 transition-colors hover:border-black"
                >
                  Open Interactive Slide
                </button>
              </div>
            </div>

            {/* Picture Preview */}
            <div
              onClick={() => setIsImageModalOpen(true)}
              className="group relative aspect-[1/1.4] w-48 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-neutral-300 bg-neutral-100 shadow sm:w-56"
              title="Click to view full size"
            >
              <Image
                src="/images/reset-price-list.jpg"
                alt="Reset Men Salon Official Price List"
                fill
                sizes="(min-width: 640px) 224px, 192px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/30">
                <span className="rounded-full bg-black/70 px-2.5 py-1 font-jakarta text-[11px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Click to Expand
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Clean Services Directory & Pricing */}
      <section className="w-full px-4 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Controls: Search + Categories */}
          <div className="space-y-4">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-noir-950 sm:text-3xl">
                  All Services Directory
                </h2>
                <p className="font-jakarta text-xs text-neutral-500 sm:text-sm">
                  {priceListMeta.totalServices} services across {priceListMeta.totalCategories}{" "}
                  categories
                </p>
              </div>

              {/* Live Search */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Filter by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-neutral-200 bg-neutral-100 py-2 pl-10 pr-10 font-jakarta text-xs text-noir-950 transition-all placeholder:text-neutral-400 focus:border-noir-950 focus:bg-white focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 font-jakarta text-xs text-neutral-400 hover:text-black"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills (Horizontal swipeable on phones) */}
            <div className="no-scrollbar -mx-4 flex items-center gap-1.5 overflow-x-auto px-4 py-1 text-xs sm:mx-0 sm:px-0">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 font-jakarta font-semibold transition-colors ${
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
                  className={`whitespace-nowrap rounded-full px-3.5 py-1.5 font-jakarta font-semibold transition-colors ${
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

          {/* Service Cards by Category */}
          <div className="space-y-10">
            {filteredCategories.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 py-12 text-center text-neutral-500">
                <p className="font-editorial text-xl font-bold text-noir-950">
                  No treatments match &ldquo;{searchQuery}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-4 rounded-full bg-noir-950 px-4 py-2 font-jakarta text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredCategories.map((cat) => (
                <div key={cat.id} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <div>
                      <h3 className="font-editorial text-xl font-bold text-noir-950 sm:text-2xl">
                        {cat.title}
                      </h3>
                      <p className="mt-0.5 font-jakarta text-xs text-neutral-500">
                        {cat.description}
                      </p>
                    </div>
                    <span className="font-jakarta text-xs font-bold text-neutral-400">
                      {cat.items.length} options
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {cat.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:border-neutral-400"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <h4 className="font-jakarta text-sm font-bold leading-snug text-noir-950 sm:text-base">
                            {item.name}
                          </h4>
                          <span className="mt-0.5 block font-jakarta text-xs text-neutral-400">
                            {cat.title}
                          </span>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          <span className="whitespace-nowrap font-editorial text-base font-bold text-noir-950 sm:text-lg">
                            {item.priceAED}{" "}
                            <span className="font-jakarta text-xs font-bold text-neutral-500">
                              AED
                            </span>
                          </span>

                          <a
                            href={getWhatsAppBookingUrlForService(item.name, item.priceAED)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-noir-950 px-3.5 py-1.5 font-jakarta text-xs font-bold text-white transition-all hover:bg-[#25D366] active:scale-95"
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
      </section>

      {/* 4. Simple Footer Strip for Phones & Website */}
      <section className="w-full border-t border-neutral-200 bg-neutral-100 px-4 py-10 text-center font-jakarta text-xs text-neutral-600 sm:px-8">
        <div className="mx-auto max-w-2xl space-y-3">
          <p className="text-sm font-bold text-noir-950">Ready to experience Reset?</p>
          <p>
            Call us directly at{" "}
            <a href="tel:+97145655688" className="font-bold text-noir-950 hover:underline">
              +971 4 565 5688
            </a>{" "}
            or visit us at The Pad by Omniyat, Business Bay, Dubai.
          </p>
          <div className="flex justify-center gap-4 pt-2 text-xs font-semibold text-noir-950">
            <button
              type="button"
              onClick={() => openPriceList()}
              className="flex cursor-pointer items-center gap-1 hover:underline"
            >
              <span>Slide Price List</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <span>·</span>
            <Link href="/pricing" className="flex items-center gap-1 hover:underline">
              <span>Full Pricing Page</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Full-Screen Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/95 p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsImageModalOpen(false)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
            aria-label="Close full view"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative h-[85vh] w-full max-w-2xl">
            <Image
              src="/images/reset-price-list.jpg"
              alt="Official Reset Men Salon Price List Full View"
              fill
              sizes="(max-width: 672px) 100vw, 672px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
