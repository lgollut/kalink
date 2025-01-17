'use client';

import { type Content, isFilled } from '@prismicio/client';
import { ReactNode, useEffect, useState, useTransition } from 'react';
import Stripe from 'stripe';
import useSWR from 'swr';

import { ProductWithExpandedPrice } from '@/app/(pages)/shop/services/list-products';
import { createClient } from '@/prismicio';
import { useLocalStorage } from '@/utils/use-local-storage';

import { CartContextProvider } from './cart-context';

const CART_KEY = `KalinK:cart`;

export type SavedCartItem = {
  id: string;
  quantity: number;
};

export type CartItem = Omit<Content.ProductDocument, 'data'> & {
  data: Omit<Content.ProductDocument['data'], 'product'> & {
    product: ProductWithExpandedPrice;
  };
} & { quantity: number };

const prismicFetcher = async (ids: string[]) => {
  const client = createClient({
    accessToken: process.env.NEXT_PUBLIC_PRISMIC_KEY,
  });

  const products = await client.getByUIDs('product', ids);

  return products.results;
};

const stripeFetcher = async (ids: string[]) => {
  const stripe = new Stripe(
    process.env.NEXT_PUBLIC_STRIPE_RESTRICTED_CLIENT_KEY || '',
  );

  try {
    const prices = await Promise.all(
      ids.map(async (id) => {
        try {
          return await stripe.prices.retrieve(id);
        } catch (error) {
          console.error(`Error retrieving price ${id}:`, error);
          return null; // Return null if an error occurs for this price
        }
      }),
    );

    // Filter out any null values (if retrieval failed for some prices)
    return prices.filter((price) => price !== null);
  } catch (error) {
    console.error('Error fetching prices:', error);
    return [];
  }
};

export function Cart({ children }: { children: ReactNode }) {
  const [isPending, startTransition] = useTransition();
  const [savedCart, setSavedCart] = useLocalStorage<SavedCartItem[]>(
    CART_KEY,
    [],
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { data: prismicProducts } = useSWR(
    () => savedCart.map((item) => item.id),
    prismicFetcher,
    { keepPreviousData: true },
  );

  const { data: stripePrices } = useSWR(
    () => {
      if (!prismicProducts) {
        return null;
      }
      const ids: string[] = [];

      for (const product of prismicProducts) {
        if (
          !isFilled.integrationField(product.data.product) ||
          !product.data.product.default_price ||
          typeof product.data.product.default_price !== 'string'
        ) {
          continue;
        }

        ids.push(product.data.product.default_price);
      }

      return ids;
    },
    stripeFetcher,
    { keepPreviousData: true },
  );

  useEffect(() => {
    startTransition(() => {
      const reconciledCart: CartItem[] = [];

      for (const product of prismicProducts || []) {
        if (
          !isFilled.integrationField(product.data.product) ||
          !product.data.product.default_price ||
          typeof product.data.product.default_price !== 'string'
        ) {
          continue;
        }

        const price = stripePrices?.find(
          (price) => price.id === product.data.product?.default_price,
        );

        const productQuantity = savedCart.find(
          (item) => item.id === product.uid,
        )?.quantity;

        if (!price || !productQuantity) {
          continue;
        }

        reconciledCart.push({
          ...product,
          data: {
            ...product.data,
            product: {
              ...(product.data.product as unknown as Stripe.Product),
              default_price: price as Stripe.Price,
            },
          },
          quantity: productQuantity,
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
  }, [prismicProducts, stripePrices, savedCart]);

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
