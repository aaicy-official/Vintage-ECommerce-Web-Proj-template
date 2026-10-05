import { Product, ProductColor } from "../shop/types";

export interface ProductReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  userImages?: string[];
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface LookbookHotspot {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  title: string;
  description: string;
}

export interface DetailedProduct extends Product {
  sku: string;
  galleryImages: string[];
  subtitle?: string;
  features: string[];
  specifications: ProductSpecification[];
  reviews: ProductReview[];
  lookbookImage?: string;
  lookbookHotspots?: LookbookHotspot[];
  materials?: string[];
  careInstructions?: string[];
}
