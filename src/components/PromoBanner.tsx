"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PromoBanner() {
  const [selectedSize, setSelectedSize] = useState("M");
  const sizes = ["S", "M", "L", "XL"];

  return (
    <section id="packages" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="bg-[#FAF5EF] rounded-3xl overflow-hidden border border-[#F0E6DA] grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Left Column - Lifestyle Image */}
        <Link
          href="/product/4"
          className="lg:col-span-6 relative h-[380px] sm:h-[480px] lg:h-[540px] w-full bg-[#E5DCD0] block cursor-pointer group overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80"
            alt="Peaky Blinders edition luxury coat fashion model"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </Link>

        {/* Right Column - Product Description & Action */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#767676] uppercase">
              Women Collection
            </span>
            <Link href="/product/4" className="block group">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#222222] tracking-tight group-hover:text-black hover:underline underline-offset-4 transition-colors">
                Peaky Blinders
              </h2>
            </Link>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#8A8A8A] uppercase">
              DESCRIPTION
            </span>
            <p className="text-sm sm:text-base text-[#767676] leading-relaxed max-w-md">
              A curated collection inspired by timeless vintage elegance with premium fabrics,
              precision tailoring, and effortless modern comfort.
            </p>
          </div>

          {/* Size Selector */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-[#222222]">Select Size</span>
            <div className="flex items-center gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    selectedSize === size
                      ? "bg-black text-white shadow-md scale-105"
                      : "bg-white text-[#484848] border border-gray-200 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-6">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">
              $100.00
            </span>
            <Link
              href="/product/4"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-black text-white text-sm font-semibold tracking-wide hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
