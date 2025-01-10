'use client';

import { createRequiredContext } from '@/utils/create-required-context';

import { CartItem } from './cart';

type CartContext = {
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  updateCart: (id: string, quantity: number) => void;
  cart: CartItem[];
};

export const [useCartContext, CartContextProvider] =
  createRequiredContext<CartContext>();
