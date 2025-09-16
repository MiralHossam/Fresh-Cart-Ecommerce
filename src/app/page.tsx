import { ProductData, product } from "@/types/product.type";
import ProductCard from "./_Component/ProductCard/ProductCard";
import { Suspense } from "react";
import { HomeLoading } from "./_Component/HomeLoading/HomeLoading";
import MainSlider from "./_Component/MainSlider/MainSlider";
import CategorySlider from "./_Component/CategorySlider/CategorySlider";
import ScrollToTop from "./_Component/ScrollToTop/ScrollToTop";
type Category = {
  _id: string;
  name: string;
  image: string;
};

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products` );
  const data: ProductData = await res.json();
  const productList: product[] = data.data;

  // ✅ Fetch Categories
  const catRes = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories" );
  const catData = await catRes.json();
  const categories: Category[] = catData.data || [];

  return (
    <>
      {/* ✅ Main Slider */}
      <MainSlider />

      {/* ✅ Categories Section with imported component */}
      <CategorySlider categories={categories} />

      {/* ✅ Products Section */}
      <section className="w-11/12 mx-auto">
        <Suspense fallback={<HomeLoading />}>
          <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
            {productList.map((product: product) => {
              return <ProductCard key={product._id} product={product} />;
            })
          }
          </div>
        </Suspense>
      </section>
      <ScrollToTop />
      
    </>
  );
}