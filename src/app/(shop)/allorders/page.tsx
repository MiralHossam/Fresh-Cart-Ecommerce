"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { getUserOrders } from "@/OrderAction/OrderAction";

interface UserWithId {
  _id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface ProductElement {
  count: number;
  _id: string;
  product: {
    _id: string;
    title: string;
    quantity: number;
    imageCover: string;
  };
  price: number;
}

interface Order {
  _id: string;
  products: ProductElement[];
  totalCartPrice: number;
  status?: string;
}

export default function AllOrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders(userId: string) {
      try {
        const response = await getUserOrders(userId);
        setOrders(response || []);
      } catch {
        toast.error("Failed to fetch orders");
      }
    }

    if (status === "authenticated" && (session?.user as UserWithId)?._id) {
      fetchOrders((session.user as UserWithId)._id);
    }
  }, [status, session]);

  if (!orders.length)
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
        <p className="text-gray-500 mb-4">You have no orders yet.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-6">All Your Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <div key={order._id} className="border p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
            <p>Total Items: {order.products.length}</p>
            <p>Total Price: ${order.totalCartPrice}</p>
            <p>Status: {order.status || "Pending"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
