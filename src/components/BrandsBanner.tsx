import Link from "next/link";

export default function BrandsBanner() {
  const brands = [
    { name: "CHANEL", style: "font-serif font-black tracking-[0.25em] text-xl sm:text-2xl" },
    { name: "LOUIS VUITTON", style: "font-serif font-bold tracking-[0.18em] text-lg sm:text-xl" },
    { name: "PRADA", style: "font-serif font-black tracking-[0.22em] text-xl sm:text-2xl" },
    { name: "Calvin Klein", style: "font-sans font-light tracking-[0.15em] text-lg sm:text-xl" },
    { name: "DENIM", style: "font-sans font-extrabold tracking-[0.3em] text-xl sm:text-2xl" },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-8 md:gap-12 opacity-85 hover:opacity-100 transition-opacity">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={`/shop?brand=${encodeURIComponent(brand.name)}`}
            className={`text-[#222222] select-none transition-transform hover:scale-105 duration-300 hover:text-black cursor-pointer ${brand.style}`}
          >
            {brand.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
