"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCartData } from "@/CartAction/CartAction";
import { getWishlistData } from "@/WishlistAction/WishlistAction";

interface CountContextType {
  cartCount: number;
  wishlistCount: number;
  refreshCounters: () => void;
}

const CountContext = createContext<CountContextType>({
  cartCount: 0,
  wishlistCount: 0,
  refreshCounters: () => {},
});

export function CountProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  async function refreshCounters() {
    try {
      const cartRes = await getCartData();
      setCartCount(
        Array.isArray(cartRes?.data?.products)
          ? cartRes.data.products.reduce((acc, item) => acc + (item.count ?? 0), 0)
          : 0
      );

      const wishlistRes = await getWishlistData();
      const wishlistArray = Array.isArray(wishlistRes)
        ? wishlistRes
        : Array.isArray(wishlistRes?.data)
        ? wishlistRes.data
        : [];
      setWishlistCount(wishlistArray.length);
    } catch {
      setCartCount(0);
      setWishlistCount(0);
    }
  }

  useEffect(() => {
    refreshCounters();
  }, []);

  return (
    <CountContext.Provider value={{ cartCount, wishlistCount, refreshCounters }}>
      {children}
    </CountContext.Provider>
  );
}

export function useCount() {
  return useContext(CountContext);
}
