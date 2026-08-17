export interface Property {
  id: number;

  slug: string;

  title: string;

  description: string;

  city: string;

  district?: string;

  address?: string;

  type:
    | "Lakás"
    | "Ház"
    | "Telek"
    | "Garázs"
    | "Üdülő"
    | "Iroda"
    | "Üzlethelyiség";

  status:
    | "Eladó"
    | "Kiadó";

  price: string;

  size: string;

  lotSize?: string;

  rooms?: number;

  bathrooms?: number;

  floor?: number;

  parking?: boolean;

  balcony?: boolean;

  terrace?: boolean;

  furnished?: boolean;

  heating?: string;

  energyRating?: string;

  featured: boolean;

  urgent?: boolean;

  aiRecommended?: boolean;

  latitude?: number;

  longitude?: number;

  images: string[];

  videoUrl?: string;

  virtualTourUrl?: string;

  createdAt: string;

  updatedAt?: string;

  seoTitle?: string;

  seoDescription?: string;

  tags?: string[];

  views?: number;

  inquiries?: number;
}