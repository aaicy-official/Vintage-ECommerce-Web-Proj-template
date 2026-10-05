import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductContainer from "@/components/product/ProductContainer";
import { getDetailedProductById } from "@/components/product/productData";
import { SHOP_PRODUCTS } from "@/components/shop/productsData";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SHOP_PRODUCTS.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = parseInt(id, 10);
  const product = getDetailedProductById(productId);

  return {
    title: `${product.name} | FASCO eCommerce`,
    description: product.description,
  };
}

export default async function DynamicProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);
  const product = getDetailedProductById(productId);

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-black selection:text-white">
      <Navbar />
      <main className="flex-1">
        <ProductContainer initialProduct={product} />
      </main>
      <Footer />
    </div>
  );
}
