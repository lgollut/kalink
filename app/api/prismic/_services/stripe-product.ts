import { type Content } from '@prismicio/client';
import Stripe from 'stripe';

import { StripeWebhookException } from '../_utils/exceptions';

export function createStripeProductClient(stripeKey?: string) {
  let client = new Stripe(stripeKey ?? (process.env.STRIPE_SECRET_KEY || ''));

  return {
    getByPrismicId: async (id: string) => {
      try {
        return await client.products.search({
          limit: 1,
          query: `metadata["prismicId"]:"${id}"`,
        });
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
          shippable: product.data.shippable,
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
          shippable: product.data.shippable,
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
