"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { navigationConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, Phone, MessageSquare } from "lucide-react";
import { usePriceList } from "@/context/price-list-context";

interface MobileNavProps {
  isHomePage?: boolean;
  isScrolled?: boolean;
}

export function MobileNav({}: MobileNavProps = {}) {
  const { openPriceList } = usePriceList();
  const [isOpen, setIsOpen] = React.useState(false);
  const [expandedItem, setExpandedItem] = React.useState<string | null>("/services");

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Navigation Menu"
        className="p-2 transition-colors rounded-lg text-noir-950 hover:text-black"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Navigation Drawer with Crisp White Background */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white text-noir-950 animate-fade-in p-6 shadow-2xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-noir-200">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2.5 font-editorial text-2xl font-bold tracking-[-0.03em] uppercase text-noir-950"
            >
              <Image
                src="/logo.webp"
                alt="Reset Men Salon"
                width={32}
                height={32}
                className="h-8 w-auto object-contain brightness-0"
              />
              <span>RESET</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Navigation Menu"
              className="p-2 text-noir-600 hover:text-noir-950 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6 space-y-3">
            {navigationConfig.mainNav.map((item) => {
              const hasSubcategories = item.children && item.children.length > 0;
              const isExpanded = expandedItem === item.href;
              const toggleExpand = () =>
                setExpandedItem(isExpanded ? null : item.href);

              return (
                <div key={item.href} className="border-b border-noir-100 pb-2">
                  <div className="flex items-center justify-between">
                    {item.href === "/pricing" ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          openPriceList();
                        }}
                        className="text-xl font-editorial font-semibold uppercase tracking-wider text-noir-950 hover:text-brand-500 transition-colors py-1.5 text-left"
                      >
                        {item.title}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-xl font-editorial font-semibold uppercase tracking-wider text-noir-950 hover:text-brand-500 transition-colors py-1.5"
                      >
                        {item.title}
                      </Link>
                    )}
                    {hasSubcategories && (
                      <button
                        type="button"
                        onClick={toggleExpand}
                        aria-label={`Toggle ${item.title} subcategories`}
                        className="p-2 text-noir-500 hover:text-noir-950 transition-colors"
                      >
                        <ChevronRight
                          className={`w-5 h-5 transition-transform duration-200 ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Subcategories list */}
                  {hasSubcategories && isExpanded && (
                    <div className="mt-2 pl-3 pb-2 flex flex-col gap-1 border-l-2 border-noir-200">
                      {item.children?.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 px-2.5 rounded-lg text-sm font-jakarta font-medium text-noir-700 hover:text-noir-950 hover:bg-neutral-50 transition-colors"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-3 pt-6 border-t border-noir-200">
            <a
              href={siteConfig.booking.primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center gap-2 shadow-md bg-noir-950 text-white hover:bg-noir-850"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Book on WhatsApp</span>
              </Button>
            </a>
            <a href={siteConfig.contact.phoneHref} className="block w-full">
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-center gap-2 bg-neutral-100 text-noir-950 hover:bg-neutral-200 border border-noir-200"
              >
                <Phone className="w-4 h-4 text-noir-950" />
                <span>{siteConfig.contact.phoneDisplay}</span>
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
