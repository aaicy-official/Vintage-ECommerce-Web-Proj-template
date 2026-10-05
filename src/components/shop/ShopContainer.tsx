"use client";

import { useState, useMemo } from "react";
import {
  CATEGORIES_WITH_COUNTS,
  SHOP_PRODUCTS,
} from "./productsData";
import { CartItem, FilterState, Product } from "./types";
import ShopHero from "./ShopHero";
import ShopFilters from "./ShopFilters";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import CartDrawer from "./CartDrawer";
import ShopPromoBanner from "./ShopPromoBanner";

const INITIAL_FILTERS: FilterState = {
  category: "All Products",
  priceRange: [30, 300],
  selectedColors: [],
  selectedSizes: [],
  selectedBrands: [],
  selectedTags: [],
  minRating: 0,
  onlySale: false,
  searchQuery: "",
  sortBy: "default",
};

export default function ShopContainer() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [gridColumns, setGridColumns] = useState<3 | 4>(3);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([1, 6]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: SHOP_PRODUCTS[0],
      selectedColor: "Black",
      selectedSize: "M",
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast("Removed item from wishlist");
        return prev.filter((item) => item !== id);
      } else {
        showToast("Added item to wishlist ❤️");
        return [...prev, id];
      }
    });
  };

  const handleAddToCart = (
    product: Product,
    color: string,
    size: string,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, selectedColor: color, selectedSize: size, quantity }];
    });
    showToast(`Added "${product.name}" to shopping bag 🛍️`);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast("Removed item from bag");
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  // Filtered & Sorted products calculation
  const filteredProducts = useMemo(() => {
    return SHOP_PRODUCTS.filter((product) => {
      // Category
      if (filters.category !== "All Products") {
        if (product.category !== filters.category) return false;
      }

      // Price
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Colors
      if (filters.selectedColors.length > 0) {
        const hasColor = product.colors.some((c) =>
          filters.selectedColors.includes(c.name)
        );
        if (!hasColor) return false;
      }

      // Sizes
      if (filters.selectedSizes.length > 0) {
        const hasSize = product.sizes.some((s) =>
          filters.selectedSizes.includes(s)
        );
        if (!hasSize) return false;
      }

      // Brands
      if (filters.selectedBrands.length > 0) {
        if (!filters.selectedBrands.includes(product.brand)) return false;
      }

      // Tags
      if (filters.selectedTags.length > 0) {
        const hasTag = product.tags.some((t) =>
          filters.selectedTags.includes(t)
        );
        if (!hasTag) return false;
      }

      // Rating
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // Sale Only
      if (filters.onlySale && !product.isSale) {
        return false;
      }

      // Search query
      if (filters.searchQuery.trim() !== "") {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "price-low-to-high") return a.price - b.price;
      if (filters.sortBy === "price-high-to-low") return b.price - a.price;
      if (filters.sortBy === "rating") return b.rating - a.rating;
      if (filters.sortBy === "popularity") return b.reviewsCount - a.reviewsCount;
      if (filters.sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [filters]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // Active filter tags for quick removal
  const activeFilterChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];
    if (filters.category !== "All Products") {
      chips.push({
        label: `Category: ${filters.category}`,
        onRemove: () => setFilters((p) => ({ ...p, category: "All Products" })),
      });
    }
    if (filters.priceRange[1] < 300) {
      chips.push({
        label: `Under $${filters.priceRange[1]}`,
        onRemove: () => setFilters((p) => ({ ...p, priceRange: [30, 300] })),
      });
    }
    filters.selectedColors.forEach((color) => {
      chips.push({
        label: `Color: ${color}`,
        onRemove: () =>
          setFilters((p) => ({
            ...p,
            selectedColors: p.selectedColors.filter((c) => c !== color),
          })),
      });
    });
    filters.selectedSizes.forEach((size) => {
      chips.push({
        label: `Size: ${size}`,
        onRemove: () =>
          setFilters((p) => ({
            ...p,
            selectedSizes: p.selectedSizes.filter((s) => s !== size),
          })),
      });
    });
    filters.selectedBrands.forEach((brand) => {
      chips.push({
        label: `Brand: ${brand}`,
        onRemove: () =>
          setFilters((p) => ({
            ...p,
            selectedBrands: p.selectedBrands.filter((b) => b !== brand),
          })),
      });
    });
    filters.selectedTags.forEach((tag) => {
      chips.push({
        label: `#${tag}`,
        onRemove: () =>
          setFilters((p) => ({
            ...p,
            selectedTags: p.selectedTags.filter((t) => t !== tag),
          })),
      });
    });
    if (filters.onlySale) {
      chips.push({
        label: "On Sale",
        onRemove: () => setFilters((p) => ({ ...p, onlySale: false })),
      });
    }
    if (filters.minRating > 0) {
      chips.push({
        label: "5★ Only",
        onRemove: () => setFilters((p) => ({ ...p, minRating: 0 })),
      });
    }
    if (filters.searchQuery) {
      chips.push({
        label: `Search: "${filters.searchQuery}"`,
        onRemove: () => setFilters((p) => ({ ...p, searchQuery: "" })),
      });
    }
    return chips;
  }, [filters]);

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-medium flex items-center gap-3 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero / Header */}
      <ShopHero
        activeCategory={filters.category}
        onSelectCategory={(cat) => {
          setFilters((p) => ({ ...p, category: cat }));
          setCurrentPage(1);
        }}
        categories={CATEGORIES_WITH_COUNTS}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <ShopFilters
                filters={filters}
                setFilters={setFilters}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          {/* Main Shop Content */}
          <main className="lg:col-span-9 space-y-6">
            {/* Top Toolbar: Search, Results Count, Sorting & View Toggles */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search input & Mobile filter trigger */}
              <div className="flex items-center gap-3 flex-1">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-lg bg-black text-white text-xs font-semibold cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span>Filters</span>
                </button>

                <div className="relative flex-1 max-w-xs">
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => {
                      setFilters((p) => ({ ...p, searchQuery: e.target.value }));
                      setCurrentPage(1);
                    }}
                    placeholder="Search apparel, brands..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#F8F8F8] border border-transparent rounded-lg focus:bg-white focus:border-black focus:outline-none transition-all"
                  />
                  <svg
                    className="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <span className="text-xs text-[#888888] hidden sm:inline">
                  Showing <strong className="text-black">{filteredProducts.length}</strong> items
                </span>
              </div>

              {/* Sorting & Layout mode switcher */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#777777] hidden sm:inline">Sort by:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters((p) => ({
                        ...p,
                        sortBy: e.target.value as FilterState["sortBy"],
                      }))
                    }
                    className="text-xs sm:text-sm font-medium bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2 text-black focus:outline-none focus:border-black cursor-pointer"
                  >
                    <option value="default">Default Featured</option>
                    <option value="popularity">Popularity</option>
                    <option value="rating">Top Customer Rated</option>
                    <option value="newest">New Arrivals</option>
                    <option value="price-low-to-high">Price: Low to High</option>
                    <option value="price-high-to-low">Price: High to Low</option>
                  </select>
                </div>

                {/* View switcher */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("grid");
                      setGridColumns(3);
                    }}
                    className={`p-2 transition-colors cursor-pointer ${
                      viewMode === "grid" && gridColumns === 3
                        ? "bg-black text-white"
                        : "bg-white text-gray-600 hover:text-black"
                    }`}
                    title="3 Columns Grid"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors cursor-pointer ${
                      viewMode === "list"
                        ? "bg-black text-white"
                        : "bg-white text-gray-600 hover:text-black"
                    }`}
                    title="List View"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Chips Bar */}
            {activeFilterChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Active Filters:
                </span>
                {activeFilterChips.map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-black text-xs font-medium border border-gray-200"
                  >
                    <span>{chip.label}</span>
                    <button
                      type="button"
                      onClick={chip.onRemove}
                      className="hover:text-red-600 transition-colors cursor-pointer"
                      title="Remove filter"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-medium text-red-600 hover:underline cursor-pointer ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products Grid or List */}
            {paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-black font-serif">No products found</h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                  We couldn't find any products matching your active filter criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-all cursor-pointer shadow"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "list"
                    ? "space-y-4"
                    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                }
              >
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={setQuickViewProduct}
                    onAddToCart={handleAddToCart}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 hover:border-black hover:text-black transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
                >
                  <span>←</span> Previous
                </button>

                <div className="flex items-center gap-1 sm:gap-2">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-black text-white shadow-sm"
                            : "bg-white text-gray-700 border border-gray-200 hover:border-black hover:text-black"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 hover:border-black hover:text-black transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
                >
                  Next <span>→</span>
                </button>
              </div>
            )}

            {/* Promotional Fashion Banner within Shop */}
            <ShopPromoBanner
              onExploreSale={() => {
                setFilters((p) => ({ ...p, onlySale: true, category: "All Products" }));
                setCurrentPage(1);
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
            />
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col overflow-y-auto">
              <ShopFilters
                filters={filters}
                setFilters={setFilters}
                onReset={handleResetFilters}
                isMobileDrawer={true}
                onCloseMobile={() => setMobileFilterOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={
          quickViewProduct ? wishlist.includes(quickViewProduct.id) : false
        }
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          showToast("Redirecting to secure checkout...");
        }}
      />
    </>
  );
}
