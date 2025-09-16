'use server'

import { getUserToken } from "@/getUserToken";


export async function checkoutPayment(cardId: string, shippingData: {details: string , phone: string, city: string}){
  const token: any = await getUserToken()
  if (token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cardId}?url=${process.env.NEXT_URL}`, {
      method: "POST",
      body: JSON.stringify({
        "shippingAddress": shippingData
    }),
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  })
    const data = await res.json();
    return data
  }
}