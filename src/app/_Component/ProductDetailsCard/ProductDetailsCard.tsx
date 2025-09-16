"use client";

import { productItem } from "@/types/productDetails.type";
import React from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import AddCartBtn from "../ProductCard/AddCartBtn";
import { useRouter } from "next/navigation";

export default function ProductDetailsCard({
  product,
}: {
  product: productItem;
}) {
  const {
    title,
    category,
    ratingsAverage,
    description,
    price,
    images = [],
    _id,
  } = product;

  const categoryName = category?.name || ""; // safe fallback
  const router = useRouter();

  return (
    <div className="w-full m-auto">
      {/* ✅ Back Arrow */}
      <button
        onClick={() => router.back()}
        className="flex items-center justify-center w-10 h-10 rounded-full shadow-md bg-white hover:bg-gray-100 text-gray-700 mb-6"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      <div className="grid grid-cols-12 gap-16 items-center">
        {/* Left images */}
        <div className="col-span-4">
          <div className="rounded-2xl shadow-md overflow-hidden">
            <ProductSlider images={images} />
          </div>
        </div>

        {/* Right content */}
        <div className="col-span-8 flex flex-col justify-center space-y-6">
          {/* ✅ Title + Heart on the same line */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{title}</h1>
            {/* <AddWishlistBtn productId={_id} variant="inline" /> */}
          </div>

          <p className="text-gray-600 leading-relaxed">{description}</p>
          <h5 className="text-main font-semibold">{categoryName}</h5>

          {/* Price + Rating */}
          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-xl font-bold text-gray-900">{price} EGP</span>
            <span className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-full">
              <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
              {ratingsAverage}
            </span>
          </div>

          {/* Add to cart button */}
          <AddCartBtn id={_id} />
        </div>
      </div>
    </div>
  );
}


