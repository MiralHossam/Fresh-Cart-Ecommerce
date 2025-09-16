'use client'
import { AddProductToCart } from "@/CartAction/CartAction";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";


export default function AddCartBtn({ id }: {id: string }) {
  const [loading, setLoading] = useState(false);

  async function addProduct(id:string) {
    try{
          const data = await AddProductToCart(id)
    if (data.status == 'success'){
      toast.success(data.message)
    }
    else{
      toast.success("Incorrect ID")
    }
    } catch(err){
      toast.error("login first")
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



