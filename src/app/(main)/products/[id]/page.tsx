import React from 'react'
import ProductDetailsCard from '@/app/_Component/ProductDetailsCard/ProductDetailsCard'
import { ProductDetails, productItem } from '@/types/productDetails.type'

export default async function page({ params }: { params: { id: string }}) {
  const { id } =  params
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`)  
  if (!res.ok) {
    return <p className="text-center text-red-500">Failed to load product.</p>
  }

  const data: ProductDetails = await res.json()
  const product: productItem = data.data

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProductDetailsCard product={product} />
    </div>
  )
}
