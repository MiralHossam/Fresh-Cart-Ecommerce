'use server'
import { getUserToken } from "@/getUserToken";
import { getSession } from "next-auth/react";
import { CartData } from "@/types/cart.type";


export async function getCartData() {
  const token: any = await getUserToken();
  if (!token) {
    throw new Error("Token error");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    headers: {
      token: token,
    },
  });
  const data = await res.json();
  return data;
}

export async function AddProductToCart(id: string) {
  const token: any = await getUserToken(); 
  if (!token) {
    throw new Error("token error")
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    method: "POST",
    body: JSON.stringify({ 
      productId: id
     }),
     headers: {
      token: token,
      'Content-Type': 'application/json' 
     }
  });
  const data = await res.json();
  return data;
}

export async function removeProduct(id: string){
    const token: any = await getUserToken(); 
  if (!token) {
    throw new Error("token error")
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: {
      token: token,
     }
  });
  const data = await res.json();
  return data;

}

export async function clearCart(){
    const token: any = await getUserToken(); 
  if (!token) {
    throw new Error("token error")
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    method: "DELETE",
    headers: {
      token: token,
    }
  });
  const data = await res.json();
  return data;

}

export async function updateProductQuantity(id: string, count: number){
    const token: any = await getUserToken(); 
  if (!token) {
    throw new Error("token error")
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
    method: "put",
    body:JSON.stringify({
      count: count
    }),
    headers: {
      token: token,
      'content-type': "application/json"
     }
  });
  const data = await res.json();
  return data;

}