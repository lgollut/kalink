import { NextResponse } from 'next/server';

import { deleteProduct } from '../../_services/stripe-product';
import { readPrismicWebhookPayload } from '../../_utils/prismic';

export async function POST(request: Request) {
  try {
    const body = await readPrismicWebhookPayload(request);

    if (body.secret !== process.env.PRISMIC_WEBHOOK_PRODUCT_SECRET) {
      return new NextResponse('Invalid token', { status: 401 });
    }

    for (const prismicId of body.documents) {
      await deleteProduct({ id: prismicId });
    }
  } catch (err) {
    console.error(err);

    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }

  return new Response('Products deleted successfully');
}
