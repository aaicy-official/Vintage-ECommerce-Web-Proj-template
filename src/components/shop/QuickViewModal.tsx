"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "./types";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    color: string,
    size: string,
    quantity: number
  ) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes[0] || "M"
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const images = [
    product.image,
    product.hoverImage || product.image,
    product.image,
  ];

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-4xl p-6 sm:p-8 my-8 z-10 border border-gray-100">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors z-20 cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gallery Column */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[3/4] w-full bg-[#F6F6F6] rounded-xl overflow-hidden">
                <Image
                  src={images[activeImageIndex]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-top transition-all duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
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
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 rounded-lg overflow-hidden bg-gray-100 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-black shadow-sm"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Column */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#888888] font-medium">
                    {product.brand} · {product.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    {product.stockStatus}
                  </span>
                </div>

                <Link href={`/product/${product.id}`} className="block group">
                  <h2 className="mt-2 text-2xl sm:text-3xl font-bold font-serif text-[#111111] group-hover:text-black group-hover:underline underline-offset-4 transition-colors">
                    {product.name}
                  </h2>
                </Link>

                {/* Rating & Reviews */}
                <div className="mt-2.5 flex items-center gap-2">
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
                  <span className="text-xs text-[#666666] font-medium">
                    {product.rating}.0 ({product.reviewsCount} customer reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-black font-serif">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      Save {product.discount}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {product.description}
                </p>

                {/* Color Selector */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-black uppercase tracking-wider mb-2.5">
                    <span>Color: <strong className="font-bold text-[#111111]">{selectedColor}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border border-gray-300 transition-all cursor-pointer ${
                          selectedColor === c.name ? "ring-2 ring-offset-2 ring-black scale-110" : "hover:scale-105"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-black uppercase tracking-wider mb-2.5">
                    <span>Size: <strong className="font-bold text-[#111111]">{selectedSize}</strong></span>
                    <button type="button" className="text-[11px] text-[#777777] underline hover:text-black">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-10 py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          selectedSize === s
                            ? "bg-black text-white border-black shadow-sm"
                            : "bg-white text-gray-700 border-gray-200 hover:border-black hover:text-black"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2.5 text-gray-600 hover:bg-gray-100 hover:text-black transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 py-2.5 text-sm font-semibold text-black min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2.5 text-gray-600 hover:bg-gray-100 hover:text-black transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-6 bg-black text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-all shadow-md active:scale-98 cursor-pointer text-center"
                  >
                    Add To Cart · ${(product.price * quantity).toFixed(2)}
                  </button>

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      isWishlisted
                        ? "bg-red-50 border-red-200 text-red-600"
                        : "border-gray-200 text-gray-600 hover:text-black hover:border-black"
                    }`}
                    title="Wishlist"
                  >
                    <svg
                      className="w-5 h-5"
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
                </div>

                {/* View Full Details Button */}
                <div>
                  <Link
                    href={`/product/${product.id}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-black text-black text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all shadow-sm active:scale-98"
                  >
                    <span>View Full Product Details</span>
                    <span>&rarr;</span>
                  </Link>
                </div>

                {/* Meta details */}
                <div className="flex flex-col gap-1 text-xs text-[#888888]">
                  <div>
                    <span className="font-semibold text-black">SKU:</span> FASCO-{product.id.toString().padStart(4, "0")}
                  </div>
                  <div>
                    <span className="font-semibold text-black">Tags:</span> {product.tags.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
