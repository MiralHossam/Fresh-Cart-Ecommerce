"use server";

import { getUserToken } from "@/getUserToken";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export async function getUserOrders(userId: string) {
  const token = await getUserToken();
  if (!token) throw new Error("Token error");

  const res = await fetch(`${BASE_URL}/api/v1/orders/user/${userId}`, {
    headers: { token },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Get Orders API error:", errorText);
    throw new Error("Failed to fetch orders");
  }

  return res.json(); 
}

export async function checkoutPayment(
  cartId: string,
  values: { details: string; phone: string; city: string }
) {
  const token = await getUserToken();
  if (!token) throw new Error("Token error");

  const res = await fetch(`${BASE_URL}/api/v1/orders/checkout-session/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ shippingAddress: values }), 
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Checkout API error:", errorText);
    throw new Error("Checkout failed");
  }

  return res.json(); 
}
