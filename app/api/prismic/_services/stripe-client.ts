import Stripe from 'stripe';

type CreateStripeClientOptions = {
  testMode: boolean;
  stripeKey?: string;
};

const defaultOptions: CreateStripeClientOptions = {
  testMode: false,
};

export function createStripeClient({
  testMode,
  stripeKey,
}: CreateStripeClientOptions = defaultOptions) {
  const key =
    stripeKey ??
    (testMode
      ? process.env.STRIPE_SECRET_TEST_KEY
      : process.env.STRIPE_SECRET_KEY);

  return new Stripe(key || '');
}
