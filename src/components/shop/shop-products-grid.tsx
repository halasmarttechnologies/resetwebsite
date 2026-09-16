import Image from "next/image";

export interface ProductItem {
  name: string;
  category: string;
  detail: string;
  image: string;
}

export const defaultTeaserProducts: ProductItem[] = [
  {
    name: "Artisan Matte Clay Pomade",
    category: "Hair Styling",
    detail: "High-hold, low-shine matte finish crafted with natural kaolin clay and beeswax.",
    image: "/images/salon/salon-chairs-floor.webp",
  },
  {
    name: "Botanical Scalp & Head Spa Elixir",
    category: "Scalp Wellness",
    detail: "Invigorating Japanese herbal infusion for hair vitality and scalp relaxation.",
    image: "/images/salon/salon-rotunda-boutique.webp",
  },
  {
    name: "Cold-Pressed Beard & Stubble Oil",
    category: "Beard Care",
    detail: "Argan, jojoba, and sandalwood oil blend for soft, groomed facial hair.",
    image: "/images/salon/haircut-skin-fade-profile.webp",
  },
];

interface ShopProductsGridProps {
  products?: ProductItem[];
}

export function ShopProductsGrid({ products = defaultTeaserProducts }: ShopProductsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-14 text-left">
      {products.map((prod) => (
        <div
          key={prod.name}
          className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
        >
          <div className="relative w-full h-48 bg-neutral-100">
            <Image
              src={prod.image}
              alt={prod.name}
              fill
              className="object-cover object-center filter brightness-95"
            />
            <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-jakarta font-bold uppercase tracking-wider">
              {prod.category}
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-editorial text-lg font-bold text-noir-950 mb-1">
                {prod.name}
              </h3>
              <p className="font-jakarta text-xs text-neutral-600 leading-relaxed">
                {prod.detail}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
              <span className="font-jakarta text-xs font-bold text-amber-700">
                Launching Soon
              </span>
              <span className="font-jakarta text-xs text-neutral-400">
                In-Salon Exclusive
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
