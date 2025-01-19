import { type Content } from '@prismicio/client';
import Stripe from 'stripe';

import {
  StripeClientException,
  StripeWebhookException,
} from '../_utils/exceptions';

export function createStripeProductClient(stripeKey?: string) {
  let client = new Stripe(stripeKey ?? (process.env.STRIPE_SECRET_KEY || ''));

  return {
    getByPrismicId: async (
      id: string,
      options: Partial<Stripe.ProductSearchParams> = {},
    ) => {
      try {
        return await client.products.search({
          limit: 1,
          ...options,
          query: `metadata["prismicId"]:"${id}"`,
        });
      } catch (err) {
        console.error(err);

        throw new StripeWebhookException((err as Error).message, id);
      }
    },

    getByPrismicIds: async (ids: string[]) => {
      try {
        return await client.products.search({
          query: ids.reduce((acc, id) => {
            if (acc === '') {
              return `metadata["prismicId"]:"${id}"`;
            }

            return `${acc} OR metadata["prismicId"]:"${id}"`;
          }, ''),
        });
      } catch (err) {
        console.error(err);

        throw new StripeClientException((err as Error).message);
      }
    },

    getDefaultPriceById: async (mayBeId: Stripe.Product['default_price']) => {
      if (!mayBeId) {
        return null;
      }

      const id = typeof mayBeId === 'string' ? mayBeId : mayBeId.id;

      try {
        return await client.prices.retrieve(id);
      } catch (err) {
        console.error(err);

        throw new StripeWebhookException((err as Error).message, id);
      }
    },

    create: async (product: Content.ProductDocument) => {
      try {
        return await client.products.create({
          name: product.data.name || '',
          description: product.data.description || '',
          ...(product.data.images[0]?.image?.url && {
            images: [product.data.images[0].image.url],
          }),
          default_price_data: {
            currency: product.data.priceData[0]?.currency || 'chf',
            unit_amount: product.data.priceData[0]?.unitAmount || 0,
          },
          metadata: {
            prismicId: product.id,
          },
          shippable: !!product.data.shipping,
        });
      } catch (err) {
        console.error(err);

        throw new StripeWebhookException((err as Error).message, product.id);
      }
    },

    update: async (
      product: Content.ProductDocument,
      stripeProduct: Stripe.Product,
    ) => {
      let updatedProduct: Stripe.Product;

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

        if (!updatedProduct.default_price && product.data.priceData[0]) {
          await client.prices.create({
            product: stripeProduct.id,
            currency: product.data.priceData[0]?.currency || 'chf',
            unit_amount: product.data.priceData[0]?.unitAmount || 0,
          });
        } else if (typeof updatedProduct.default_price === 'string') {
          await client.prices.update(updatedProduct.default_price, {
            currency_options: {
              [product.data.priceData[0]?.currency || 'chf']: {
                unit_amount: product.data.priceData[0]?.unitAmount || 0,
              },
            },
          });
        }
      } catch (err) {
        console.error(err);

        throw new StripeWebhookException((err as Error).message, product.id);
      }

      return updatedProduct;
    },

    delete: async (id: string) => {
      try {
        return await client.products.del(id);
      } catch (err) {
        console.error(err);

        throw new StripeWebhookException((err as Error).message, id);
      }
    },
  };
}
