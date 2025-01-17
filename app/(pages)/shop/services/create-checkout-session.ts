'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

type CheckoutDataItem = {
  price: string;
  quantity: number;
};

export type ShippingRate = {
  amount: number;
  currency: string;
  name: string;
};

export type CheckoutData = {
  items: CheckoutDataItem[];
  shippingRate: ShippingRate;
};

export async function createCheckoutSession(checkoutData: CheckoutData) {
  const headersList = await headers();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

  const origin: string = headersList.get('origin') as string;

  const { url } = await stripe.checkout.sessions.create({
    line_items: checkoutData.items,
    mode: 'payment',
    success_url: `${origin}/shop/checkout?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/shop`,
    shipping_address_collection: {
      allowed_countries: ['CH'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: checkoutData.shippingRate.amount,
            currency: checkoutData.shippingRate.currency,
          },
          display_name: checkoutData.shippingRate.name,
        },
      },
    ],
  });

  redirect(url as string);
}
