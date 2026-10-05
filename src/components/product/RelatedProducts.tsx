"use client";

import { DetailedProduct } from "./types";
import { Product } from "../shop/types";
import ProductCard from "../shop/ProductCard";

interface RelatedProductsProps {
  currentProduct: DetailedProduct;
  allProducts: Product[];
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export default function RelatedProducts({
  currentProduct,
  allProducts,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}: RelatedProductsProps) {
  // Find related products by category or brand, excluding the current one
  const related = allProducts
    .filter((p) => p.id !== currentProduct.id)
    .sort((a, b) => (a.category === currentProduct.category ? -1 : 1))
    .slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F8] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8A5B28] mb-2 block">
            Customers Also Looked At
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-3">
            People Also Loved
          </h2>
          <p className="text-sm sm:text-base text-[#666666]">
            Discover curated vintage fits and matching essentials to complete your collection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {related.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              isWishlisted={wishlist.includes(prod.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              viewMode="grid"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
