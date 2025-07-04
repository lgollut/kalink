import Stripe from 'stripe';

function parseShippingRate(shippingRate: Stripe.ShippingRate) {
  const amount = new Intl.NumberFormat('fr-CH', {
    style: 'currency',
    currency: shippingRate.fixed_amount?.currency ?? 'CHF',
  }).format((shippingRate.fixed_amount?.amount ?? 0) / 100);

  return {
    id: shippingRate.id,
    title: shippingRate.display_name,
    description: amount,
    blob: shippingRate,
  };
}

export async function GET() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

  const shippingRates = await stripe.shippingRates.list();

  const response = {
    results_size: shippingRates.data.length,
    results: shippingRates.data.map(parseShippingRate),
  };

  return Response.json(response);
}
