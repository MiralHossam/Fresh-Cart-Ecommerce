"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Cart } from "@/types/cart.type"; // keep it, remove eslint-disable-next-line
import {
  clearCart,
  getCartData,
  removeProduct,
  updateProductQuantity,
} from "@/CartAction/CartAction";
import { toast } from "sonner";
import Link from "next/link";

export default function Cart() {
  const [cartLoading, setCartLoading] = useState(true);
  const [cart, setCart] = useState<Cart>();
  const [updatingIds, setUpdatingIds] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    getAllCartData();
  }, []);

  async function getAllCartData() {
    setCartLoading(true);
    try {
      const response = await getCartData();
      if (response.data) {
        setCart(response.data as Cart); 
      }
    } finally {
      setCartLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    const response = await removeProduct(id);
    if (response.success) {
      toast.success("Product Deleted", { position: "bottom-right" });
      setCart((prev) =>
        prev
          ? { ...prev, products: prev.products.filter((p) => p._id !== id) }
          : undefined
      );
    }
  }

  async function clearCartData() {
    const response = await clearCart();
    if (response.success) {
      toast.success("Cart Cleared", { position: "bottom-right" });
      getAllCartData();
    }
  }

  async function updateProductCount(id: string, count: number) {
    setUpdatingIds((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await updateProductQuantity(id, count);
      if (response.success && cart) {
        setCart({
          ...cart,
          products: cart.products.map((p) =>
            p._id === id ? { ...p, count } : p
          ),
        });
      }
    } finally {
      setUpdatingIds((prev) => ({ ...prev, [id]: false }));
    }
  }

  const totalItems =
    cart?.products.reduce((acc, item) => acc + item.count, 0) ?? 0;
  const totalPrice = cart?.totalCartPrice ?? 0;

  if (cartLoading) return <h2 className="text-xl">Loading...</h2>;

  if (!cart || cart.products.length === 0)
    return (
      <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
    );

  return (
    <div className="max-w-5xl mx-auto p-5">
      <div className="bg-white shadow-md rounded-xl p-5 mb-6 flex justify-between items-center">
        <div>
          <p className="text-gray-600">
            <span className="font-semibold">Items:</span> {totalItems}
          </p>
          <p className="text-gray-900 text-lg font-semibold">
            Total: {totalPrice} EGP
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={clearCartData}
          >
            Clear Cart
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Link href={`/checkoutsession/${cart._id}`}>Checkout</Link>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-xl">
        <table className="w-full text-sm text-left text-gray-600 bg-white rounded-xl">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="py-3 px-6">Image</th>
              <th className="py-3 px-6">Product</th>
              <th className="py-3 px-6">Qty</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 px-6">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={80}
                    height={80}
                    className="w-16 md:w-24 rounded"
                  />
                </td>
                <td className="py-4 px-6 font-medium">{item.product.title}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <button
                      className="h-6 w-6 flex items-center justify-center text-gray-700 border border-gray-300 rounded-full bg-white disabled:opacity-50"
                      onClick={() =>
                        updateProductCount(item._id, item.count - 1)
                      }
                      disabled={item.count <= 1 || updatingIds[item._id]}
                    >
                      -
                    </button>
                    <div className="mx-2 w-14 text-center border rounded-md h-8 flex items-center justify-center">
                      {updatingIds[item._id] ? (
                        <i className="fas fa-spinner fa-spin text-gray-500 text-sm" />
                      ) : (
                        <span>{item.count}</span>
                      )}
                    </div>
                    <button
                      className="h-6 w-6 flex items-center justify-center text-gray-700 border border-gray-300 rounded-full bg-white disabled:opacity-50"
                      onClick={() =>
                        updateProductCount(item._id, item.count + 1)
                      }
                      disabled={
                        item.count >= item.product.quantity ||
                        updatingIds[item._id]
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-4 px-6">{item.price} EGP</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
