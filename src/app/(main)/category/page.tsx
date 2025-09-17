"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HomeLoading } from "@/app/_Component/HomeLoading/HomeLoading";
import ScrollToTop from "@/app/_Component/ScrollToTop/ScrollToTop";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [subLoading, setSubLoading] = useState(false);

  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`
        );
        const data = await res.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  async function fetchSubCategories(category: Category) {
    setActiveCategory(category);
    setSubLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${category._id}/subcategories`
      );
      const data = await res.json();
      setSubCategories(data.data);

      // Smooth scroll down
      setTimeout(() => {
        subRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setSubLoading(false);
    }
  }

  if (loading) return <HomeLoading />;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen relative">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-10 text-main relative">
        Our Categories
        <span className="block w-20 h-1 bg-main mx-auto mt-2 rounded-full"></span>
      </h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => fetchSubCategories(cat)}
            className={`flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow border cursor-pointer w-56 h-64 
                        transition transform hover:scale-105 hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] ${
                          activeCategory?._id === cat._id
                            ? "border-main shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                            : "border-main/10"
                        }`}
          >
            <div className="w-44 h-44 relative mb-3">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                className="object-contain rounded-lg"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">{cat.name}</h2>
          </div>
        ))}
      </div>

      {/* Subcategories Panel */}
      {activeCategory && (
        <div
          ref={subRef}
          className="mt-16 p-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-500"
        >
          <h2 className="text-2xl font-bold text-main mb-8 text-center">
            {activeCategory.name} Subcategories
            <span className="block w-16 h-1 bg-main mx-auto mt-2 rounded-full"></span>
          </h2>

          {subLoading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 animate-fadeIn">
              {subCategories.map((sub) => (
                <div
                  key={sub._id}
                  className="bg-white p-5 text-center rounded-xl shadow border border-gray-100 
                             hover:shadow-md hover:-translate-y-1 transition transform duration-200"
                >
                  <p className="text-gray-700 font-medium">{sub.name}</p>
                </div>
              ))}
              {subCategories.length === 0 && (
                <p className="col-span-full text-center text-gray-400 italic">
                  No subcategories available
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <ScrollToTop />
    </div>
  );
}
