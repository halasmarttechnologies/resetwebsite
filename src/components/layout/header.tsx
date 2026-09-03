import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { navigationConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { AnnouncementBar } from "./announcement-bar";
import { MobileNav } from "./mobile-nav";
import { MessageSquare, Phone } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-noir-900/90 backdrop-blur-md border-b border-noir-750/80 transition-all duration-300">
      <AnnouncementBar />

      <Container size="xl">
        <div className="flex h-20 items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex flex-col group">
            <span className="font-display text-2xl font-bold tracking-cinematic text-noir-50 group-hover:text-brand-gold transition-colors">
              RESET
            </span>
            <span className="text-2xs uppercase tracking-luxury text-noir-400 font-medium">
              Men Salon &bull; Dubai
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-luxury text-noir-300 hover:text-brand-gold transition-colors duration-200 font-medium relative py-1"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Desktop Direct Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={siteConfig.contact.phoneHref}
              className="text-xs font-mono text-noir-300 hover:text-brand-300 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>{siteConfig.contact.phoneDisplay}</span>
            </a>

            <a
              href={siteConfig.booking.primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="gold" size="sm" className="flex items-center gap-1.5 text-2xs">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Book Now</span>
              </Button>
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
