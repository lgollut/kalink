import { privateFeed } from '../services/private-feed';
import { createStripeClient, prismicReadOptions } from '../services/stripe';

import type Stripe from 'stripe';

export const dynamic = 'force-dynamic';

function parseShippingRate(shippingRate: Stripe.ShippingRate) {
  const amount = new Intl.NumberFormat('fr-CH', {
    style: 'currency',
    currency: shippingRate.fixed_amount?.currency ?? 'CHF',
  }).format(shippingRate.fixed_amount?.amount ?? 0 / 100);

  return {
    id: shippingRate.id,
    title: shippingRate.display_name,
    description: amount,
    blob: shippingRate,
  };
}

export function GET(request: Request) {
  return privateFeed(request, async () => {
    const stripe = createStripeClient();
    const shippingRates = await stripe.shippingRates.list(
      {},
      prismicReadOptions,
    );
    return {
      results_size: shippingRates.data.length,
      results: shippingRates.data.map(parseShippingRate),
    };
  });
}
