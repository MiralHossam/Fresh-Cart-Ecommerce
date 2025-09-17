"use client";

import { useEffect, useState } from "react";
import { addToWishlist, getWishlistData, removeFromWishlist } from "@/WishlistAction/WishlistAction";
import { toast } from "sonner";
import { useCount } from "@/types/CountProvider";

interface AddWishlistBtnProps {
  id: string;
  className?: string;
  hoverSlide?: boolean; 
}

export default function AddWishlistBtn({ id, className, hoverSlide = false }: AddWishlistBtnProps) {
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refreshCounters } = useCount();

  useEffect(() => {
    async function check() {
      try {
        const data = await getWishlistData();
        const wishlistArray = Array.isArray(data?.data) ? data.data : [];
        setInWishlist(wishlistArray.some((item: { _id: string; }) => item._id === id));
      } catch {}
    }
    check();
  }, [id]);

  async function toggleWishlist() {
    setLoading(true);
    try {
      if (inWishlist) {
        await removeFromWishlist(id);
        toast.success("Removed from Wishlist");
      } else {
        await addToWishlist(id);
        toast.success("Added to Wishlist");
      }
      setInWishlist(!inWishlist);
      refreshCounters();
    } catch {
      toast.error("Please login first");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={e => {
        e.preventDefault();
        toggleWishlist();
      }}
      disabled={loading}
      className={`
        text-xl transition-transform duration-300
        ${inWishlist ? "text-red-500" : "text-gray-500"}
        ${hoverSlide ? "absolute top-2 right-2 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" : ""}
        ${className || ""}
      `}
    >
      <i className={`fa-heart ${inWishlist ? "fa-solid" : "fa-regular"}`} />
    </button>
  );
}
