"use client";

import * as React from "react";
import {
  Search,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Clock,
  CalendarCheck,
} from "lucide-react";
import {
  priceListCategories,
  getWhatsAppBookingUrlForService,
} from "@/data/price-list";

export function PricingGridSection() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const filteredCategories = React.useMemo(() => {
    return priceListCategories
      .map((cat) => {
        if (activeCategory !== "all" && cat.slug !== activeCategory) {
          return null;
        }

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
    <section className="relative w-full bg-white py-20 sm:py-28 text-noir-950">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="font-editorial text-xs sm:text-sm font-semibold tracking-[0.2em] text-noir-500">
            Transparent Pricing
          </span>
          <h2 className="mt-3 font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-noir-950">
            Salon Services & Price List
          </h2>
          <p className="mt-4 font-jakarta text-base sm:text-lg text-noir-600 leading-relaxed">
            All prices are in AED and include all taxes. Every treatment is carried out by master
            stylists and therapists using genuine, skin-safe products in Business Bay, Dubai.
          </p>
        </div>

        {/* Filter Controls: Search & Category Pills */}
        <div className="mb-12 space-y-4">
          {/* Live Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-noir-400" />
            <input
              type="text"
              placeholder="Search services (e.g. Haircut, Botox, Head Spa)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-noir-50/70 border border-noir-200 font-jakarta text-sm text-noir-950 placeholder:text-noir-400 focus:outline-none focus:border-noir-950 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-jakarta text-noir-400 hover:text-noir-900"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 text-xs">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 font-jakarta font-semibold transition-all whitespace-nowrap ${
                activeCategory === "all"
                  ? "bg-noir-950 text-white shadow-sm"
                  : "bg-noir-50 text-noir-700 hover:bg-noir-100 border border-noir-200"
              }`}
            >
              All Services ({priceListCategories.reduce((acc, c) => acc + c.items.length, 0)})
            </button>
            {priceListCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 font-jakarta font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat.slug
                    ? "bg-noir-950 text-white shadow-sm"
                    : "bg-noir-50 text-noir-700 hover:bg-noir-100 border border-noir-200"
                }`}
              >
                {cat.title} ({cat.items.length})
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Luxury Grid matching the provided Menu Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredCategories.length === 0 ? (
            <div className="col-span-full py-20 text-center text-noir-500 bg-noir-50 border border-noir-200 p-8">
              <p className="font-editorial text-2xl font-semibold">No treatments found</p>
              <p className="font-jakarta text-sm mt-1">
                No services match your search query. Please select another category.
              </p>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white border border-noir-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-noir-400 transition-colors"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-noir-200 pb-3 mb-4">
                    <div>
                      <h3 className="font-editorial text-xl sm:text-2xl font-bold text-noir-950 tracking-tight">
                        {cat.title}
                      </h3>
                      <p className="font-jakarta text-xs text-noir-500 mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                    <span className="font-jakarta text-xs font-semibold px-2.5 py-1 bg-noir-100 text-noir-700">
                      {cat.items.length} items
                    </span>
                  </div>

                  {/* Services Rows */}
                  <div className="divide-y divide-noir-100">
                    {cat.items.map((item) => (
                      <div
                        key={item.id}
                        className="py-3.5 flex items-center justify-between gap-4 group hover:bg-noir-50/50 px-2 -mx-2 transition-colors"
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="font-jakarta text-sm sm:text-base font-medium text-noir-900 group-hover:text-black">
                              {item.name}
                            </span>
                            {item.popular && (
                              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-noir-100 text-noir-800 text-[10px] font-jakarta font-semibold">
                                <Sparkles className="w-2.5 h-2.5" />
                                Popular
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-editorial text-base sm:text-lg font-bold text-noir-950 tracking-tight">
                            {item.priceAED}{" "}
                            <span className="font-jakarta text-xs font-semibold text-noir-500">
                              AED
                            </span>
                          </span>

                          <a
                            href={getWhatsAppBookingUrlForService(item.name, item.priceAED)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-noir-950 hover:bg-[#25D366] text-white text-xs font-jakarta font-semibold transition-all hover:scale-105 active:scale-95"
                            title={`Book ${item.name} via WhatsApp`}
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Book</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Informational Assurance Ribbon */}
        <div className="mt-14 p-6 sm:p-8 bg-noir-50 border border-noir-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-noir-800">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-noir-950 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-base font-bold text-noir-950">
                All-inclusive rates
              </h4>
              <p className="font-jakarta text-xs text-noir-600 mt-1">
                Transparent pricing with no hidden charges. All tools sanitized to medical standards.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-noir-950 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-base font-bold text-noir-950">
                Open 7 days a week
              </h4>
              <p className="font-jakarta text-xs text-noir-600 mt-1">
                Open daily from 10:00 AM to 10:00 PM in Business Bay. Walk-ins and appointments welcome.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarCheck className="w-5 h-5 text-noir-950 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-base font-bold text-noir-950">
                Direct WhatsApp booking
              </h4>
              <p className="font-jakarta text-xs text-noir-600 mt-1">
                Instant reservation confirmation via our concierge desk at +971 581 021 540.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
