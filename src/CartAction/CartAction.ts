"use server";

import { getUserToken } from "@/getUserToken";
import { CartData } from "@/types/cart.type";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

type ApiResponse<T = unknown> = {
  status: string;
  success: boolean;
  message?: string;
  data?: T;
};

export async function getCartData(): Promise<CartData> {
  const token = await getUserToken();
  if (!token) throw new Error("Token error");

  const res = await fetch(`${BASE_URL}/api/v1/cart`, {
    headers: { token: String(token) },
    cache: "no-store",
  });

  return res.json();
}
export async function AddProductToCart(id: string): Promise<ApiResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Token error");

  const res = await fetch(`${BASE_URL}/api/v1/cart`, {
    method: "POST",
    body: JSON.stringify({ productId: id }),
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    } as Record<string, string>,
    cache: "no-store",
  });

  return res.json() as Promise<ApiResponse>;
}

export async function removeProduct(id: string): Promise<ApiResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Token error");

  const res = await fetch(`${BASE_URL}/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: {
      token: String(token),
    } as Record<string, string>,
    cache: "no-store",
  });

  return res.json() as Promise<ApiResponse>;
}

export async function clearCart(): Promise<ApiResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Token error");

  const res = await fetch(`${BASE_URL}/api/v1/cart`, {
    method: "DELETE",
    headers: {
      token: String(token),
    } as Record<string, string>,
    cache: "no-store",
  });

  return res.json() as Promise<ApiResponse>;
}

export async function updateProductQuantity(
  id: string,
  count: number
): Promise<ApiResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Token error");

  const res = await fetch(`${BASE_URL}/api/v1/cart/${id}`, {
    method: "PUT",
    body: JSON.stringify({ count }),
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    } as Record<string, string>,
    cache: "no-store",
  });

  return res.json() as Promise<ApiResponse>;
}

type CheckoutDetails = {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
};

export async function checkoutPayment(
  cartId: string,
  details: CheckoutDetails
): Promise<ApiResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Token error");

  const res = await fetch(`${BASE_URL}/api/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: String(token),
    } as Record<string, string>,
    body: JSON.stringify({
      cartId,
      ...details,
    }),
  });

  return res.json() as Promise<ApiResponse>;
}
