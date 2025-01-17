'use server';

import Stripe from 'stripe';

import { ProductWithExpandedPrice } from './list-products';
import { createClient } from '@/prismicio';

export async function getProductById(productId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

  const product = (await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })) as ProductWithExpandedPrice;

  return product;
}
