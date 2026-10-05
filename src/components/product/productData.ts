import { SHOP_PRODUCTS } from "../shop/productsData";
import { DetailedProduct, ProductReview } from "./types";

export const DEFAULT_DETAILED_PRODUCT: DetailedProduct = {
  id: 4,
  name: "FASCO Signature Vintage Denim Collection",
  subtitle: "Autumn / Winter 2026 Streetwear Spotlight",
  brand: "FASCO Signature",
  category: "Denim",
  price: 148.0,
  originalPrice: 198.0,
  discount: "-25%",
  rating: 5,
  reviewsCount: 223,
  stockStatus: "In Stock",
  sku: "FASCO-DNM-2026-04",
  image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80",
  hoverImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
  galleryImages: [
    "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80",
  ],
  colors: [
    { name: "Vintage Indigo", hex: "#3B536B" },
    { name: "Washed Black", hex: "#1C1C1E" },
    { name: "Crimson Red", hex: "#A81E1E" },
    { name: "Raw Ecru", hex: "#ECE5D8" },
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  tags: ["Denim", "Vintage Fits", "Streetwear", "Bestseller"],
  isNew: true,
  isHot: true,
  isSale: true,
  description:
    "Elevate your daily wardrobe with the FASCO Signature Vintage Denim Collection. Masterfully tailored from 14.5oz heavy-weight organic selvedge cotton twill, this standout outerwear piece blends heritage workwear resilience with a contemporary dropped-shoulder relaxed fit. Detailed with brushed antique brass hardware, reinforced chain-stitched seams, and custom hand-abraded vintage wash accents.",
  features: [
    "Premium 14.5oz Organic Selvedge Cotton Denim",
    "Pre-washed vintage distress finish with soft-touch handfeel",
    "Custom engraved FASCO antique brass shank hardware",
    "Reinforced double-needle felled seams for long-lasting durability",
    "Dual flap chest pockets with hidden snap buttons & deep side welt pockets",
    "Adjustable buttoned waist tabs for custom silhouette styling",
  ],
  specifications: [
    { label: "Material Composition", value: "100% Organic Ring-Spun Cotton Denim" },
    { label: "Fabric Weight", value: "14.5 oz Heavyweight Selvedge" },
    { label: "Fit Type", value: "Relaxed Boxy Fit with Dropped Shoulders" },
    { label: "Collar Type", value: "Classic Point Spread Collar" },
    { label: "Closure", value: "Front Shank Button Placket" },
    { label: "Pockets", value: "2 Chest Flap Pockets, 2 Side Slash Pockets, 2 Interior Drop Pockets" },
    { label: "Origin", value: "Crafted in Porto, Portugal" },
    { label: "Style Code", value: "FASCO-VNTG-4073" },
  ],
  materials: [
    "100% GOTS Certified Organic Cotton",
    "Natural Indigo Dye from eco-certified botanical sources",
    "Lead-free nickel-free metal alloy buttons",
  ],
  careInstructions: [
    "Machine wash cold inside-out on gentle cycle",
    "Wash with like dark colors to preserve indigo richness",
    "Do not bleach or dry clean",
    "Hang dry in shade to maintain structural shape",
    "Warm iron if desired on reverse side",
  ],
  lookbookImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
  lookbookHotspots: [
    {
      id: "hotspot-1",
      x: 38,
      y: 22,
      title: "Structured Tailored Collar",
      description: "Reinforced interfacing retains a sharp, elevated profile throughout daily wear.",
    },
    {
      id: "hotspot-2",
      x: 52,
      y: 42,
      title: "Antique Brass Hardware",
      description: "Custom engraved FASCO metal shank buttons with vintage oxidized finish.",
    },
    {
      id: "hotspot-3",
      x: 32,
      y: 65,
      title: "14.5oz Selvedge Denim",
      description: "Shuttle-loom woven heavyweight denim offering authentic durability and patina.",
    },
    {
      id: "hotspot-4",
      x: 64,
      y: 78,
      title: "Adjustable Hem Tabs",
      description: "Custom rear button tabs allow switching between relaxed and tapered drape.",
    },
  ],
  reviews: [
    {
      id: "rev-1",
      author: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "August 18, 2026",
      title: "Absolutely timeless silhouette and unmatched quality!",
      comment:
        "The denim weight is substantial yet comfortable right out of the box. The stitching and hardware details feel like a $400 luxury designer coat. Received compliments on my very first day wearing it around Soho!",
      verifiedPurchase: true,
      helpfulCount: 34,
      userImages: [
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      id: "rev-2",
      author: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "August 12, 2026",
      title: "Perfect relaxed proportions without looking sloppy",
      comment:
        "I was searching for an oversized jacket that still fits clean on the shoulders. The size L fits me perfectly (I'm 6'1, 185lbs). Delivery was super quick to New York, arriving in just 2 days in premium packaging.",
      verifiedPurchase: true,
      helpfulCount: 19,
    },
    {
      id: "rev-3",
      author: "Sophia Laurent",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "August 04, 2026",
      title: "The vintage wash is even more gorgeous in person",
      comment:
        "Color is true to pictures with that subtle authentic faded denim warmth. Extremely versatile piece for layering over hoodies or wearing over slip dresses.",
      verifiedPurchase: true,
      helpfulCount: 28,
    },
    {
      id: "rev-4",
      author: "David Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 4,
      date: "July 29, 2026",
      title: "Solid construction and great detailing",
      comment:
        "Top-notch quality denim. It runs slightly oversized so if you prefer a slim fit, recommend sizing down one step. Overall very impressed with FASCO's craftsmanship.",
      verifiedPurchase: true,
      helpfulCount: 11,
    },
  ],
};

export function getDetailedProductById(id: number): DetailedProduct {
  const baseProduct = SHOP_PRODUCTS.find((p) => p.id === id);

  if (!baseProduct) {
    return DEFAULT_DETAILED_PRODUCT;
  }

  if (baseProduct.id === DEFAULT_DETAILED_PRODUCT.id) {
    return DEFAULT_DETAILED_PRODUCT;
  }

  const galleryImages = [
    baseProduct.image,
    baseProduct.hoverImage || baseProduct.image,
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80",
  ];

  return {
    ...baseProduct,
    sku: `FASCO-${baseProduct.category.toUpperCase().slice(0, 3)}-${baseProduct.id.toString().padStart(4, "0")}`,
    subtitle: `${baseProduct.brand} • 2026 Collection`,
    galleryImages,
    features: [
      `Premium hand-selected fabric crafted with ${baseProduct.category.toLowerCase()} precision`,
      "Tailored modern luxury silhouette designed for all-day comfort",
      "Precision reinforced seam construction with signature branding",
      "Breathable and lightweight composition for versatile seasonal wear",
      "Pre-shrunk fabric ensures consistent fit across washes",
    ],
    specifications: [
      { label: "Category", value: baseProduct.category },
      { label: "Brand", value: baseProduct.brand },
      { label: "Fit Type", value: "Regular / True to Size" },
      { label: "Available Sizes", value: baseProduct.sizes.join(", ") },
      { label: "Origin", value: "Imported / Designed in Milan" },
      { label: "Style Code", value: `FSC-${baseProduct.id * 1024}` },
      { label: "Stock Availability", value: baseProduct.stockStatus },
    ],
    materials: [
      "High-grade sustainably sourced textiles",
      "Eco-friendly hypoallergenic color dyes",
      "Durable premium trims and finishings",
    ],
    careInstructions: [
      "Machine wash cold or professional dry clean",
      "Wash with similar tones and colors",
      "Do not tumble dry on high heat",
      "Iron at low temperature when necessary",
    ],
    lookbookImage: baseProduct.hoverImage || baseProduct.image,
    lookbookHotspots: [
      {
        id: "hs-1",
        x: 42,
        y: 28,
        title: "Signature Design",
        description: `Authentic detailing from ${baseProduct.brand}.`,
      },
      {
        id: "hs-2",
        x: 55,
        y: 60,
        title: "Tailored Comfort",
        description: "Engineered with ergonomic seams for ease of motion.",
      },
    ],
    reviews: DEFAULT_DETAILED_PRODUCT.reviews,
  };
}
