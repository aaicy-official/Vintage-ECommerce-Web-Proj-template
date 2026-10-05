export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: "Women" | "Men" | "Dresses" | "Outerwear" | "Denim" | "Accessories" | "Footwear";
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  reviewsCount: number;
  stockStatus: "In Stock" | "Almost Sold Out" | "Only 2 Left";
  image: string;
  hoverImage?: string;
  colors: ProductColor[];
  sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL")[];
  tags: string[];
  isNew?: boolean;
  isHot?: boolean;
  isSale?: boolean;
  description: string;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  selectedColors: string[];
  selectedSizes: string[];
  selectedBrands: string[];
  selectedTags: string[];
  minRating: number;
  onlySale: boolean;
  searchQuery: string;
  sortBy: "default" | "popularity" | "rating" | "newest" | "price-low-to-high" | "price-high-to-low";
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}
