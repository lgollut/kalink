import Stripe from 'stripe';

import { isObject } from './is-object';

export function ensureStripeProduct(
  mayBeProduct: unknown,
): asserts mayBeProduct is Stripe.Product {
  if (
    !isObject<Stripe.Product>(mayBeProduct) ||
    !mayBeProduct.id ||
    !mayBeProduct.default_price
  ) {
    throw new Error('mayBeProduct is not a Stripe product');
  }
}
