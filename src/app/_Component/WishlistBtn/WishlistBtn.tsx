// // "use client";

// // import { useState, useEffect } from "react";
// // import { useSession } from "next-auth/react";
// // import { toast } from "sonner";
// // import {
// //   addToWishlist,
// //   getWishlistData,
// //   removeFromWishlist,
// // } from "@/WishlistAction/WishlistAction";

// // interface Props {
// //   productId: string;
// //   variant?: "card" | "inline";
// // }

// // export default function AddWishlistBtn({ productId, variant = "card" }: Props) {
// //   const { status } = useSession();
// //   const [isWishlisted, setIsWishlisted] = useState(false);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function checkWishlist() {
// //       if (status !== "authenticated") {
// //         setLoading(false);
// //         return;
// //       }
// //       try {
// //         const res = await getWishlistData();
// //         const isProductWishlisted = res.data.some(
// //           (item: { _id: string }) => item._id === productId
// //         );
// //         setIsWishlisted(isProductWishlisted);
// //       } catch (err) {
// //         console.error("Error checking wishlist:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     checkWishlist();
// //   }, [productId, status]);

// //   const toggleWishlist = async () => {
// //     if (status !== "authenticated") {
// //       toast.error("Please log in to manage your wishlist");
// //       return;
// //     }
// //     try {
// //       if (isWishlisted) {
// //         await removeFromWishlist(productId);
// //         setIsWishlisted(false);
// //         toast.success("Removed from wishlist");
// //       } else {
// //         await addToWishlist(productId);
// //         setIsWishlisted(true);
// //         toast.success("Added to wishlist");
// //       }
// //       // ✅ no need to call refreshCounts() manually
// //     } catch (err) {
// //       const errorMessage =
// //         err instanceof Error ? err.message : "An error occurred";
// //       toast.error(errorMessage);
// //     }
// //   };

// //   if (status === "loading" || loading) {
// //     return (
// //       <button
// //         className={`text-2xl transition-transform duration-200 hover:scale-110
// //           ${
// //             variant === "card"
// //               ? "absolute top-3 right-[-40px] group-hover:right-3 transition-all z-20"
// //               : "ml-2"
// //           }`}
// //         disabled
// //       >
// //         <i className="fa-regular fa-heart text-red-500" />
// //       </button>
// //     );
// //   }

// //   return (
// //     <button
// //       onClick={toggleWishlist}
// //       className={`text-2xl transition-transform duration-200 hover:scale-110
// //         ${
// //           variant === "card"
// //             ? "absolute top-3 right-[-40px] group-hover:right-3 transition-all z-20"
// //             : "ml-2"
// //         }`}
// //       disabled={status !== "authenticated"}
// //     >
// //       {isWishlisted ? (
// //         <i className="fa-solid fa-heart text-red-500" />
// //       ) : (
// //         <i className="fa-regular fa-heart text-red-500" />
// //       )}
// //     </button>
// //   );
// // }






// "use client";

// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// // import {
// //   addToWishlist,
// //   removeFromWishlist,
// //   getWishlistData,
// // } from "@/WishlistAction/WishlistAction";
// // import { useCount } from "@/types/CountProvider";

// interface Props {
//   productId: string;
//   variant?: "card" | "inline";
// }

// export default function WishlistBtn({ productId, variant = "card" }: Props) {
//   const [loading, setLoading] = useState(false);
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   // const { refreshCounts } = useCount();

//   useEffect(() => {
//     const checkWishlist = async () => {
//       const res = await getWishlistData();
//       const items = res.data?.data ?? [];
//       setIsInWishlist(items.some((item) => item.product._id === productId));
//     };
//     checkWishlist();
//   }, [productId]);

//   const handleWishlist = async () => {
//     try {
//       setLoading(true);
//       if (isInWishlist) {
//         const res = await removeFromWishlist(productId);
//         if (res?.status === "success") {
//           setIsInWishlist(false);
//           await refreshCounts();
//           toast.success("Removed from wishlist");
//         } else {
//           toast.error(res.message || "Failed to remove");
//         }
//       } else {
//         const res = await addToWishlist(productId);
//         if (res?.status === "success") {
//           setIsInWishlist(true);
//           await refreshCounts();
//           toast.success("Added to wishlist");
//         } else {
//           toast.error(res.message || "Failed to add");
//         }
//       }
//     } catch (error) {
//       const msg = error instanceof Error ? error.message : "Something went wrong";
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleWishlist}
//       disabled={loading}
//       className={`text-2xl transition-transform duration-200 hover:scale-110 ${
//         variant === "card"
//           ? "absolute top-3 right-[-40px] group-hover:right-3 transition-all z-20"
//           : "ml-2"
//       }`}
//     >
//       {isInWishlist ? (
//         <i className="fa-solid fa-heart text-red-500" />
//       ) : (
//         <i className="fa-regular fa-heart text-red-500" />
//       )}
//     </button>
//   );
// }
