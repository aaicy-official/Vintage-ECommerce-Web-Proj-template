"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  rating: number;
  reviews: string;
  price: number;
  stockStatus: string;
  image: string;
}

export default function NewArrivals() {
  const categories = [
    "Men's Fashion",
    "Women's Fashion",
    "Women Accessories",
    "Men Accessories",
    "Discount Deals",
  ];

  const [activeCategory, setActiveCategory] = useState("Women's Fashion");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "Shiny Evening Dress",
      brand: "Alshakir Couture",
      category: "Women's Fashion",
      rating: 5,
      reviews: "(4.1k) Customer Reviews",
      price: 95.5,
      stockStatus: "Almost Sold Out",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 2,
      name: "Long Denim Overcoat",
      brand: "Urban Chic",
      category: "Women's Fashion",
      rating: 5,
      reviews: "(3.8k) Customer Reviews",
      price: 120.0,
      stockStatus: "Almost Sold Out",
      image:
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 3,
      name: "Full Sleeve Zipper Jacket",
      brand: "Fashion Hub",
      category: "Men's Fashion",
      rating: 5,
      reviews: "(5.2k) Customer Reviews",
      price: 110.0,
      stockStatus: "Almost Sold Out",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 4,
      name: "White Casual Linen Shirt",
      brand: "Monochrome Studio",
      category: "Men's Fashion",
      rating: 5,
      reviews: "(2.9k) Customer Reviews",
      price: 65.0,
      stockStatus: "Almost Sold Out",
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 5,
      name: "Minimalist Leather Tote",
      brand: "Vogue Atelier",
      category: "Women Accessories",
      rating: 5,
      reviews: "(1.8k) Customer Reviews",
      price: 145.0,
      stockStatus: "Almost Sold Out",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 6,
      name: "Classic Beige Trench Coat",
      brand: "FASCO Signature",
      category: "Women's Fashion",
      rating: 5,
      reviews: "(4.6k) Customer Reviews",
      price: 180.0,
      stockStatus: "Almost Sold Out",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
    },
  ];

  const filteredProducts =
    activeCategory === "Discount Deals"
      ? products
      : products.filter(
          (p) =>
            p.category === activeCategory ||
            (activeCategory === "Men Accessories" && p.category === "Men's Fashion")
        );

  const displayProducts =
    filteredProducts.length > 0 ? filteredProducts : products.slice(0, 6);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="new-arrivals" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#222222] tracking-tight">
          New Arrivals
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#767676]">
          Explore the latest additions to our collection. Always in trend, always stylish.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? "bg-black text-white shadow-sm scale-105"
                  : "bg-[#F8F8F8] text-[#767676] hover:text-black hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {displayProducts.map((product) => {
          const isWishlisted = wishlist.includes(product.id);
          return (
            <div
              key={product.id}
              className="group bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F2F2F2] mb-4">
                <Link href={`/product/${product.id}`} className="block w-full h-full relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Add to wishlist"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:text-red-500 hover:scale-110 transition-all shadow-sm"
                >
                  <svg
                    className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "fill-none"}`}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-1.5 px-1">
                <div className="flex items-center justify-between">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-base text-[#222222] hover:text-black hover:underline underline-offset-2 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <span className="font-serif font-bold text-lg text-black">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-[#8A8A8A]">{product.brand}</p>

                {/* Star Rating */}
                <div className="flex items-center gap-1.5 pt-1">
                  <div className="flex text-[#FCA120]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-[#767676]">{product.reviews}</span>
                </div>

                {/* Stock Tag */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF4747]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4747] animate-pulse" />
                    {product.stockStatus}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More Button */}
      <div className="text-center mt-12">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center px-9 py-3.5 rounded-xl bg-black text-white text-sm font-semibold tracking-wide hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          View More Products
        </Link>
      </div>
    </section>
  );
}
