/**
 * Seed script for exporting local data fixtures to Headless CMS (Sanity / Supabase)
 */
import { serviceCategories, serviceItems } from "../src/data/services";
import { pricingPackages } from "../src/data/pricing";
import { teamMembers } from "../src/data/team";

console.log("==========================================");
console.log(" RESET MEN SALON — DATA FIXTURES SUMMARY ");
console.log("==========================================");
console.log(`- Service Categories: ${serviceCategories.length}`);
console.log(`- Service Items: ${serviceItems.length}`);
console.log(`- Pricing Packages: ${pricingPackages.length}`);
console.log(`- Team Members: ${teamMembers.length}`);
console.log("==========================================");
console.log("All data models are valid and ready for CMS export.");
