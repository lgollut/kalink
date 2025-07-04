'use server';

import { type Content } from '@prismicio/client';
import { revalidateTag } from 'next/cache';
import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import Stripe from 'stripe';

import {
  StripeCreateWebhookException,
  StripeDeleteWebhookException,
  StripeUpdateWebhookException,
} from '../_utils/exceptions';

import { createStripeClient } from './stripe-client';

type GetByPrismicId = {
  id: string;
  options?: Partial<Stripe.ProductSearchParams>;
  releaseId?: string;
};

export async function getByPrismicId({
  id,
  options = {},
  releaseId,
}: GetByPrismicId) {
  'use cache';

  const client = createStripeClient({ testMode: !!releaseId });

  const products = await client.products.search({
    limit: 1,
    ...options,
    query: `metadata["prismicId"]:"${id}"`,
  });

  if (process.env.NODE_ENV === 'development') {
    cacheLife('seconds');
  } else {
    const tags: string[] = [
      'stripe',
      id,
      ...products.data.map((product) => product.id),
    ];

    if (releaseId) {
      tags.push(releaseId);
    }

    cacheTag.apply(null, tags);
  }

  return { ...products };
}

type GetByPrismicIds = {
  ids: string[];
  releaseId?: string;
};

export async function getByPrismicIds({ ids, releaseId }: GetByPrismicIds) {
  'use cache';

  const client = createStripeClient({ testMode: !!releaseId });

  const products = await client.products.search({
    query: ids.reduce((acc, id) => {
      if (acc === '') {
        return `metadata["prismicId"]:"${id}"`;
      }

      return `${acc} OR metadata["prismicId"]:"${id}"`;
    }, ''),
  });

  if (process.env.NODE_ENV === 'development') {
    cacheLife('seconds');
  } else {
    const tags: string[] = [
      'stripe',
      ...ids,
      ...products.data.map((product) => product.id),
    ];

    if (releaseId) {
      tags.push(releaseId);
    }

    cacheTag.apply(null, tags);
  }

  return { ...products };
}

type GetDefaultPriceById = {
  mayBeId: Stripe.Product['default_price'];
  releaseId?: string;
};

export async function getDefaultPriceById({
  mayBeId,
  releaseId,
}: GetDefaultPriceById) {
  'use cache';

  const client = createStripeClient({ testMode: !!releaseId });

  if (!mayBeId) {
    return null;
  }

  const id = typeof mayBeId === 'string' ? mayBeId : mayBeId.id;

  if (process.env.NODE_ENV === 'development') {
    cacheLife('seconds');
  } else {
    const tags: string[] = ['stripe', id];

    if (releaseId) {
      tags.push(releaseId);
    }

    cacheTag.apply(null, tags);
  }

  const products = await client.prices.retrieve(id);

  return { ...products };
}

type CreateArgs = {
  product: Content.ProductDocument;
  testMode?: boolean;
};

export async function create({ product, testMode = false }: CreateArgs) {
  const client = createStripeClient({ testMode });

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

type UpdateArgs = {
  product: Content.ProductDocument;
  stripeProduct: Stripe.Product;
  testMode?: boolean;
};

export async function update({
  product,
  stripeProduct,
  testMode = false,
}: UpdateArgs) {
  const client = createStripeClient({ testMode });

  let updatedProduct: Stripe.Product;

  console.log('update product');
  console.dir(product, { depth: null });

  try {
    let newPriceId: string | null = null;

    const oldPriceId =
      typeof stripeProduct.default_price === 'string'
        ? stripeProduct.default_price
        : stripeProduct.default_price?.id;

    if (stripeProduct.default_price !== product.data.unitAmount) {
      ({ id: newPriceId } = await client.prices.create({
        product: stripeProduct.id,
        currency: product.data.currency,
        unit_amount: product.data.unitAmount || 0,
      }));
    }

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
      ...(newPriceId && { default_price: newPriceId }),
    });

    if (oldPriceId && newPriceId) {
      await client.prices.update(oldPriceId, { active: false });
    }
  } catch (err) {
    throw new StripeUpdateWebhookException((err as Error).message, product.id);
  } finally {
    revalidateTag(product.id);
  }

  return updatedProduct;
}

type DeleteArgs = {
  id: string;
  testMode?: boolean;
};

export async function deleteProduct({ id, testMode = false }: DeleteArgs) {
  const client = createStripeClient({ testMode });

  console.log('delete product', id);

  try {
    return await client.products.del(id);
  } catch (err) {
    throw new StripeDeleteWebhookException((err as Error).message, id);
  } finally {
    revalidateTag(id);
  }
}
