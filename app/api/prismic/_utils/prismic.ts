import { type Content, filter, WebhookBodyAPIUpdate } from '@prismicio/client';

import { createClient } from '@/prismicio';

import { KalinkWebhookException, PrismicWebhookException } from './exceptions';

export async function readPrismicWebhookPayload(request: Request) {
  try {
    const body = (await request.json()) as WebhookBodyAPIUpdate;

    if (body.secret !== process.env.PRISMIC_WEBHOOK_PRODUCT_SECRET) {
      throw new Error('Invalid webhook secret');
    }
  } catch (err) {
    console.error(err);

    throw new KalinkWebhookException(
      'An error occured while reading webhook payload',
    );
  }
}

export async function fetchPrismicProducts(ids: string[]) {
  try {
    return await createClient()
      .getByIDs<Content.ProductDocument>(ids, {
        filters: filter.at('document.type', 'product'),
      })
      .then((res) => res.results);
  } catch (err) {
    console.error(err);

    throw new PrismicWebhookException(
      'An error occured while fetching prismic products',
      ids,
    );
  }
}
