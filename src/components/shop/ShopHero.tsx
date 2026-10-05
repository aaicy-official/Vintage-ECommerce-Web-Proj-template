import Link from "next/link";

interface ShopHeroProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: { name: string; count: number }[];
}

export default function ShopHero({
  activeCategory,
  onSelectCategory,
  categories,
}: ShopHeroProps) {
  return (
    <section className="relative bg-[#FAFAFA] border-b border-gray-100 overflow-hidden">
      {/* Subtle decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-stone-100/60 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#888888] mb-4">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-black font-semibold">
            {activeCategory === "All Products" ? "All Collections" : activeCategory}
          </span>
        </nav>

        {/* Header content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[11px] font-medium tracking-widest uppercase mb-3">
              FASCO Curated Shop
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111]">
              {activeCategory === "All Products" ? "Fashion Collections" : `${activeCategory} Collection`}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#666666] max-w-2xl font-light">
              Discover timeless essentials, luxury tailoring, and seasonal high-fashion pieces curated for effortless modern style.
            </p>
          </div>

          <div className="text-left md:text-right flex-shrink-0">
            <span className="text-xs text-[#888888] block">Summer 2026 Lookbook</span>
            <span className="text-sm font-semibold text-black tracking-wide">
              Free Worldwide Shipping On Orders $150+
            </span>
          </div>
        </div>

        {/* Category Quick Chips */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => onSelectCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-[#555555] hover:text-black hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
