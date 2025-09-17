"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { product } from "@/types/product.type";
import AddCartBtn from "./AddCartBtn";
import AddWishlistBtn from "../WishlistBtn/WishlistBtn";

interface ProductCardProps {
  product: product;
  hideWishlistBtn?: boolean;
  inlineWishlist?: boolean;
  onAddedToCart?: () => void;
}

export default function ProductCard({
  product,
  hideWishlistBtn = false,
  inlineWishlist = false,
  onAddedToCart,
}: ProductCardProps) {
  const { imageCover, title, ratingsAverage, price, category, _id } = product;

  return (
    <Card className="bg-white relative group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl">
      <div className="relative">
        <Link href={"/products/" + _id} className="block">
          <CardHeader className="p-4 pb-0">
            <Image
              src={imageCover}
              alt={title}
              width={200}
              height={200}
              className="w-full h-[200px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </CardHeader>
          <CardContent className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-main text-sm">
                {category.name}
              </CardTitle>
              {inlineWishlist && !hideWishlistBtn && (
                <AddWishlistBtn id={_id} hoverSlide={false} />
              )}
            </div>
            <CardTitle className="text-lg mb-2 line-clamp-1">{title}</CardTitle>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-900">{price} EGP</span>
              <span className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-full">
                <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
                {ratingsAverage}
              </span>
            </div>
          </CardContent>
        </Link>

        {!hideWishlistBtn && !inlineWishlist && (
          <AddWishlistBtn id={_id} hoverSlide={true} />
        )}
      </div>

      <CardFooter className="p-4 pt-0">
        <AddCartBtn id={_id} onAdded={onAddedToCart} />
      </CardFooter>
    </Card>
  );
}
