export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "head-spa" | "hair-and-beard" | "booking" | "pricing";
  order?: number;
}
