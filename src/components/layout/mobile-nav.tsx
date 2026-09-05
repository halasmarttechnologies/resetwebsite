"use client";

import * as React from "react";
import Link from "next/link";
import { navigationConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, Phone, MessageSquare } from "lucide-react";

interface MobileNavProps {
  isHomePage?: boolean;
}

export function MobileNav({ isHomePage = false }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);

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
        className="p-2 transition-colors text-white hover:text-white/80"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Backdrop blur layer & Drawer */}
      {isOpen && (
        <>
          {/* Page content blur layer */}
          <div
            className="fixed inset-0 z-50 backdrop-blur-xl bg-black/30 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer panel */}
          <div className="fixed inset-0 z-[51] flex flex-col bg-noir-950/95 animate-fade-in p-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-noir-800">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="font-editorial text-2xl font-bold tracking-[-0.03em] uppercase text-white"
              >
                RESET
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Navigation Menu"
                className="p-2 text-noir-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-8 space-y-4">
              {navigationConfig.mainNav.map((item) => (
                <div key={item.href} className="border-b border-noir-850 pb-3">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between text-xl font-editorial font-semibold uppercase tracking-wider text-white hover:text-brand-300 transition-colors py-1.5"
                  >
                    <span>{item.title}</span>
                    <ChevronRight className="w-4 h-4 text-noir-500" />
                  </Link>
                </div>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-6 border-t border-noir-800">
              <a
                href={siteConfig.booking.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button variant="gold" size="md" className="w-full justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Book on WhatsApp</span>
                </Button>
              </a>
              <a href={siteConfig.contact.phoneHref} className="block w-full">
                <Button variant="secondary" size="md" className="w-full justify-center gap-2">
                  <Phone className="w-4 h-4 text-brand-gold" />
                  <span>{siteConfig.contact.phoneDisplay}</span>
                </Button>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
