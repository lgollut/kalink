import Stripe from 'stripe';

// Prismic Integration Fields stores the raw Stripe objects in its blob field.
export const prismicReadOptions = {
  apiVersion: '2024-11-20.acacia',
} satisfies Stripe.RequestOptions;

export function createStripeClient() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || '');
}
