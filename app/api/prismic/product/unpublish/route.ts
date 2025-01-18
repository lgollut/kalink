import { NextResponse } from 'next/server';

import { createStripeProductClient } from '../../_services/stripe-product';
import { readPrismicWebhookPayload } from '../../_utils/prismic';

export async function POST(request: Request) {
  const stripeClient = createStripeProductClient(
    process.env.STRIPE_SECRET_LIVE_KEY,
  );

  try {
    const body = await readPrismicWebhookPayload(request);

    for (const prismicId of body.documents) {
      await stripeClient.delete(prismicId);
    }
  } catch (err) {
    console.error(err);

    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }

  return new Response('Products deleted successfully');
}
