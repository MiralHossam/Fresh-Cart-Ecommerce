"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Cart, CartData } from "@/types/cart.type";
import { clearCart, getCartData, removeProduct, updateProductQuantity } from "@/CartAction/CartAction";
import { toast } from "sonner";
import Link from "next/link";

export default function Cart() {
  const [cartLoading, setCartLoading] = useState(true);
  const [cart, setCart] = useState<Cart>();

  useEffect(() => {
    getAllCartData();
  }, []);

  async function getAllCartData() {
    setCartLoading(true);
    const data: CartData = await getCartData();
    setCart(data.data);
    setCartLoading(false);
  }

  async function deleteProduct(id: string){
    const data = await removeProduct(id)
    if (data.status == 'success'){
      toast.success("Product Deleted")
      setCart(data.data); 
    }    

  }

  async function clearCartData(){
    const data = await clearCart()
    if (data.status == 'success'){
      getAllCartData(); 
    }    

  }

  async function updateProductCount(id: string, count: number){
    const data = await updateProductQuantity(id, count)
    if (data.status == 'success'){
        setCart(data.data)
    }

  }


return (
  <div className="max-w-4xl mx-auto p-5">
    <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

    {cartLoading ? (
      <h1 className="text-2xl font-bold mb-6">Loading...</h1>
    ) : !cart || cart.products.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Image
              </th>
              <th scope="col" className="py-3 px-6">
                Product
              </th>
              <th scope="col" className="py-3 px-6">
                Qty
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
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
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <Button
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full"
                      onClick={() =>
                        updateProductCount(item.product._id, item.count -= 1)
                      }
                      disabled={item.count <= 1}
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      value={item.count}
                      readOnly
                      className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <Button
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full"
                      onClick={() =>
                        updateProductCount(item.product._id, item.count += 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {item.price} EGP
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => deleteProduct(item.product._id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="text-xs text-gray-700 uppercase">
            <tr>
              <th colSpan={3} className="px-6 py-3">
                total product price
              </th>
              <th colSpan={1} className="px-6 py-3">
                {cart.totalCartPrice}
              </th>
            </tr>

          </tfoot>

        </table>

        <div className="flex justify-between mt-6">
          <Button  className="bg-red-600 hover:bg-green-700 text-white"
           onClick={clearCartData}
           >
            Clear Cart
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white"><Link href={`/checkoutsession/${cart._id}`}>
          Checkout
          </Link>
            
          </Button>
        </div>
      </div>
    )}
  </div>
);
}
