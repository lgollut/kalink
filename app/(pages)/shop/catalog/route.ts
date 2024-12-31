import { headers } from 'next/headers';
import Stripe from 'stripe';

import { listProducts } from '../services/list-products';

type ParsedProduct = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  last_update: number;
  blob: Stripe.Product;
};

function parseProduct(product: Stripe.Product): ParsedProduct {
  return {
    id: product.id,
    title: product.name,
    description: product.description,
    image_url: product.images?.[0],
    last_update: product.updated,
    blob: product,
  };
}

export async function GET() {
  const products = await listProducts();

  const response = {
    results_size: products.length,
    results: products.map(parseProduct),
  };

  return Response.json(response);
}

export async function POST(request: Request) {
  if (!process.env.PRISMIC_IF_ENDPOINT) {
    return new Response('Missing prismic endpoint', { status: 500 });
  }

  const headersList = await headers();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

  const payload = await request.text();

  let event: Stripe.Event | null = null;

  if (process.env.STRIPE_WEBHOOK_SECRET) {
    const signature = headersList.get('stripe-signature') || '';

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.log(
        `⚠️  Webhook signature verification failed.`,
        (err as Error).message,
      );
    }
  }

  if (!event) {
    return new Response('Webhook signature verification failed.', {
      status: 500,
    });
  }

  let webhookData: (ParsedProduct | string)[] = [];

  switch (event.type) {
    case 'product.created':
    case 'product.updated': {
      webhookData.push(parseProduct(event.data.object as Stripe.Product));
      break;
    }
    case 'product.deleted':
      webhookData.push(event.data.object.id);
      break;
    default:
      return new Response('Unhandled event type', { status: 500 });
  }

  const updateIF = await fetch(process.env.PRISMIC_IF_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PRISMIC_IF_TOKEN}`,
    },
    body: JSON.stringify(webhookData),
  });

  if (!updateIF.ok) {
    return new Response('Webhook update failed', {
      status: 500,
    });
  }

  return new Response('Webhook received and processed!', {
    status: 200,
  });
}
