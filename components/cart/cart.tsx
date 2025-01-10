'use client';

import { ReactNode } from 'react';

import { useLocalStorage } from '@/utils/use-local-storage';

import { CartContextProvider } from './cart-context';

const CART_KEY = `KalinK:cart`;

export type CartItem = {
  id: string;
  quantity: number;
};

export function Cart({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>(CART_KEY, []);

  const addToCart = (id: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);

      if (!existingItem) {
        return [...prevCart, { id, quantity: 1 }];
      }

      return [
        ...prevCart.filter((item) => item.id !== id),
        {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateCart = (id: string, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);

      if (!existingItem) {
        return prevCart;
      }

      return [
        ...prevCart.filter((item) => item.id !== id),
        {
          ...existingItem,
          quantity,
        },
      ];
    });
  };

  return (
    <CartContextProvider
      value={{
        addToCart,
        removeFromCart,
        updateCart,
        cart,
      }}
    >
      {children}
    </CartContextProvider>
  );
}
