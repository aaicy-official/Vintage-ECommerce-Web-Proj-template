"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface DealCard {
  id: number;
  tag: string;
  discount: string;
  title: string;
  image: string;
  alt: string;
}

export default function DealsOfMonth() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 6,
    minutes: 5,
    seconds: 30,
  });

  const [activeSlide, setActiveSlide] = useState(0);

  const deals: DealCard[] = [
    {
      id: 1,
      tag: "01",
      discount: "30% OFF",
      title: "Spring Sale",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      alt: "Model wearing elegant black evening dress",
    },
    {
      id: 2,
      tag: "02",
      discount: "25% OFF",
      title: "Summer Vibes",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      alt: "Model wearing blue summer top and sun hat",
    },
    {
      id: 3,
      tag: "03",
      discount: "20% OFF",
      title: "Urban Chic",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      alt: "Model posing in contemporary white top and denim jeans",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % deals.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + deals.length) % deals.length);
  };

  return (
    <section id="deals" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column - Deal Details & Countdown */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#222222] tracking-tight">
              Deals Of The Month
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#767676] leading-relaxed max-w-lg">
              Explore our hand-picked monthly selection featuring premium seasonal staples,
              luxury fabrics, and limited-time designer discounts.
            </p>
          </div>

          <div>
            <Link
              href={`/product/${deals[activeSlide]?.id || 1}`}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-black text-white text-sm font-semibold tracking-wider hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Buy Now
            </Link>
          </div>

          <div className="pt-2">
            <h3 className="text-base sm:text-lg font-semibold text-[#222222] mb-4">
              Hurry, Before It&apos;s Too Late!
            </h3>
            <div className="flex items-center gap-3 sm:gap-4">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hr", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Sec", value: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white border border-[#E0E0E0] shadow-sm"
                >
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#222222]">
                    {item.value.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#767676] font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Deal Cards Carousel */}
        <div className="lg:col-span-7 relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
            {deals.map((deal, idx) => {
              const isCenter = idx === activeSlide;
              return (
                <Link
                  key={deal.id}
                  href={`/product/${deal.id}`}
                  onClick={() => setActiveSlide(idx)}
                  className={`relative group overflow-hidden rounded-2xl bg-[#F0F0F0] h-[360px] sm:h-[420px] transition-all duration-500 cursor-pointer block ${
                    isCenter
                      ? "ring-2 ring-black shadow-xl scale-[1.02]"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={deal.image}
                    alt={deal.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Card Badge Tag */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3.5 rounded-xl border border-white/40 shadow-md">
                    <span className="text-[11px] font-semibold tracking-wider text-[#767676] uppercase block">
                      {deal.tag} &bull; {deal.title}
                    </span>
                    <span className="font-serif text-lg font-bold text-black block mt-0.5">
                      {deal.discount}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-colors shadow-sm"
              aria-label="Previous deal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-colors shadow-sm"
              aria-label="Next deal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
