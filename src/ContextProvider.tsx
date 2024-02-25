import { ReactNode, createContext, useEffect, useState } from "react";
import { Cart, Product, TContext } from "./declarations";
import { title } from "process";

export const AppContext = createContext<TContext>({
  cart: [],
  paid: false,
  products: null,
  addToCart: () => { },
  removeFromCart: () => { },
  pay: () => { },
  done: () => { },
  getProductQuantity: () => 0,
  loading: false,
  error: "",
});

interface Props {
  children: ReactNode;
}

export function ContextProvider({ children }: Props) {
  const [cart, setCart] = useState<TContext["cart"]>([]);
  const [paid, setPaid] = useState<TContext["paid"]>(false);
  const [products, setProducts] = useState<TContext["products"]>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const addToCart = (idProduct: Product["id"]) => {
    const found = cart.find((el: any) => el.id === idProduct);
    const productToAdd = products?.find((product: Product) => product.id === idProduct);

    if (!!found) {
      const newCart = cart.map((el: any) => {
        if (el.id !== idProduct) return el;
        return { id: el.id, quantity: el.quantity + 1, title: el.title, description: el.description, price: el.price };
      });
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      setCart([...cart, { id: idProduct, quantity: 1, title: productToAdd?.title || "", description: productToAdd?.description || "", price: productToAdd?.price || "" }]);
    }
  };

  const removeFromCart = (idProduct: Product["id"]) => {
    const newCart = cart.reduce((acc: any, el: any) => {
      if (el.id === idProduct) {
        if (el.quantity > 1) {
          acc.push({ id: el.id, quantity: el.quantity - 1 });
          return acc;
        }
        return acc;
      } else {
        acc.push(el);
        return acc;
      }
    }, [] as Cart);
    setCart(newCart);
  };

  const pay = () => {
    setPaid(true);
    setCart([]);
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://mockend.up.railway.app/api/products"
      );
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const done = () => {
    setPaid(false);
  };

  const getProductQuantity = (idProduct: Product["id"]) => {
    return 0;
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        cart,
        paid,
        products,
        addToCart,
        removeFromCart,
        getProductQuantity,
        pay,
        loading,
        error,
        done,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
