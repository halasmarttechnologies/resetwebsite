import { Metadata } from "next";
import { ShopView } from "@/components/shop";

export const metadata: Metadata = {
  title: "Shop Luxury Grooming Products | Reset Men Salon Dubai",
  description:
    "Reset curated shop. Premium Japanese head spa essences, artisan hair clays, beard elixirs, and bespoke salon grooming essentials.",
};

export default function ShopPage() {
  return <ShopView />;
}
