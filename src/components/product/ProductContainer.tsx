"use client";

import { useState } from "react";
import { DetailedProduct, ProductReview } from "./types";
import { Product, CartItem } from "../shop/types";
import { SHOP_PRODUCTS } from "../shop/productsData";
import ProductBreadcrumbs from "./ProductBreadcrumbs";
import ProductGallery from "./ProductGallery";
import ProductDetails from "./ProductDetails";
import ProductLookbookSpotlight from "./ProductLookbookSpotlight";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import Features from "../Features";
import Newsletter from "../Newsletter";
import CartDrawer from "../shop/CartDrawer";
import QuickViewModal from "../shop/QuickViewModal";

interface ProductContainerProps {
  initialProduct: DetailedProduct;
}

export default function ProductContainer({ initialProduct }: ProductContainerProps) {
  const [product, setProduct] = useState<DetailedProduct>(initialProduct);
  const [selectedColor, setSelectedColor] = useState(
    initialProduct.colors[0]?.name || "Vintage Indigo"
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    initialProduct.sizes[0] || "M"
  );
  const [quantity, setQuantity] = useState(1);

  // Wishlist state
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Quick view modal for related products
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // Toggle wishlist
  const handleToggleWishlist = (id?: number) => {
    const targetId = id !== undefined ? id : product.id;
    setWishlist((prev) => {
      if (prev.includes(targetId)) {
        showToast("Removed from wishlist");
        return prev.filter((i) => i !== targetId);
      } else {
        showToast("Added to wishlist ❤️");
        return [...prev, targetId];
      }
    });
  };

  // Share handler
  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Link copied to clipboard! 📋");
      } catch {
        showToast("Share this product with friends!");
      }
    } else {
      showToast("Link ready to share!");
    }
  };

  // Add to cart from main product
  const handleAddToCart = () => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            selectedColor,
            selectedSize,
            quantity,
          },
        ];
      }
    });

    setCartDrawerOpen(true);
    showToast(`Added ${quantity}x "${product.name}" to cart`);
  };

  // Add to cart from related products or quick view
  const handleAddRelatedToCart = (
    itemProduct: Product,
    color: string,
    size: string,
    qty: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === itemProduct.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += qty;
        return next;
      } else {
        return [
          ...prev,
          {
            product: itemProduct,
            selectedColor: color,
            selectedSize: size,
            quantity: qty,
          },
        ];
      }
    });

    setCartDrawerOpen(true);
    showToast(`Added ${qty > 1 ? `${qty}x ` : ""} "${itemProduct.name}" to cart`);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    setCartItems((prev) => {
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast("Item removed from cart");
  };

  // Buy now handler
  const handleBuyNow = () => {
    handleAddToCart();
  };

  // Add new user review
  const handleAddReview = (
    newRev: Omit<ProductReview, "id" | "date" | "helpfulCount" | "verifiedPurchase">
  ) => {
    const created: ProductReview = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: "Just now",
      verifiedPurchase: true,
      helpfulCount: 0,
    };

    setProduct((prev) => ({
      ...prev,
      reviewsCount: prev.reviewsCount + 1,
      reviews: [created, ...prev.reviews],
    }));

    showToast("Thank you! Your review has been published ✨");
  };

  const scrollToReviews = () => {
    const el = document.getElementById("product-tabs-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-in fade-in slide-in-from-bottom-5 duration-200 flex items-center gap-2 border border-white/10">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <ProductBreadcrumbs product={product} />

      {/* Main Product Showcase (Gallery + Details) */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Gallery (7 cols on desktop) */}
            <div className="lg:col-span-7">
              <ProductGallery
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={() => handleToggleWishlist(product.id)}
                onShare={handleShare}
              />
            </div>

            {/* Details & Purchase Panel (5 cols on desktop) */}
            <div className="lg:col-span-5">
              <ProductDetails
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                quantity={quantity}
                onSelectColor={setSelectedColor}
                onSelectSize={setSelectedSize}
                onChangeQuantity={setQuantity}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onOpenSizeGuide={scrollToReviews}
                onScrollToReviews={scrollToReviews}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook Feature Spotlight with Interactive Hotspots */}
      <ProductLookbookSpotlight product={product} />

      {/* Product Details Tabs (Description, Specifications, Customer Reviews, Size Guide, Shipping) */}
      <ProductTabs product={product} onAddReview={handleAddReview} />

      {/* People Also Loved / Related Products */}
      <RelatedProducts
        currentProduct={product}
        allProducts={SHOP_PRODUCTS}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onQuickView={setQuickViewProduct}
        onAddToCart={handleAddRelatedToCart}
      />

      {/* Quality Guarantees & Newsletter */}
      <Features />
      <Newsletter />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          showToast("Redirecting to secure checkout...");
          setCartDrawerOpen(false);
        }}
      />

      {/* Quick View Modal for Related Products */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddRelatedToCart}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />
    </div>
  );
}
