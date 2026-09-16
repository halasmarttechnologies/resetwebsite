import { ShopHeroSection } from "./shop-hero-section";
import { ShopProductsGrid, ProductItem } from "./shop-products-grid";
import { ShopConciergeCta } from "./shop-concierge-cta";

interface ShopViewProps {
  products?: ProductItem[];
}

export function ShopView({ products }: ShopViewProps) {
  return (
    <div className="w-full bg-[#fbfbfd] min-h-[85vh] py-16 sm:py-24 text-noir-950 flex flex-col items-center">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 w-full">
        <ShopHeroSection />
        <ShopProductsGrid products={products} />
        <ShopConciergeCta />
      </div>
    </div>
  );
}
