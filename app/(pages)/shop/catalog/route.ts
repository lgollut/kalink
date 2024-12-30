import { listProducts } from '../services/list-products';

export async function GET() {
  const products = await listProducts();

  const response = {
    results_size: products.length,
    results: products.map((product) => ({
      id: product.id,
      title: product.name,
      description: product.description,
      image_url: product.images?.[0],
      last_update: product.updated,
      blob: product,
    })),
  };

  return Response.json(response);
}
