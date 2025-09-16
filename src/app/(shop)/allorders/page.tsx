"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders`, {
          headers: {
            token: token, // ⚠️ replace with real user token
          },
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setOrdersLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {ordersLoading ? (
        <h1 className="text-2xl font-bold mb-6">Loading...</h1>
      ) : !orders || orders.length === 0 ? (
        <p>You have no orders yet</p>
      ) : (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">Image</th>
                <th scope="col" className="py-3 px-6">Product</th>
                <th scope="col" className="py-3 px-6">Qty</th>
                <th scope="col" className="py-3 px-6">Price</th>
                <th scope="col" className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) =>
                order.products.map((item: any) => (
                  <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="py-4 px-6">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={80}
                        height={80}
                        className="w-16 md:w-32 rounded"
                      />
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                      {item.product.title}
                    </td>
                    <td className="py-4 px-6">{item.count}</td>
                    <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                      {item.price} EGP
                    </td>
                    <td className="py-4 px-6">{order.status ?? "Processing"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
