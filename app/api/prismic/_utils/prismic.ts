import { type Content, filter, WebhookBodyAPIUpdate } from '@prismicio/client';

import { getByIDs } from '@/app/_services/prismic';

import { KalinkException, PrismicWebhookException } from './exceptions';

export async function readPrismicWebhookPayload(request: Request) {
  try {
    const body = (await request.json()) as WebhookBodyAPIUpdate;

    if (body.secret !== process.env.PRISMIC_WEBHOOK_PRODUCT_SECRET) {
      throw new Error('Invalid webhook secret');
    }

    return body;
  } catch (err) {
    console.error(err);

    throw new KalinkException('An error occured while reading webhook payload');
  }
}

export async function fetchFreshPrismicProducts(ids: string[], ref?: string) {
  try {
    return await getByIDs<Content.ProductDocument>(ids, {
      filters: [filter.at('document.type', 'product')],
      fetchOptions: { cache: 'no-store' },
      ...(ref && { ref }),
    }).then((res) => res.results);
  } catch (err) {
    console.error(err);

    throw new PrismicWebhookException(
      'An error occured while fetching prismic products',
      ids,
    );
  }
}
