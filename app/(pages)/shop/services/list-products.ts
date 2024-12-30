import Stripe from 'stripe';

export type ProductWithExpandedPrice = Omit<Stripe.Product, 'default_price'> & {
  default_price: Stripe.Price;
};

export function normalizeProducts(products: ProductWithExpandedPrice[]) {
  const normalizedProducts = new Map<string, ProductWithExpandedPrice[]>();

  for (const product of products) {
    normalizedProducts.set(product.name, [
      ...(normalizedProducts.get(product.name) || []),
      product,
    ]);
  }

  for (const productName of normalizedProducts.keys()) {
    normalizedProducts.set(
      productName,
      (normalizedProducts.get(productName) || []).toSorted(sortProductsByPrice),
    );
  }

  return normalizedProducts;
}

export function sortProductsByPrice(
  a: ProductWithExpandedPrice,
  b: ProductWithExpandedPrice,
) {
  const aPrice = a.default_price.unit_amount ?? 0;
  const bPrice = b.default_price.unit_amount ?? 0;

  if (aPrice > bPrice) {
    return 1;
  }

  if (aPrice < bPrice) {
    return -1;
  }

  return 0;
}

export async function listProducts() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

  const { data } = (await stripe.products.list({
    expand: ['data.default_price'],
  })) as Awaited<Stripe.ApiListPromise<ProductWithExpandedPrice>>;

  return data;
}
