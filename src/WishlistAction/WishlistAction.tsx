"use server";

import { getUserToken } from "@/getUserToken";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export async function getWishlistData() {
  const token = await getUserToken();
  if (!token) throw new Error("Token error");

  const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    headers: { token },
    cache: "no-store",
  });
  return res.json();
}

export async function addToWishlist(id: string) {
  const token = await getUserToken();
  if (!token) throw new Error("Token error");

  const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    method: "POST",
    body: JSON.stringify({ productId: id }),
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

export async function removeFromWishlist(id: string) {
  const token = await getUserToken();
  if (!token) throw new Error("Token error");

  const res = await fetch(`${BASE_URL}/api/v1/wishlist/${id}`, {
    method: "DELETE",
    headers: { token },
  });

  return res.json();
}

export async function clearWishlist() {
  const token = await getUserToken();
  if (!token) throw new Error("Token error");

  const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    method: "DELETE",
    headers: { token },
  });

  return res.json();
}

