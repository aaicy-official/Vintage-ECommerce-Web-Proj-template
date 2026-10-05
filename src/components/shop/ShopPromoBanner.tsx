"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ShopPromoBannerProps {
  onExploreSale: () => void;
}

export default function ShopPromoBanner({ onExploreSale }: ShopPromoBannerProps) {
  const [copied, setCopied] = useState(false);

  const copyCoupon = () => {
    navigator.clipboard?.writeText("FASCO30");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="my-14 rounded-2xl bg-[#111111] text-white overflow-hidden relative shadow-xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 relative z-10">
        {/* Left text column */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold tracking-widest uppercase border border-white/10">
            Limited Time Offer
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Summer High-Fashion <br className="hidden sm:inline" />
            <span className="text-amber-200">Sale Up To 30% Off</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-xl font-light leading-relaxed">
            Upgrade your signature wardrobe with our handcrafted dresses, tailored blazers, and luxury essentials before seasonal inventory sells out.
          </p>

          {/* Coupon Code Pill */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={copyCoupon}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-dashed border-white/40 text-xs font-mono font-medium tracking-wider transition-all cursor-pointer"
              title="Click to copy coupon code"
            >
              <span>CODE: <strong className="text-white font-bold">FASCO30</strong></span>
              <span className="text-[10px] text-amber-300 underline ml-1">
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>

            <button
              type="button"
              onClick={onExploreSale}
              className="px-6 py-3 bg-white text-black text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-gray-100 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Explore Deals
            </button>
          </div>
        </div>

        {/* Right visual model preview */}
        <Link
          href="/product/4"
          className="lg:col-span-5 relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden block group cursor-pointer"
        >
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
            alt="Summer Fashion Sale Spotlight"
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <span className="text-[11px] uppercase tracking-widest text-amber-200 font-semibold block">
              FASCO Runway Lookbook
            </span>
            <span className="text-sm text-white font-medium">
              Autumn - Winter Preview 2026
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
