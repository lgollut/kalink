import { createStripeClient, prismicReadOptions } from '../services/stripe';

import type Stripe from 'stripe';

export const dynamic = 'force-static';

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

export async function GET() {
  const stripe = createStripeClient();

  const shippingRates = await stripe.shippingRates.list({}, prismicReadOptions);

  const response = {
    results_size: shippingRates.data.length,
    results: shippingRates.data.map(parseShippingRate),
  };

  return Response.json(response);
}
