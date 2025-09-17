export interface OrderProduct {
  _id: string;
  product: {
    _id: string;
    title: string;
    price: number;
    imageCover: string;
  };
  count: number;
  price: number;
}

export interface OrderData {
  _id: string;
  cartItems: OrderProduct[]; 
  totalOrderPrice: number;   
  createdAt: string;
}
