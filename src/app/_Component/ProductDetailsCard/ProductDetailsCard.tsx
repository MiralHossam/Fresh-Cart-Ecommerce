"use client";

import { productItem } from "@/types/productDetails.type";
import React from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import AddCartBtn from "../ProductCard/AddCartBtn";
import { useRouter } from "next/navigation";
import AddWishlistBtn from "../WishlistBtn/WishlistBtn";

interface ProductDetailsCardProps {
  product: productItem;
}

export default function ProductDetailsCard({ product }: ProductDetailsCardProps) {
  const { title, category, ratingsAverage, description, price, images = [], _id } = product;
  const categoryName = category?.name || "";
  const router = useRouter();

  return (
    <div className="w-full m-auto overflow-x-hidden">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center justify-center w-10 h-10 rounded-full shadow-md bg-white hover:bg-gray-100 text-gray-700 mb-6"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      <div className="grid grid-cols-12 gap-8 md:gap-16">
        {/* Product Images */}
        <div className="col-span-12 md:col-span-4 overflow-hidden">
          <div className="rounded-2xl shadow-md">
            <ProductSlider images={images} />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-span-12 md:col-span-8 flex flex-col justify-center space-y-6">
          {/* Title + Wishlist button on same line */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{title}</h1>
            <AddWishlistBtn id={_id} />
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{description}</p>

          {/* Category */}
          <h5 className="text-main font-semibold">{categoryName}</h5>

          {/* Price & Rating */}
          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-xl font-bold text-gray-900">{price} EGP</span>
            <span className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-full">
              <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
              {ratingsAverage}
            </span>
          </div>

          {/* Add to Cart */}
          <AddCartBtn id={_id} />
        </div>
      </div>
    </div>
  );
}
