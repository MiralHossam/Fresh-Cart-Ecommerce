// Single wishlist product
export interface WishlistProduct {
  _id: string; // wishlist entry id
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
  };
}

// API response
export interface WishlistResponse {
  status: "success" | "fail" | "error";
  message?: string;
  data?: {
    data: WishlistProduct[];
  };
}
