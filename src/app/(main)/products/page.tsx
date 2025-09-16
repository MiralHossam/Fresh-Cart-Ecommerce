"use client";

import { useEffect, useState } from "react";
import { HomeLoading } from "../../_Component/HomeLoading/HomeLoading";
import { product, ProductData } from "@/types/product.type";
import ProductCard from "@/app/_Component/ProductCard/ProductCard";
import ScrollToTop from "@/app/_Component/ScrollToTop/ScrollToTop";
// import ScrollToTop from "@/app/_Component/ScrollToTop"; // ⬅️ your arrow component

export default function ProductsPage() {
  const [products, setProducts] = useState<product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`
        );
        const data: ProductData = await res.json();
        setProducts(data.data);
        setFilteredProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, products]);

  if (loading) return <HomeLoading />;

  return (
    <div className="max-w-7xl mx-auto p-6min-h-screen relative">
      {/* 🔎 Search Bar */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-lg">
          {/* Green circular search icon */}
          <div
            className="absolute left-3 top-1/2 -translate-y-1/2 
            bg-green-600 text-white w-10 h-10 flex items-center justify-center 
            rounded-full shadow-md"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-16 pr-5 py-3.5 border border-gray-300 rounded-full shadow-sm 
             focus:outline-none focus:ring-0 focus:border-green-600 
             focus:shadow-[0_0_15px_rgba(22,163,74,0.6)] transition-all"
          />
        </div>
      </div>

      {/* 🛍️ Products Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* 🔼 Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}


