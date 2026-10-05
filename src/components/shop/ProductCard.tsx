"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "./types";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  viewMode?: "grid" | "list";
}

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  viewMode = "grid",
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || ""
  );
  const [isHovered, setIsHovered] = useState(false);

  const displayImage =
    isHovered && product.hoverImage ? product.hoverImage : product.image;

  if (viewMode === "list") {
    return (
      <div className="group relative flex flex-col sm:flex-row bg-white rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all p-4 gap-6">
        {/* Product Image */}
        <Link
          href={`/product/${product.id}`}
          className="relative w-full sm:w-56 h-64 sm:h-auto flex-shrink-0 bg-[#F6F6F6] rounded-lg overflow-hidden block cursor-pointer"
        >
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 250px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.discount && (
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-red-600 text-white rounded">
                {product.discount}
              </span>
            )}
            {product.isNew && (
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-black text-white rounded">
                NEW
              </span>
            )}
            {product.isHot && !product.isNew && (
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-white rounded">
                HOT
              </span>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#888888] font-medium">
                {product.brand} · {product.category}
              </span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                {product.stockStatus}
              </span>
            </div>

            <Link href={`/product/${product.id}`}>
              <h3 className="mt-1.5 text-lg font-semibold text-[#111111] hover:text-black hover:underline underline-offset-2 transition-colors">
                {product.name}
              </h3>
            </Link>

            <p className="mt-2 text-xs sm:text-sm text-[#666666] line-clamp-2">
              {product.description}
            </p>

            {/* Ratings */}
            <div className="mt-3 flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < product.rating ? "fill-current" : "fill-gray-200"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-[#777777]">
                ({product.reviewsCount} reviews)
              </span>
            </div>

            {/* Colors */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-[#777777]">Colors:</span>
              <div className="flex items-center gap-1.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-4 h-4 rounded-full border border-gray-300 transition-all cursor-pointer ${
                      selectedColor === c.name ? "ring-2 ring-black scale-110" : ""
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-black font-serif">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                  isWishlisted
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "border-gray-200 text-gray-600 hover:text-black hover:border-black"
                }`}
                title="Add to Wishlist"
              >
                <svg
                  className="w-4 h-4"
                  fill={isWishlisted ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => onQuickView(product)}
                className="px-3.5 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:border-black hover:text-black transition-all cursor-pointer"
              >
                Quick View
              </button>

              <button
                type="button"
                onClick={() =>
                  onAddToCart(product, selectedColor, product.sizes[0] || "M")
                }
                className="px-5 py-2 rounded-lg bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Box */}
      <div className="relative aspect-[3/4] w-full bg-[#F6F6F6] overflow-hidden">
        <Link
          href={`/product/${product.id}`}
          className="block w-full h-full relative cursor-pointer"
        >
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.discount && (
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-red-600 text-white rounded-md shadow-sm">
              {product.discount}
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-black text-white rounded-md shadow-sm">
              NEW
            </span>
          )}
          {product.isHot && !product.isNew && (
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-amber-500 text-white rounded-md shadow-sm">
              HOT
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all z-20 cursor-pointer shadow-md ${
            isWishlisted
              ? "bg-red-50 text-red-600 scale-105"
              : "bg-white/90 text-gray-700 hover:bg-white hover:text-red-600 hover:scale-110"
          }`}
          aria-label="Wishlist"
        >
          <svg
            className="w-4 h-4"
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Quick Action Floating Bar (Slide up on hover) */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="flex-1 py-2.5 bg-white/95 backdrop-blur text-black text-xs font-semibold rounded-lg shadow-lg hover:bg-white transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 hover:shadow-xl"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Quick View
          </button>
          <button
            type="button"
            onClick={() =>
              onAddToCart(product, selectedColor, product.sizes[0] || "M")
            }
            className="w-10 h-10 bg-black text-white rounded-lg shadow-lg hover:bg-neutral-800 transition-all flex items-center justify-center cursor-pointer flex-shrink-0"
            title="Add to Cart"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        {/* Brand & Stock */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#888888]">
          <span>{product.brand}</span>
          <span className="text-emerald-700 font-medium">
            {product.stockStatus}
          </span>
        </div>

        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="mt-1 text-sm sm:text-[15px] font-semibold text-[#111111] hover:text-black hover:underline underline-offset-2 line-clamp-1 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating Stars */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < product.rating ? "fill-current" : "fill-gray-200"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[11px] text-[#888888]">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Price & Color Variant Dots */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-black font-serif">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                title={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`w-3.5 h-3.5 rounded-full border border-gray-300 transition-all cursor-pointer ${
                  selectedColor === c.name ? "ring-2 ring-black scale-110" : ""
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
