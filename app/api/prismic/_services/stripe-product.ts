'use server';

import { type Content } from '@prismicio/client';
import { revalidateTag } from 'next/cache';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import Stripe from 'stripe';

import {
  StripeCreateWebhookException,
  StripeDeleteWebhookException,
  StripeUpdateWebhookException,
} from '../_utils/exceptions';

import { createStripeClient } from './stripe-client';

export async function getByPrismicId(
  id: string,
  options: Partial<Stripe.ProductSearchParams> = {},
) {
  'use cache';

  const client = createStripeClient();

  const products = await client.products.search({
    limit: 1,
    ...options,
    query: `metadata["prismicId"]:"${id}"`,
  });

  cacheTag.apply(null, [
    'stripe',
    id,
    ...products.data.map((product) => product.id),
  ]);

  return { ...products };
}

export async function getByPrismicIds(ids: string[]) {
  'use cache';

  const client = createStripeClient();

  const products = await client.products.search({
    query: ids.reduce((acc, id) => {
      if (acc === '') {
        return `metadata["prismicId"]:"${id}"`;
      }

      return `${acc} OR metadata["prismicId"]:"${id}"`;
    }, ''),
  });

  cacheTag.apply(null, [
    'stripe',
    ...ids,
    ...products.data.map((product) => product.id),
  ]);

  return { ...products };
}

export async function getDefaultPriceById(
  mayBeId: Stripe.Product['default_price'],
) {
  'use cache';

  const client = createStripeClient();

  if (!mayBeId) {
    return null;
  }

  const id = typeof mayBeId === 'string' ? mayBeId : mayBeId.id;

  cacheTag('stripe', id);

  const products = await client.prices.retrieve(id);

  return { ...products };
}

export async function create(product: Content.ProductDocument) {
  const client = createStripeClient();

  console.log('create product');
  console.dir(product, { depth: null });

  try {
    return await client.products.create({
      name: product.data.name || '',
      description: product.data.description || '',
      ...(product.data.images[0]?.image?.url && {
        images: [product.data.images[0].image.url],
      }),
      default_price_data: {
        currency: product.data.currency,
        unit_amount: product.data.unitAmount || 0,
      },
      metadata: {
        prismicId: product.id,
      },
      shippable: !!product.data.shipping,
    });
  } catch (err) {
    throw new StripeCreateWebhookException((err as Error).message, product.id);
  } finally {
    revalidateTag(product.id);
  }
}

export async function update(
  product: Content.ProductDocument,
  stripeProduct: Stripe.Product,
) {
  const client = createStripeClient();

  let updatedProduct: Stripe.Product;

  console.log('update product');
  console.dir(product, { depth: null });

  try {
    updatedProduct = await client.products.update(stripeProduct.id, {
      name: product.data.name || '',
      description: product.data.description || '',
      ...(product.data.images[0]?.image?.url && {
        images: [product.data.images[0].image.url],
      }),
      metadata: {
        prismicId: product.id,
      },
      shippable: !!product.data.shipping,
    });

    if (updatedProduct.default_price) {
      const priceId =
        typeof updatedProduct.default_price === 'string'
          ? updatedProduct.default_price
          : updatedProduct.default_price.id;

      const currentPrice = await client.prices.retrieve(priceId);

      if (currentPrice.unit_amount !== product.data.unitAmount) {
        await client.prices.create({
          product: stripeProduct.id,
          currency: product.data.currency,
          unit_amount: product.data.unitAmount || 0,
        });
      }
    }
  } catch (err) {
    throw new StripeUpdateWebhookException((err as Error).message, product.id);
  } finally {
    revalidateTag(product.id);
  }

  return updatedProduct;
}

export async function deleteProduct(id: string) {
  const client = createStripeClient();

  console.log('delete product', id);

  try {
    return await client.products.del(id);
  } catch (err) {
    throw new StripeDeleteWebhookException((err as Error).message, id);
  } finally {
    revalidateTag(id);
  }
}
