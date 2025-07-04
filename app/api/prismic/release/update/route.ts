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

    for (const release of [...releaseAddition, ...realeaseUpdate]) {
      const prismicProduct = await fetchFreshPrismicProducts(
        release.documents,
        release.ref,
      );

      for (const product of prismicProduct) {
        const stripeProduct = await getByPrismicId({
          id: product.id,
          releaseId: release.id,
        });

        if (stripeProduct.data.length === 0) {
          await create({ product, testMode: true });
        } else {
          await update({
            product,
            stripeProduct: stripeProduct.data[0],
            testMode: true,
          });
        }
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
