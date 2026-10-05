import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-stretch">
        {/* Left Column - Tall Model Card */}
        <Link
          href="/shop?category=Men's%20Fashion"
          className="md:col-span-4 relative group overflow-hidden rounded-2xl bg-[#E8E8E8] min-h-[420px] md:min-h-[580px] flex items-end justify-center cursor-pointer block"
        >
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
            alt="Male model sitting in stylish streetwear fashion"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </Link>

        {/* Middle Column - Stacked Cards with Hero Banner */}
        <div className="md:col-span-4 flex flex-col justify-between gap-4 lg:gap-6">
          {/* Top Image Banner */}
          <Link
            href="/shop"
            className="relative h-44 sm:h-48 overflow-hidden rounded-2xl bg-[#D9D9D9] group block cursor-pointer"
          >
            <Image
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
              alt="Group of stylish fashion models"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Center Callout Text Box */}
          <div className="flex flex-col items-center justify-center text-center py-6 px-4 bg-[#FAF5EF] rounded-2xl border border-[#F0E6DA]">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-[0.18em] text-[#222222] uppercase">
              ULTIMATE
            </span>
            <span
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[0.15em] text-transparent uppercase my-1"
              style={{
                WebkitTextStroke: "1.5px #222222",
              }}
            >
              SALE
            </span>
            <span className="text-xs sm:text-sm font-medium tracking-[0.25em] text-[#666666] uppercase mt-1 mb-4">
              NEW COLLECTION
            </span>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              SHOP NOW
            </Link>
          </div>

          {/* Bottom Image Banner */}
          <Link
            href="/shop"
            className="relative h-44 sm:h-48 overflow-hidden rounded-2xl bg-[#D9D9D9] group block cursor-pointer"
          >
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
              alt="Fashion models in trending red and chic outfits"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
        </div>

        {/* Right Column - Tall Model Card */}
        <Link
          href="/shop?category=Women's%20Fashion"
          className="md:col-span-4 relative group overflow-hidden rounded-2xl bg-[#E8E8E8] min-h-[420px] md:min-h-[580px] flex items-end justify-center cursor-pointer block"
        >
          <Image
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80"
            alt="Model sitting on stool wearing mustard sweater and trench coat"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </Link>
      </div>
    </section>
  );
}
