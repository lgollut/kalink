import { type Content } from '@prismicio/client';
import { NextResponse } from 'next/server';

import { createStripeProductClient } from '../../_services/stripe-product';
import {
  fetchPrismicProducts,
  readPrismicWebhookPayload,
} from '../../_utils/prismic';

export async function POST(request: Request) {
  const stripeClient = createStripeProductClient(
    process.env.STRIPE_SECRET_TEST_KEY,
  );

  try {
    const body = await readPrismicWebhookPayload(request);

    const { addition = [], update = [] } = body.releases;

    let prismicProducts: Content.ProductDocument[] = [];

    for (const release of [...addition, ...update]) {
      prismicProducts = [
        ...prismicProducts,
        ...(await fetchPrismicProducts(release.documents, release.id)),
      ];
    }

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
