import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductContainer from "@/components/product/ProductContainer";
import { DEFAULT_DETAILED_PRODUCT } from "@/components/product/productData";

export const metadata: Metadata = {
  title: `${DEFAULT_DETAILED_PRODUCT.name} | FASCO Luxury eCommerce`,
  description: DEFAULT_DETAILED_PRODUCT.description,
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-black selection:text-white">
      <Navbar />
      <main className="flex-1">
        <ProductContainer initialProduct={DEFAULT_DETAILED_PRODUCT} />
      </main>
      <Footer />
    </div>
  );
}
