"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type Category = {
  _id: string;
  name: string;
  image: string;
};

export default function CategorySlider({ categories }: { categories: Category[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 640) setItemsPerView(2);
      else if (window.innerWidth < 768) setItemsPerView(3);
      else if (window.innerWidth < 1024) setItemsPerView(4);
      else setItemsPerView(5);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const maxIndex = Math.max(0, categories.length - itemsPerView);

  if (!categories?.length) return null;

  return (
    <section className="my-12 w-11/12 mx-auto relative">
      <div className="overflow-hidden relative rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex-shrink-0"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="relative h-[180px] w-[160px] group overflow-hidden rounded-xl">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    unoptimized
                    className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl"></div>
                </div>
                <p className="mt-3 text-center font-medium text-gray-800">
                  {cat.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {categories.length > itemsPerView && (
          <>
            <button
              onClick={() =>
                setCurrentIndex((i) => (i === 0 ? maxIndex : i - 1))
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition hover:scale-110"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              onClick={() =>
                setCurrentIndex((i) => (i === maxIndex ? 0 : i + 1))
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition hover:scale-110"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
