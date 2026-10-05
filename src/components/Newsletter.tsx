"use client";

import { useState, type SyntheticEvent } from "react";
import Image from "next/image";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="signup" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="relative rounded-3xl overflow-hidden bg-[#FAF5EF] border border-[#F0E6DA] p-8 sm:p-14 lg:p-20 text-center">
        {/* Subtle decorative model accent */}
        <div className="hidden lg:block absolute left-8 bottom-0 w-44 h-56 rounded-t-2xl overflow-hidden opacity-90">
          <Image
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80"
            alt="Newsletter side fashion model"
            fill
            sizes="200px"
            className="object-cover object-top"
          />
        </div>

        <div className="hidden lg:block absolute right-8 bottom-0 w-44 h-56 rounded-t-2xl overflow-hidden opacity-90">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
            alt="Newsletter side fashion model right"
            fill
            sizes="200px"
            className="object-cover object-top"
          />
        </div>

        {/* Center Content */}
        <div className="max-w-xl mx-auto space-y-4 relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#222222] tracking-tight">
            Subscribe To Our Newsletter
          </h2>
          <p className="text-sm sm:text-base text-[#767676] leading-relaxed">
            Get <span className="font-bold text-black">15% off</span> your first purchase and stay updated with our newest collections, private sales & editorial lookbooks.
          </p>

          {submitted ? (
            <div className="pt-4 p-4 rounded-xl bg-white border border-green-200 text-green-700 text-sm font-medium shadow-sm animate-fade-in">
              Thank you for subscribing! Check your inbox for your 15% discount code.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="pt-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="michael@ymail.com"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-black text-white text-sm font-semibold tracking-wider hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
