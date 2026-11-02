export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

export type PartnerGlyphType =
  | "circle"
  | "triangle"
  | "square"
  | "cross"
  | "diagonal"
  | "diamond";

export interface PartnerMarkItem {
  name: string;
  glyph: PartnerGlyphType;
}

export interface ServiceItem {
  id: string;
  indexLabel: string;
  name: string;
  description: string;
  duration: string;
  priceLabel: string;
}

export interface StudioHourItem {
  days: string;
  hours: string;
  isHighlight?: boolean;
}

export interface BookingFormData {
  clientName: string;
  serviceName: string;
  preferredDay: string;
  preferredTime: string;
}

export interface StudioMetadata {
  brandName: string;
  shortName: string;
  establishedYear: string;
  cityCode: string;
  cityFull: string;
  district: string;
  address: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  instagramHandle: string;
  instagramUrl: string;
  googleMapsUrl: string;
  openHourWib: number;
  closeHourWib: number;
  hoursLabel: string;
}

