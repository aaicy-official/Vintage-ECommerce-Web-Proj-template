"use client";

import { useState } from "react";
import Image from "next/image";
import { DetailedProduct } from "./types";

interface ProductGalleryProps {
  product: DetailedProduct;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onShare: () => void;
}

export default function ProductGallery({
  product,
  isWishlisted,
  onToggleWishlist,
  onShare,
}: ProductGalleryProps) {
  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col-reverse lg:flex-row gap-4 sm:gap-6">
        {/* Thumbnail Navigation (Left column on desktop, bottom row on mobile) */}
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[580px] scrollbar-none py-1 px-1">
          {images.map((imgUrl, idx) => {
            const isSelected = idx === activeImageIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-[#F6F6F6] ${
                  isSelected
                    ? "border-black ring-1 ring-black shadow-sm"
                    : "border-transparent opacity-75 hover:opacity-100 hover:border-gray-300"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                />
              </button>
            );
          })}
        </div>

        {/* Main Showcase Image */}
        <div className="relative flex-1 bg-[#F5F5F7] rounded-2xl overflow-hidden aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] max-h-[640px] group select-none">
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20 pointer-events-none">
            {product.discount && (
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-red-600 text-white rounded-md shadow-sm">
                Save {product.discount}
              </span>
            )}
            {product.isHot && (
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black text-white rounded-md shadow-sm">
                Bestseller
              </span>
            )}
            {product.isNew && (
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[#5C6B50] text-white rounded-md shadow-sm">
                New Arrival
              </span>
            )}
          </div>

          {/* Quick Action Buttons (Wishlist & Share & Expand) */}
          <div className="absolute top-4 right-4 flex flex-col gap-2.5 z-20">
            <button
              type="button"
              onClick={onToggleWishlist}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:text-red-500 hover:bg-white hover:scale-110 transition-all cursor-pointer"
            >
              <svg
                className={`w-5 h-5 transition-colors ${
                  isWishlisted ? "fill-red-500 text-red-500" : "fill-none stroke-current"
                }`}
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={onShare}
              title="Share product"
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:text-black hover:bg-white hover:scale-110 transition-all cursor-pointer"
            >
              <svg
                className="w-5 h-5 fill-none stroke-current"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              title="View full image"
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:text-black hover:bg-white hover:scale-110 transition-all cursor-pointer"
            >
              <svg
                className="w-5 h-5 fill-none stroke-current"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
          </div>

          {/* Interactive Zoom Container */}
          <div
            className="relative w-full h-full cursor-crosshair overflow-hidden"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src={images[activeImageIndex]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 550px"
              className={`object-cover object-top transition-transform duration-200 ${
                isZoomed ? "scale-150" : "scale-100"
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                    }
                  : undefined
              }
            />
          </div>

          {/* Bottom Zoom Hint */}
          <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
            <span className="px-3 py-1 bg-black/60 text-white text-[11px] rounded-full backdrop-blur-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
              Hover to zoom • Click to expand
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
          >
            <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeImageIndex]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
