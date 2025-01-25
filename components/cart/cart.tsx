'use client';

import { type Content } from '@prismicio/client';
import { ReactNode, useEffect, useState, useTransition } from 'react';
import Stripe from 'stripe';
import useSWR from 'swr';

import { getByUIDs } from '@/app/_services/prismic';
import { getByPrismicIds } from '@/app/api/prismic/_services/stripe-product';
import { useLocalStorage } from '@/utils/use-local-storage';

import { CartContextProvider } from './cart-context';

const CART_KEY = `KalinK:cart`;

export type SavedCartItem = {
  id: string;
  quantity: number;
};

export type CartItem = Content.ProductDocument & {
  quantity: number;
  stripeProduct: Stripe.Product;
};

const productFetcher = async (ids: string[]) => {
  return await getByUIDs<Content.ProductDocument>('product', ids);
};

export function Cart({ children }: { children: ReactNode }) {
  const [_, startTransition] = useTransition();
  const [savedCart, setSavedCart] = useLocalStorage<SavedCartItem[]>(
    CART_KEY,
    [],
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { data: prismicProducts } = useSWR(
    () => savedCart.map((item) => item.id),
    productFetcher,
    { keepPreviousData: true },
  );

  const { data: stripeProducts } = useSWR(
    () => prismicProducts?.results.map((item) => item.id),
    getByPrismicIds,
    { keepPreviousData: true },
  );

  useEffect(() => {
    startTransition(() => {
      const reconciledCart: CartItem[] = [];

      for (const product of prismicProducts?.results ?? []) {
        const stripeProduct = stripeProducts?.data.find(({ metadata }) => {
          return metadata.prismicId === product.id;
        });

        const productQuantity = savedCart.find(
          (item) => item.id === product.uid,
        )?.quantity;

        if (!stripeProduct || !productQuantity) {
          continue;
        }

        reconciledCart.push({
          ...product,
          quantity: productQuantity,
          stripeProduct,
        });
      }

      setCart(
        reconciledCart.toSorted((a, b) => {
          if (a.uid < b.uid) {
            return -1;
          }

          if (a.uid > b.uid) {
            return 1;
          }

          return 0;
        }),
      );
    });
  }, [prismicProducts, stripeProducts, savedCart]);

  const addToCart = (id: string) => {
    setSavedCart((prevCart) => {
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
    setSavedCart((prevCart) => {
      return prevCart.filter((item) => item.id !== id);
    });
  };

  const updateCart = (id: string, quantity: number) => {
    setSavedCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);

      if (!existingItem) {
        return prevCart;
      }

      if (quantity === 0) {
        return prevCart.filter((item) => item.id !== id);
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
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContextProvider>
  );
}
