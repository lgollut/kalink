import { NextResponse } from 'next/server';

import { createStripeProductClient } from '../../_services/stripe-product';
import {
  fetchPrismicProducts,
  readPrismicWebhookPayload,
} from '../../_utils/prismic';

export async function POST(request: Request) {
  const stripeClient = createStripeProductClient(
    process.env.STRIPE_SECRET_LIVE_KEY,
  );

  try {
    const body = await readPrismicWebhookPayload(request);
    const prismicProducts = await fetchPrismicProducts(body.documents);

    for (const product of prismicProducts) {
      const prismicId = product.id;

      const stripeProduct = await stripeClient.getByPrismicId(prismicId);

      if (stripeProduct.data.length === 0) {
        await stripeClient.create(product);
      } else {
        await stripeClient.update(product, stripeProduct.data[0]);
      }
    }
  } catch (err) {
    console.error(err);

    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }

  return new NextResponse('Products updated successfully');
}
