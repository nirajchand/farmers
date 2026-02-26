"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { handleGetCart } from "@/lib/actions/farmer/CartActions";
import { toast } from "react-toastify";

interface CartContextType {
  cartCount: number;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = async () => {
    try {
      const response = await handleGetCart();
      if (response.success && response.data && response.data.items) {
        setCartCount(response.data.items.length);
      } else {
        setCartCount(0);
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  // fetch cart on mount
  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);