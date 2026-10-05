import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ShopContainer from "@/components/shop/ShopContainer";
import Features from "@/components/Features";
import InstagramFeed from "@/components/InstagramFeed";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shop Collection | FASCO Fashion eCommerce Store",
  description:
    "Explore our complete luxury fashion collection. Discover top-tier dresses, trench coats, outerwear, casual linen shirts, denim, and accessories from FASCO.",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#484848] selection:bg-black selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Shop View with Filters, Products, Search & Drawers */}
      <div className="flex-1">
        <ShopContainer />
      </div>

      {/* Value Propositions Strip */}
      <Features />

      {/* Instagram Community Feed */}
      <InstagramFeed />

      {/* Newsletter Subscription */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
}
