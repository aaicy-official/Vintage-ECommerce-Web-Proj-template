import Link from "next/link";
import { DetailedProduct } from "./types";

interface ProductBreadcrumbsProps {
  product: DetailedProduct;
}

export default function ProductBreadcrumbs({ product }: ProductBreadcrumbsProps) {
  return (
    <div className="bg-[#FAF9F8] border-b border-gray-100 py-3.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-[#767676]">
          <Link href="/" className="hover:text-black transition-colors font-medium">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/shop" className="hover:text-black transition-colors font-medium">
            Shop
          </Link>
          <span className="text-gray-300">/</span>
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-black transition-colors font-medium"
          >
            {product.category}
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-black font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            {product.name}
          </span>
        </nav>
      </div>
    </div>
  );
}
