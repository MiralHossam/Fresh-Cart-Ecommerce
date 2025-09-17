"use client";

import { AddProductToCart } from "@/CartAction/CartAction";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useCount } from "@/types/CountProvider";

interface AddCartBtnProps {
  id: string;
  onAdded?: () => void; 
}

export default function AddCartBtn({ id, onAdded }: AddCartBtnProps) {
  const [loading, setLoading] = useState(false);
  const { refreshCounters } = useCount();

  async function addProduct(id: string) {
    setLoading(true);
    try {
      const data = await AddProductToCart(id);
      if (data.status === "success") {
        toast.success(data.message);
        refreshCounters();
        if (onAdded) onAdded(); 
      } else {
        toast.error("Incorrect product ID");
      }
    } catch {
      toast.error("Please login first");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={() => addProduct(id)}
      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 w-full"
      disabled={loading}
    >
      {loading ? (
        <>
          <i className="fas fa-spinner fa-spin" />
          <span>Adding...</span>
        </>
      ) : (
        <>
          <i className="fas fa-shopping-cart" />
          <span>Add to Cart</span>
        </>
      )}
    </Button>
  );
}
