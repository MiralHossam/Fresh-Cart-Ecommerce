// // "use client";

// // import { useEffect, useState } from "react";
// // import { useSession } from "next-auth/react";
// // import { toast } from "sonner";
// // import {
// //   getWishlistData,
// //   removeFromWishlist,
// // } from "@/WishlistAction/WishlistAction";
// // import ProductCard from "@/app/_Component/ProductCard/ProductCard";
// // import { HomeLoading } from "@/app/_Component/HomeLoading/HomeLoading";
// // import { addToCart } from "@/CartAction/CartAction";

// // export default function Wishlist() {
// //   const { status } = useSession();
// //   const [wishlist, setWishlist] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   async function fetchWishlist() {
// //     try {
// //       const res = await getWishlistData();
// //       setWishlist(res.data || []);
// //     } catch (err) {
// //       toast.error("Failed to load wishlist");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   useEffect(() => {
// //     if (status === "authenticated") {
// //       fetchWishlist();
// //     }
// //   }, [status]);

// //   const handleRemove = async (id: string) => {
// //     try {
// //       await removeFromWishlist(id);
// //       toast.success("Removed from wishlist");
// //       fetchWishlist(); // ✅ local state refresh only
// //     } catch {
// //       toast.error("Failed to remove from wishlist");
// //     }
// //   };

// //   const handleMoveToCart = async (id: string) => {
// //     try {
// //       await addToCart(id);
// //       await removeFromWishlist(id);
// //       toast.success("Moved to cart");
// //       fetchWishlist();
// //     } catch {
// //       toast.error("Failed to move product to cart");
// //     }
// //   };

// //   if (loading) return <HomeLoading />;

// //   return (
// //     <div className="max-w-6xl mx-auto">
// //       <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
// //       {wishlist.length === 0 ? (
// //         <p>Your wishlist is empty</p>
// //       ) : (
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //           {wishlist.map((item) => (
// //             <ProductCard
// //               key={item._id}
// //               product={item}
// //               onRemove={() => handleRemove(item._id)}
// //               onMoveToCart={() => handleMoveToCart(item._id)}
// //             />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { getWishlistData, removeFromWishlist } from "@/WishlistAction/WishlistAction";
// import ProductCard from "@/app/_Component/ProductCard/ProductCard";
// import { useCount } from "@/types/CountProvider";
// import { WishlistProduct } from "@/types/wishlist.type";

// export default function Wishlist() {
//   const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { refreshCounts } = useCount();

//   useEffect(() => {
//     async function fetchWishlist() {
//       try {
//         const res = await getWishlistData();
//         setWishlist(res.data?.data || []);
//         await refreshCounts();
//       } catch {
//         toast.error("Failed to load wishlist");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchWishlist();
//   }, [refreshCounts]);

//   async function handleRemove(productId: string) {
//     try {
//       const res = await removeFromWishlist(productId);
//       if (res.status === "success") {
//         const updated = wishlist.filter((item) => item.product._id !== productId);
//         setWishlist(updated);
//         await refreshCounts();
//         toast.success("Removed from wishlist");
//       } else {
//         toast.error(res.message || "Failed to remove item");
//       }
//     } catch {
//       toast.error("Failed to remove item");
//     }
//   }

//   if (loading) return <p>Loading...</p>;
//   if (wishlist.length === 0) return <p>Your wishlist is empty</p>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {wishlist.map((item) => (
//           <ProductCard
//             key={item._id}
//             product={item.product}
//             onRemove={() => handleRemove(item.product._id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
