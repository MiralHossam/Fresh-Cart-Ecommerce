export interface WishlistData {
  status: string;
  count: number;
  data: WishlistProduct[];
}

export interface WishlistProduct {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  category: {
    name: string;
  };
}
