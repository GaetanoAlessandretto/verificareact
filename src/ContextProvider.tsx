import { ReactNode, createContext, useEffect, useState } from "react";
import { Cart, Product, TContext } from "./declarations";;

export const AppContext = createContext<TContext>({
  products: null,
  addToMarked: () => { },
  removeFromCart: () => { },
});

interface Props {
  children: ReactNode;
}

export function ContextProvider({ children }: Props) {
  const [products, setProducts] = useState<TContext["products"]>(null);

  const getProduct = async (id: number) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      const data = await response.json();
    } catch (error: any) {
      console.log(error)
    }
  };


  const addToMarked = (idProduct: Product["id"]) => {
    const productToAdd: any = products?.find((product: Product) => product.id === idProduct);
    if (!productToAdd) {
    }
  }

  const removeFromCart = (idProduct: Product["id"]) => {
    const productToAdd = products?.find((product: Product) => product.id === idProduct);
    if (!!productToAdd) {
      const updatedProducts: any = products?.filter((product: Product) => product.id !== idProduct);
      setProducts(updatedProducts)
    }
  };


  const getProducts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setProducts(data);
    } catch (error: any) {
      console.log(error)
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        addToMarked,
        removeFromCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
