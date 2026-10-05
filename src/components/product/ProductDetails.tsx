"use client";

import { useState, useEffect } from "react";
import { DetailedProduct } from "./types";

interface ProductDetailsProps {
  product: DetailedProduct;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  onSelectColor: (color: string) => void;
  onSelectSize: (size: string) => void;
  onChangeQuantity: (qty: number) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onOpenSizeGuide: () => void;
  onScrollToReviews: () => void;
}

export default function ProductDetails({
  product,
  selectedColor,
  selectedSize,
  quantity,
  onSelectColor,
  onSelectSize,
  onChangeQuantity,
  onAddToCart,
  onBuyNow,
  onOpenSizeGuide,
  onScrollToReviews,
}: ProductDetailsProps) {
  // Live viewers simulation
  const [viewersCount, setViewersCount] = useState(28);
  useEffect(() => {
    const interval = setInterval(() => {
      setViewersCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(16, Math.min(48, prev + delta));
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Flash deal countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 35,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Brand & Subtitle */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <span className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#767676]">
          {product.brand}
        </span>
        <span className="text-xs text-gray-400 font-mono">
          SKU: {product.sku}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight mb-3">
        {product.name}
      </h1>

      {/* Ratings & Reviews & Live Viewers */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 pb-4 border-b border-gray-100 mb-4">
        <button
          type="button"
          onClick={onScrollToReviews}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="flex items-center text-[#FBBF24]">
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
          <span className="text-xs sm:text-sm text-[#555555] group-hover:text-black underline underline-offset-2">
            ({product.reviewsCount} verified reviews)
          </span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 px-2.5 py-1 rounded-full font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span>{viewersCount} viewing now</span>
        </div>
      </div>

      {/* Pricing & Discount */}
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-serif text-3xl sm:text-4xl font-bold text-black">
          ${product.price.toFixed(2)}
        </span>
        {product.originalPrice && (
          <span className="text-lg sm:text-xl text-gray-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
        {product.discount && (
          <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 rounded-md">
            Save {product.discount}
          </span>
        )}
      </div>

      {/* Flash Sale Banner */}
      {product.isSale && (
        <div className="bg-[#FAF7F2] border border-[#EBE3D5] rounded-xl p-3.5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A5B28]">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span>Flash Sale Ends In:</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-black">
            <span className="bg-white px-2 py-1 rounded shadow-xs border border-gray-200">
              {String(timeLeft.hours).padStart(2, "0")}h
            </span>
            <span>:</span>
            <span className="bg-white px-2 py-1 rounded shadow-xs border border-gray-200">
              {String(timeLeft.minutes).padStart(2, "0")}m
            </span>
            <span>:</span>
            <span className="bg-white px-2 py-1 rounded shadow-xs border border-gray-200">
              {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>
      )}

      {/* Short Description */}
      <p className="text-sm sm:text-base text-[#555555] leading-relaxed mb-6">
        {product.description}
      </p>

      {/* Color Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-black">
            Color: <span className="font-normal text-gray-600">{selectedColor}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {product.colors.map((c) => {
            const isSelected = selectedColor === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => onSelectColor(c.name)}
                title={c.name}
                className={`relative w-8 h-8 rounded-full border border-gray-300 transition-all cursor-pointer flex items-center justify-center ${
                  isSelected
                    ? "ring-2 ring-black ring-offset-2 scale-110"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {isSelected && (
                  <svg
                    className={`w-3.5 h-3.5 ${
                      c.hex === "#FFFFFF" || c.hex === "#ECE5D8" || c.hex === "#FFFFF0"
                        ? "stroke-black"
                        : "stroke-white"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-black">
            Size: <span className="font-normal text-gray-600">{selectedSize}</span>
          </span>
          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="text-xs font-medium text-black underline underline-offset-2 hover:text-[#555555] flex items-center gap-1 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16M7 8v8m4-8v4m4-4v8" />
            </svg>
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {product.sizes.map((s) => {
            const isSelected = selectedSize === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => onSelectSize(s)}
                className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-black text-white border-black shadow-sm"
                    : "bg-white text-gray-800 border-gray-200 hover:border-black"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity & CTA Buttons */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-200 rounded-lg bg-white h-12 px-2">
            <button
              type="button"
              onClick={() => onChangeQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <span className="w-10 text-center text-sm font-bold text-black select-none">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onChangeQuantity(Math.min(10, quantity + 1))}
              disabled={quantity >= 10}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Add To Cart */}
          <button
            type="button"
            onClick={onAddToCart}
            className="flex-1 h-12 bg-black hover:bg-neutral-800 text-white font-semibold text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add To Cart
          </button>
        </div>

        {/* Buy Now Button */}
        <button
          type="button"
          onClick={onBuyNow}
          className="w-full h-12 bg-[#F6F6F6] hover:bg-black hover:text-white text-black font-semibold text-sm sm:text-base rounded-lg border border-gray-200 hover:border-black transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          Buy It Now
        </button>
      </div>

      {/* Stock & Delivery Guarantees */}
      <div className="bg-[#FAF9F8] rounded-xl p-4 border border-gray-100 space-y-3 text-xs sm:text-sm text-[#484848]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <span className="font-semibold text-black">In Stock & Ready To Ship</span>
            <p className="text-[12px] text-gray-500">Orders ship within 24 business hours</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div>
            <span className="font-semibold text-black">Free Express Delivery</span>
            <p className="text-[12px] text-gray-500">Free standard shipping on orders over $100</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div>
            <span className="font-semibold text-black">30 Days Hassle-Free Return</span>
            <p className="text-[12px] text-gray-500">Shop with confidence with our full refund policy</p>
          </div>
        </div>
      </div>

      {/* Safe Checkout Badges */}
      <div className="mt-5 pt-4 border-t border-gray-100 text-center">
        <span className="text-[11px] uppercase tracking-widest text-gray-400 font-medium block mb-2">
          Guaranteed Safe & Secure Checkout
        </span>
        <div className="flex items-center justify-center flex-wrap gap-2 text-xs text-gray-500 font-semibold">
          <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded">VISA</span>
          <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded">Mastercard</span>
          <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded">AMEX</span>
          <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded">PayPal</span>
          <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded">Apple Pay</span>
        </div>
      </div>
    </div>
  );
}
