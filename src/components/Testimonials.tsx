"use client";

import { useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "James K.",
      role: "Verified Buyer",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      comment:
        "You won't regret it. I would like to personally thank you for your outstanding product. The quality of the fabric and tailored fit exceeded all my expectations. Absolutely wonderful!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sophia Martinez",
      role: "Fashion Blogger",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      comment:
        "FASCO brings the exact runway aesthetic I look for every season. The Deals Of The Month helped me refresh my entire wardrobe without breaking the bank.",
      rating: 5,
    },
    {
      id: 3,
      name: "Alexander Wright",
      role: "Creative Director",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      comment:
        "From fast shipping to immaculate packaging, shopping here is a top-tier luxury experience. The customer support team was also super responsive.",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const active = testimonials[currentIndex];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-[#FAF5EF]/50 rounded-3xl my-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#222222] tracking-tight">
          This Is What Our Customers Say
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#767676]">
          Real feedback and reviews from fashion lovers across the globe.
        </p>
      </div>

      {/* Testimonial Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 relative">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          {/* Avatar */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-[#FAF5EF] shadow-md">
            <Image
              src={active.avatar}
              alt={active.name}
              fill
              sizes="120px"
              className="object-cover object-center"
            />
          </div>

          {/* Content */}
          <div className="space-y-3 text-center sm:text-left">
            {/* Stars */}
            <div className="flex justify-center sm:justify-start text-[#FCA120] gap-1">
              {[...Array(active.rating)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-sm sm:text-base text-[#484848] italic leading-relaxed">
              &ldquo;{active.comment}&rdquo;
            </p>

            <div>
              <h3 className="font-semibold text-base text-[#222222]">{active.name}</h3>
              <p className="text-xs text-[#8A8A8A] font-medium">{active.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-between sm:justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? "w-6 bg-black" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
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
