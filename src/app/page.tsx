import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandsBanner from "@/components/BrandsBanner";
import DealsOfMonth from "@/components/DealsOfMonth";
import NewArrivals from "@/components/NewArrivals";
import PromoBanner from "@/components/PromoBanner";
import Features from "@/components/Features";
import InstagramFeed from "@/components/InstagramFeed";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#484848]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BrandsBanner />
        <DealsOfMonth />
        <NewArrivals />
        <PromoBanner />
        <Features />
        <InstagramFeed />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
