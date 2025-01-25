import { type Content } from '@prismicio/client';
import { NextResponse } from 'next/server';

import { create, getByPrismicId, update } from '../../_services/stripe-product';
import {
  fetchFreshPrismicProducts,
  readPrismicWebhookPayload,
} from '../../_utils/prismic';

export async function POST(request: Request) {
  try {
    const body = await readPrismicWebhookPayload(request);

    if (body.secret !== process.env.PRISMIC_WEBHOOK_PRODUCT_SECRET) {
      return new NextResponse('Invalid token', { status: 401 });
    }

    const { addition: releaseAddition = [], update: realeaseUpdate = [] } =
      body.releases;

    let prismicProducts: Content.ProductDocument[] = [];

    for (const release of [...releaseAddition, ...realeaseUpdate]) {
      prismicProducts = [
        ...prismicProducts,
        ...(await fetchFreshPrismicProducts(release.documents, release.ref)),
      ];
    }

    for (const product of prismicProducts) {
      const prismicId = product.id;

      const stripeProduct = await getByPrismicId(prismicId);

      if (stripeProduct.data.length === 0) {
        await create(product);
      } else {
        await update(product, stripeProduct.data[0]);
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
