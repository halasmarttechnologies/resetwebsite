export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  serviceCategory?: string;
  message: string;
  honeypot?: string;
}

export interface BookingFormPayload {
  serviceSlug: string;
  preferredDate: string;
  preferredTime: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  channel?: "whatsapp" | "online" | "phone";
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}
