export type Cart = Array<{
  id: number;
  quantity: number;
  title: string;
  description: string;
  price: string;
}>;

export interface Product {
  quantity: number;
  userId: number;
  title: string;
  description: string;
  id: number;
  price: string;
  image: string;
  thumbnail: string;
}

export interface TContext {
  cart: Cart;
  paid: boolean;
  products: Array<Product> | null;
  loading: boolean;
  error: string;
  addToCart: (idProduct: Product["id"]) => void;
  removeFromCart: (idProduct: Product["id"]) => void;
  pay: () => void;
  done: () => void;
  getProductQuantity: (idProduct: Product["id"]) => number;
}
