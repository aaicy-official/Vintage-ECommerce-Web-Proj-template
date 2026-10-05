"use client";

import { useState } from "react";
import Image from "next/image";
import { DetailedProduct, ProductReview } from "./types";

interface ProductTabsProps {
  product: DetailedProduct;
  onAddReview: (review: Omit<ProductReview, "id" | "date" | "helpfulCount" | "verifiedPurchase">) => void;
}

export default function ProductTabs({ product, onAddReview }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "reviews" | "size-guide" | "shipping"
  >("description");

  // Unit toggle for size guide
  const [sizeUnit, setSizeUnit] = useState<"in" | "cm">("in");

  // Review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    onAddReview({
      author: newReviewAuthor,
      rating: newReviewRating,
      title: newReviewTitle || "Great product!",
      comment: newReviewComment,
    });

    setNewReviewAuthor("");
    setNewReviewTitle("");
    setNewReviewComment("");
    setReviewModalOpen(false);
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: `Reviews (${product.reviews.length})` },
    { id: "size-guide", label: "Size & Fit Guide" },
    { id: "shipping", label: "Shipping & Returns" },
  ] as const;

  return (
    <section id="product-tabs-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Headers */}
        <div className="flex items-center justify-start sm:justify-center border-b border-gray-200 overflow-x-auto scrollbar-none gap-2 sm:gap-8 pb-px">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-3 sm:px-4 text-sm sm:text-base font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "border-black text-black"
                    : "border-transparent text-[#767676] hover:text-black hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="mt-10 sm:mt-12 max-w-4xl mx-auto">
          {/* 1. Description */}
          {activeTab === "description" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="prose prose-neutral max-w-none">
                <h3 className="font-serif text-2xl font-bold text-black mb-4">
                  The Story Behind The Design
                </h3>
                <p className="text-base text-[#555555] leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              {/* Key Highlights */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h4 className="text-sm uppercase tracking-wider font-bold text-black mb-4">
                    Product Features & Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 bg-[#FAF9F8] rounded-xl border border-gray-100"
                      >
                        <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-xs sm:text-sm text-[#484848] font-medium leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Materials & Fabric Care */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                {product.materials && (
                  <div className="p-5 bg-[#FAF9F8] rounded-2xl border border-gray-100">
                    <h4 className="font-serif text-lg font-bold text-black mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#8A5B28]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      Materials & Origin
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#555555]">
                      {product.materials.map((mat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
                          {mat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.careInstructions && (
                  <div className="p-5 bg-[#FAF9F8] rounded-2xl border border-gray-100">
                    <h4 className="font-serif text-lg font-bold text-black mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#8A5B28]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Care Instructions
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#555555]">
                      {product.careInstructions.map((care, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
                          {care}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. Specifications */}
          {activeTab === "specifications" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="font-serif text-2xl font-bold text-black mb-2">
                Technical Specifications
              </h3>
              <p className="text-sm text-[#666666] mb-6">
                Full manufacturing and styling metrics for {product.name}.
              </p>

              <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-200 bg-white shadow-xs">
                {product.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-1 sm:grid-cols-3 p-4 text-xs sm:text-sm ${
                      index % 2 === 0 ? "bg-[#FAF9F8]" : "bg-white"
                    }`}
                  >
                    <span className="font-semibold text-black mb-1 sm:mb-0">
                      {spec.label}
                    </span>
                    <span className="sm:col-span-2 text-[#555555]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Reviews */}
          {activeTab === "reviews" && (
            <div className="space-y-10 animate-in fade-in duration-200">
              {/* Reviews Summary Header */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8 bg-[#FAF9F8] rounded-2xl border border-gray-100 items-center">
                <div className="md:col-span-5 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-8">
                  <div className="font-serif text-5xl sm:text-6xl font-bold text-black mb-2">
                    4.9
                  </div>
                  <div className="flex items-center justify-center md:justify-start text-[#FBBF24] mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#666666]">
                    Based on {product.reviews.length} verified ratings
                  </p>
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(true)}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Write a Review
                  </button>
                </div>

                {/* Rating Breakdown Bars */}
                <div className="md:col-span-7 space-y-2.5">
                  {[
                    { stars: 5, pct: 88, count: 196 },
                    { stars: 4, pct: 9, count: 20 },
                    { stars: 3, pct: 2, count: 5 },
                    { stars: 2, pct: 1, count: 2 },
                    { stars: 1, pct: 0, count: 0 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="w-12 font-medium">{row.stars} Stars</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-black rounded-full"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="w-10 text-right font-mono text-gray-400">{row.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {product.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-serif font-bold text-black overflow-hidden relative">
                          {rev.avatar ? (
                            <Image src={rev.avatar} alt={rev.author} fill className="object-cover" />
                          ) : (
                            rev.author[0]
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-black">{rev.author}</span>
                            {rev.verifiedPurchase && (
                              <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 rounded-full flex items-center gap-1">
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400">{rev.date}</span>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center text-[#FBBF24]">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? "fill-current" : "fill-gray-200"
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-black font-serif">
                      {rev.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {rev.comment}
                    </p>

                    {/* Customer Photo Uploads if any */}
                    {rev.userImages && rev.userImages.length > 0 && (
                      <div className="flex gap-2 pt-2">
                        {rev.userImages.map((uImg, idx) => (
                          <div
                            key={idx}
                            className="relative w-16 h-20 rounded-lg overflow-hidden border border-gray-200"
                          >
                            <Image src={uImg} alt="Customer upload" fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-50">
                      <span>Was this helpful?</span>
                      <button
                        type="button"
                        className="hover:text-black font-medium transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        👍 Yes ({rev.helpfulCount})
                      </button>
                      <button
                        type="button"
                        className="hover:text-black font-medium transition-colors cursor-pointer"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Size & Fit Guide */}
          {activeTab === "size-guide" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-black">
                    Size & Measurement Chart
                  </h3>
                  <p className="text-sm text-[#666666]">
                    Model is 5&apos;10&quot; (178cm) wearing size Small. True to size fit.
                  </p>
                </div>

                {/* Unit Switcher */}
                <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setSizeUnit("in")}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      sizeUnit === "in" ? "bg-white text-black shadow-xs" : "text-gray-500"
                    }`}
                  >
                    IN
                  </button>
                  <button
                    type="button"
                    onClick={() => setSizeUnit("cm")}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      sizeUnit === "cm" ? "bg-white text-black shadow-xs" : "text-gray-500"
                    }`}
                  >
                    CM
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#FAF9F8] text-black font-semibold border-b border-gray-200">
                    <tr>
                      <th className="p-3.5">Size</th>
                      <th className="p-3.5">US / UK</th>
                      <th className="p-3.5">Chest ({sizeUnit})</th>
                      <th className="p-3.5">Waist ({sizeUnit})</th>
                      <th className="p-3.5">Hips ({sizeUnit})</th>
                      <th className="p-3.5">Length ({sizeUnit})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-[#555555]">
                    {[
                      { size: "XS", num: "0-2", in: ["32-34", "24-26", "34-36", "26"], cm: ["81-86", "61-66", "86-91", "66"] },
                      { size: "S", num: "4-6", in: ["34-36", "26-28", "36-38", "27"], cm: ["86-91", "66-71", "91-96", "68"] },
                      { size: "M", num: "8-10", in: ["36-38", "28-30", "38-40", "28"], cm: ["91-96", "71-76", "96-101", "71"] },
                      { size: "L", num: "12-14", in: ["38-41", "30-33", "40-43", "29"], cm: ["96-104", "76-84", "101-109", "74"] },
                      { size: "XL", num: "16-18", in: ["41-44", "33-36", "43-46", "30"], cm: ["104-112", "84-91", "109-117", "76"] },
                      { size: "XXL", num: "20", in: ["44-47", "36-39", "46-49", "31"], cm: ["112-120", "91-99", "117-124", "78"] },
                    ].map((row) => (
                      <tr key={row.size} className="hover:bg-gray-50/80">
                        <td className="p-3.5 font-bold text-black">{row.size}</td>
                        <td className="p-3.5">{row.num}</td>
                        <td className="p-3.5">{sizeUnit === "in" ? row.in[0] : row.cm[0]}</td>
                        <td className="p-3.5">{sizeUnit === "in" ? row.in[1] : row.cm[1]}</td>
                        <td className="p-3.5">{sizeUnit === "in" ? row.in[2] : row.cm[2]}</td>
                        <td className="p-3.5">{sizeUnit === "in" ? row.in[3] : row.cm[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* How to Measure Tip */}
              <div className="p-5 bg-[#FAF9F8] rounded-2xl border border-gray-100 flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-xs sm:text-sm text-[#555555] space-y-1">
                  <span className="font-bold text-black block">How to Take Accurate Measurements:</span>
                  <p>• <strong>Chest:</strong> Measure around the fullest part of your chest, keeping tape horizontal.</p>
                  <p>• <strong>Waist:</strong> Measure around your natural waistline, keeping tape comfortably loose.</p>
                  <p>• <strong>Length:</strong> Measure from highest shoulder point down to the bottom hem.</p>
                </div>
              </div>
            </div>
          )}

          {/* 5. Shipping & Returns */}
          {activeTab === "shipping" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <h3 className="font-serif text-2xl font-bold text-black mb-2">
                Shipping, Delivery & Returns
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-[#FAF9F8] rounded-2xl border border-gray-100 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                    <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-black">
                    Delivery Options
                  </h4>
                  <ul className="text-xs sm:text-sm text-[#555555] space-y-2">
                    <li>• <strong>Standard Shipping (3-5 business days):</strong> Free on orders over $100 (otherwise $7.99)</li>
                    <li>• <strong>Express Delivery (1-2 business days):</strong> $15.00 flat rate</li>
                    <li>• <strong>International Express (4-7 business days):</strong> Worldwide tracking provided via DHL</li>
                  </ul>
                </div>

                <div className="p-6 bg-[#FAF9F8] rounded-2xl border border-gray-100 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                    <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-black">
                    30-Day Return Policy
                  </h4>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    We accept returns and exchanges within 30 days of delivery. Items must be in original condition with all FASCO tags attached. Pre-paid return labels included in all domestic shipments.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Write a Review Modal */}
      {reviewModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setReviewModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setReviewModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="font-serif text-2xl font-bold text-black mb-1">
              Write a Review
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              Share your thoughts on {product.name}
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="cursor-pointer text-2xl"
                    >
                      <svg
                        className={`w-7 h-7 ${
                          star <= newReviewRating ? "fill-[#FBBF24] text-[#FBBF24]" : "fill-gray-200 text-gray-200"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Review Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gorgeous fit and premium fabric!"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Review Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what you loved about the fit, comfort, styling..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black hover:bg-neutral-800 text-white font-semibold text-sm rounded-lg transition-colors cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
