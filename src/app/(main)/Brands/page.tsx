"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HomeLoading } from "@/app/_Component/HomeLoading/HomeLoading";
import ScrollToTop from "@/app/_Component/ScrollToTop/ScrollToTop";

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`
        );
        const data = await res.json();
        setBrands(data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  // 👇 show scroll-to-top when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <HomeLoading />;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen relative">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-10 text-main relative">
        Our Brands
        <span className="block w-16 h-1 bg-main mx-auto mt-2 rounded-full"></span>
      </h1>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {brands.map((brand) => (
          <div
            key={brand._id}
            onClick={() => setSelectedBrand(brand)}
            className="flex flex-col items-center bg-white p-4 rounded-2xl shadow border border-main/10 
                       transition transform hover:scale-105 cursor-pointer
                       hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
          >
            <div className="w-24 h-24 relative mb-3">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">
              {brand.name}
            </h2>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBrand && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setSelectedBrand(null)} // close on overlay click
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()} // prevent close on modal click
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedBrand(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>

            {/* Brand Image */}
            <div className="w-32 h-32 relative mx-auto mb-4">
              <Image
                src={selectedBrand.image}
                alt={selectedBrand.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Brand Info */}
            <h2 className="text-2xl font-bold text-center mb-2 text-main">
              {selectedBrand.name}
            </h2>
            <p className="text-gray-600 text-center mb-1">
              Slug: <span className="font-medium">{selectedBrand.slug}</span>
            </p>
          </div>
        </div>
      )}

      {/* 🔼 Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
