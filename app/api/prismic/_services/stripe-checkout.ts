'use server';

import { createStripeClient } from './stripe-client';

export async function getCheckoutSession(sessionId: string) {
  const client = createStripeClient();

  return await client.checkout.sessions.retrieve(sessionId);
}
