import Stripe from 'stripe';

export function createStripeClient(stripeKey?: string) {
  return new Stripe(stripeKey ?? (process.env.STRIPE_SECRET_KEY || ''));
}
