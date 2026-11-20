import Stripe from 'stripe';

// Prismic Integration Fields stores the raw Stripe objects in its blob field.
export const prismicReadOptions = {
  apiVersion: '2024-11-20.acacia',
} satisfies Stripe.RequestOptions;

export function createStripeClient() {
  const fixturePort = process.env.KALINK_BUILD_FIXTURE_PORT;
  if (fixturePort) {
    return new Stripe('sk_test_fixture', {
      host: '127.0.0.1',
      port: Number(fixturePort),
      protocol: 'http',
    });
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY || '');
}
