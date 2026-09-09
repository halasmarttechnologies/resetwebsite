"use client";

import * as React from "react";

interface PriceListContextType {
  isOpen: boolean;
  selectedCategory: string | null;
  openPriceList: (categorySlug?: string) => void;
  closePriceList: () => void;
  togglePriceList: () => void;
}

const PriceListContext = React.createContext<PriceListContextType | undefined>(undefined);

export function PriceListProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const openPriceList = React.useCallback((categorySlug?: string) => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    }
    setIsOpen(true);
  }, []);

  const closePriceList = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const togglePriceList = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Lock body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle Escape key to close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closePriceList();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closePriceList]);

  return (
    <PriceListContext.Provider
      value={{
        isOpen,
        selectedCategory,
        openPriceList,
        closePriceList,
        togglePriceList,
      }}
    >
      {children}
    </PriceListContext.Provider>
  );
}

export function usePriceList(): PriceListContextType {
  const context = React.useContext(PriceListContext);
  if (!context) {
    throw new Error("usePriceList must be used within a PriceListProvider");
  }
  return context;
}
