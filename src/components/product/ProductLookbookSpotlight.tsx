"use client";

import { useState } from "react";
import Image from "next/image";
import { DetailedProduct, LookbookHotspot } from "./types";

interface ProductLookbookSpotlightProps {
  product: DetailedProduct;
}

export default function ProductLookbookSpotlight({ product }: ProductLookbookSpotlightProps) {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(
    product.lookbookHotspots?.[0]?.id || null
  );

  const hotspots = product.lookbookHotspots || [];
  const lookbookImg = product.lookbookImage || product.image;

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F8] border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8A5B28] mb-2 block">
            Craftsmanship & Styling
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
            An Icon In Every Stitch
          </h2>
          <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
            Engineered with precision tailoring, heavyweight sustainable textiles, and timeless silhouette lines designed to age gracefully with everyday wear.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Interactive Lookbook Image with Callouts */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white aspect-[4/5] sm:aspect-[16/11]">
              <Image
                src={lookbookImg}
                alt="Product Lookbook Craftsmanship"
                fill
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-cover object-center"
              />

              {/* Hotspot Markers */}
              {hotspots.map((spot, index) => {
                const isActive = spot.id === activeHotspotId;
                return (
                  <div
                    key={spot.id}
                    className="absolute z-20"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveHotspotId(isActive ? null : spot.id)}
                      onMouseEnter={() => setActiveHotspotId(spot.id)}
                      className={`relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
                      aria-label={`Hotspot: ${spot.title}`}
                    >
                      {/* Outer pulse ring */}
                      <span
                        className={`absolute inline-flex h-9 w-9 rounded-full bg-black/30 transition-transform ${
                          isActive ? "scale-125 animate-ping opacity-75" : "scale-100 opacity-40 group-hover:scale-110"
                        }`}
                      />
                      {/* Main node button */}
                      <span
                        className={`relative w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-lg ${
                          isActive
                            ? "bg-black text-white scale-110 ring-2 ring-white"
                            : "bg-white text-black hover:bg-black hover:text-white"
                        }`}
                      >
                        {index + 1}
                      </span>
                    </button>

                    {/* Popover Card on Mobile / Overlay */}
                    {isActive && (
                      <div className="lg:hidden absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 p-3 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-100 z-30 animate-in fade-in zoom-in-95 duration-150">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A5B28] block mb-0.5">
                          Point 0{index + 1}
                        </span>
                        <h4 className="text-xs font-bold text-black mb-1 font-serif">
                          {spot.title}
                        </h4>
                        <p className="text-[11px] text-gray-600 leading-snug">
                          {spot.description}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hotspot Details List & Highlights */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-black mb-6">
              Interactive Feature Highlights
            </h3>

            <div className="space-y-3">
              {hotspots.map((spot, index) => {
                const isActive = spot.id === activeHotspotId;
                return (
                  <div
                    key={spot.id}
                    onClick={() => setActiveHotspotId(spot.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? "bg-white border-black shadow-md translate-x-1"
                        : "bg-white/60 border-gray-200 hover:border-gray-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                          isActive
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        0{index + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-black mb-1 font-serif">
                          {spot.title}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {spot.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Summary Strip */}
            <div className="pt-4 mt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
              <div className="bg-white p-3.5 rounded-xl border border-gray-100">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
                  Fabric Weight
                </span>
                <span className="text-sm font-bold text-black font-serif">
                  14.5 oz Heavyweight
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-gray-100">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
                  Sustainability
                </span>
                <span className="text-sm font-bold text-black font-serif">
                  100% GOTS Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
