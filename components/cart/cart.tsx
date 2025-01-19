'use client';

import { type Content } from '@prismicio/client';
import { ReactNode, useEffect, useState, useTransition } from 'react';
import Stripe from 'stripe';
import useSWR from 'swr';

import { createStripeProductClient } from '@/app/api/prismic/_services/stripe-product';
import { createClient } from '@/prismicio';
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
  const client = createClient({
    accessToken: process.env.NEXT_PUBLIC_PRISMIC_KEY,
  });

  try {
    return await client.getByUIDs('product', ids);
  } catch (err) {
    console.error(err);
  }

  return null;
};

const stripeFetcher = async (ids: string[]) => {
  const client = createStripeProductClient(
    process.env.NEXT_PUBLIC_STRIPE_RESTRICTED_CLIENT_KEY || 'noop',
  );

  return await client.getByPrismicIds(ids);
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
    () => savedCart.map((item) => item.id),
    stripeFetcher,
    { keepPreviousData: true },
  );

  useEffect(() => {
    startTransition(() => {
      const reconciledCart: CartItem[] = [];

      for (const product of prismicProducts?.results ?? []) {
        const stripeProduct = stripeProducts?.data.find(
          (product) => product.metadata.prismicId === product.id,
        );

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
