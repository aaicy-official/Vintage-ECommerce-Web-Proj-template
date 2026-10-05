"use client";

import {
  BRANDS_LIST,
  CATEGORIES_WITH_COUNTS,
  COLOR_SWATCHES,
  SIZES_LIST,
  TAGS_LIST,
} from "./productsData";
import { FilterState } from "./types";

interface ShopFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

export default function ShopFilters({
  filters,
  setFilters,
  onReset,
  isMobileDrawer = false,
  onCloseMobile,
}: ShopFiltersProps) {
  const handleCategoryChange = (categoryName: string) => {
    setFilters((prev) => ({ ...prev, category: categoryName }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxVal = Number(e.target.value);
    setFilters((prev) => ({
      ...prev,
      priceRange: [prev.priceRange[0], maxVal],
    }));
  };

  const toggleColor = (colorName: string) => {
    setFilters((prev) => {
      const exists = prev.selectedColors.includes(colorName);
      return {
        ...prev,
        selectedColors: exists
          ? prev.selectedColors.filter((c) => c !== colorName)
          : [...prev.selectedColors, colorName],
      };
    });
  };

  const toggleSize = (size: string) => {
    setFilters((prev) => {
      const exists = prev.selectedSizes.includes(size);
      return {
        ...prev,
        selectedSizes: exists
          ? prev.selectedSizes.filter((s) => s !== size)
          : [...prev.selectedSizes, size],
      };
    });
  };

  const toggleBrand = (brand: string) => {
    setFilters((prev) => {
      const exists = prev.selectedBrands.includes(brand);
      return {
        ...prev,
        selectedBrands: exists
          ? prev.selectedBrands.filter((b) => b !== brand)
          : [...prev.selectedBrands, brand],
      };
    });
  };

  const toggleTag = (tag: string) => {
    setFilters((prev) => {
      const exists = prev.selectedTags.includes(tag);
      return {
        ...prev,
        selectedTags: exists
          ? prev.selectedTags.filter((t) => t !== tag)
          : [...prev.selectedTags, tag],
      };
    });
  };

  const hasActiveFilters =
    filters.category !== "All Products" ||
    filters.priceRange[1] < 300 ||
    filters.selectedColors.length > 0 ||
    filters.selectedSizes.length > 0 ||
    filters.selectedBrands.length > 0 ||
    filters.selectedTags.length > 0 ||
    filters.minRating > 0 ||
    filters.onlySale ||
    filters.searchQuery !== "";

  return (
    <div className={`space-y-8 ${isMobileDrawer ? "p-6" : ""}`}>
      {/* Mobile drawer header */}
      {isMobileDrawer && (
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black font-serif">Filters</h2>
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-2 text-gray-500 hover:text-black focus:outline-none"
            aria-label="Close filters"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Filter Header with Clear button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-black tracking-tight">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-red-600 hover:text-red-700 underline underline-offset-2 transition-colors cursor-pointer"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-[#222222] mb-3">
          Categories
        </h4>
        <ul className="space-y-2">
          {CATEGORIES_WITH_COUNTS.map((cat) => {
            const isSelected = filters.category === cat.name;
            return (
              <li key={cat.name}>
                <button
                  type="button"
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`w-full flex items-center justify-between text-sm py-1.5 transition-colors text-left cursor-pointer ${
                    isSelected
                      ? "text-black font-semibold"
                      : "text-[#666666] hover:text-black font-normal"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        isSelected ? "bg-black scale-125" : "bg-transparent"
                      }`}
                    />
                    {cat.name}
                  </span>
                  <span className="text-xs text-[#999999]">({cat.count})</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-gray-100" />

      {/* Price Filter */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[#222222]">
            Price Range
          </h4>
          <span className="text-xs font-semibold text-black">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min={30}
          max={300}
          step={5}
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
        />
        <div className="flex justify-between text-[11px] text-[#888888] mt-2">
          <span>Min: $30</span>
          <span>Max: $300</span>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Color Filter */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[#222222]">
            Color
          </h4>
          {filters.selectedColors.length > 0 && (
            <span className="text-xs text-[#777777]">
              {filters.selectedColors.length} selected
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2.5">
          {COLOR_SWATCHES.map((color) => {
            const isSelected = filters.selectedColors.includes(color.name);
            return (
              <button
                key={color.name}
                type="button"
                title={color.name}
                onClick={() => toggleColor(color.name)}
                className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  color.border ? "border border-gray-300" : ""
                } ${
                  isSelected
                    ? "ring-2 ring-offset-2 ring-black scale-110 shadow-sm"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && (
                  <svg
                    className={`w-3.5 h-3.5 ${
                      color.name === "White" || color.name === "Beige" || color.name === "Pink"
                        ? "text-black"
                        : "text-white"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Size Filter */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[#222222]">
            Size
          </h4>
          {filters.selectedSizes.length > 0 && (
            <span className="text-xs text-[#777777]">
              {filters.selectedSizes.length} selected
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {SIZES_LIST.map((size) => {
            const isSelected = filters.selectedSizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`py-2 text-xs font-semibold rounded-md border transition-all cursor-pointer text-center ${
                  isSelected
                    ? "bg-black text-white border-black shadow-sm"
                    : "bg-white text-[#444444] border-gray-200 hover:border-black hover:text-black"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Brands Filter */}
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-[#222222] mb-3">
          Brands
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
          {BRANDS_LIST.map((brand) => {
            const isChecked = filters.selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center gap-2.5 text-sm text-[#555555] hover:text-black cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
                />
                <span className={isChecked ? "text-black font-medium" : ""}>
                  {brand}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Tags / Collections */}
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-[#222222] mb-3">
          Tags & Style
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {TAGS_LIST.map((tag) => {
            const isSelected = filters.selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                  isSelected
                    ? "bg-black text-white font-medium shadow-sm"
                    : "bg-gray-100 text-[#555555] hover:bg-gray-200 hover:text-black"
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Sale & Rating Quick toggles */}
      <div className="space-y-3">
        <label className="flex items-center justify-between text-sm text-[#444444] cursor-pointer">
          <span className="font-medium text-black">On Sale Items Only</span>
          <input
            type="checkbox"
            checked={filters.onlySale}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, onlySale: e.target.checked }))
            }
            className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between text-sm text-[#444444] cursor-pointer">
          <span className="font-medium text-black">Top Rated (5 Stars)</span>
          <input
            type="checkbox"
            checked={filters.minRating === 5}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minRating: e.target.checked ? 5 : 0,
              }))
            }
            className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
          />
        </label>
      </div>

      {isMobileDrawer && (
        <div className="pt-4">
          <button
            type="button"
            onClick={onCloseMobile}
            className="w-full py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors shadow"
          >
            Show Results
          </button>
        </div>
      )}
    </div>
  );
}
