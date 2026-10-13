import { SalonLocation } from "@/types/site";

export const salonLocations: SalonLocation[] = [
  {
    id: "loc-business-bay",
    name: "Reset Men Salon — Business Bay Flagship",
    address: {
      line1: "The Pad by Omniyat, Shop, 3 Marasi Dr",
      line2: "Downtown Adjacent",
      district: "Business Bay",
      city: "Dubai",
      country: "United Arab Emirates",
    },
    coordinates: {
      lat: 25.1867,
      lng: 55.2744,
    },
    phone: "+971 4 565 5688",
    whatsapp: "+971 58 102 1540",
    email: "info@resetmensalon.ae",
    openingHours: [
      { days: "Monday – Sunday", hours: "10:00 AM – 12:00 AM", isOpen: true },
    ],
    parkingInfo: "Dedicated customer parking and valet service available at entrance.",
    directionsUrl: "https://maps.app.goo.gl/zbrDGgY2UeAhDVtN8",
  },
];
