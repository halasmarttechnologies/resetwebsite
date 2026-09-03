import { env } from "../src/lib/env";

console.log("==========================================");
console.log(" RESET MEN SALON — ENVIRONMENT CHECK ");
console.log("==========================================");
console.log("Node Environment:", env.NODE_ENV);
console.log("Site URL:", env.NEXT_PUBLIC_SITE_URL);
console.log("Site Name:", env.NEXT_PUBLIC_SITE_NAME);
console.log("Locale:", env.NEXT_PUBLIC_SITE_LOCALE);
console.log("Phone:", env.NEXT_PUBLIC_PHONE_NUMBER);
console.log("WhatsApp:", env.NEXT_PUBLIC_WHATSAPP_NUMBER);
console.log("CMS Provider:", env.CMS_PROVIDER);
console.log("==========================================");
console.log(" Environment is valid and ready!");
console.log("==========================================");
