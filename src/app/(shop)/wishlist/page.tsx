"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  clearWishlist,
  getWishlistData,
  removeFromWishlist,
} from "@/WishlistAction/WishlistAction";
import { useCount } from "@/types/CountProvider";
import ProductCard from "@/app/_Component/ProductCard/ProductCard";
import type { WishlistProduct } from "@/types/wishlist.type";
import Link from "next/link";
import { AddProductToCart } from "@/CartAction/CartAction";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const { refreshCounters } = useCount();

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    try {
      const response = await getWishlistData();
      const wishlistArray: WishlistProduct[] = Array.isArray(response?.data)
        ? response.data
        : [];
      setWishlist(wishlistArray);
    } catch {
      toast.error("Failed to fetch wishlist");
    }
  }

  async function handleRemove(id: string) {
    try {
      await removeFromWishlist(id);
      setWishlist((prev) => prev.filter((p) => p._id !== id));
      refreshCounters();
      toast.success("Removed from Wishlist");
    } catch {
      toast.error("Error removing item");
    }
  }

  async function handleAddToCart(productId: string) {
    setWishlist((prev) => prev.filter((p) => p._id !== productId));
    refreshCounters();

    try {
      await AddProductToCart(productId);
      toast.success("Added to cart and removed from Wishlist");
      await removeFromWishlist(productId);
    } catch {
      toast.error("Failed to add to cart");
    }
  }

  async function handleClearWishlist() {
    try {
      await clearWishlist();
      setWishlist([]); // reset state
      refreshCounters();
      toast.success("Wishlist cleared");
    } catch {
      toast.error("Failed to clear wishlist");
    }
  }

  if (!wishlist.length)
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
        <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Wishlist</h2>
        <Link href="/create-wishlist">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Create Wishlist
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => {
          const fullProduct = {
            _id: product._id,
            title: product.title,
            price: product.price,
            imageCover: product.imageCover,
            category: {
              _id: product._id,
              name: product.category.name,
              slug: product.category.name.toLowerCase(),
            },
            subcategory: [],
            brand: { _id: "", name: "", slug: "" },
            quantity: 1,
            sold: 0,
            images: [product.imageCover],
            ratingsAverage: 0,
            ratingsQuantity: 0,
            slug: "",
            description: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            id: product._id,
          };

          return (
            <div key={product._id} className="relative">
              <ProductCard
                product={fullProduct}
                onAddedToCart={() => handleAddToCart(product._id)}
                hideWishlistBtn={true}
              />
              <button
                onClick={handleClearWishlist}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
              >
                <i className="fa-solid fa-heart-circle-xmark text-red-500"></i>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
