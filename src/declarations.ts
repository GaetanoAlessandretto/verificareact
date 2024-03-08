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
  products: Array<Product> | null;
  addToMarked: (idProduct: Product["id"]) => void;
  removeFromCart: (idProduct: Product["id"]) => void;
}
