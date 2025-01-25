import { type Content, isFilled } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { getByIDs } from '@/app/_services/prismic';
import { Container } from '@/components/container';
import { ProductCard } from '@/components/product-card';
import { Stack } from '@/components/stack';

export type ProductListProps = SliceComponentProps<Content.ProductListSlice>;

export async function ProductList({ slice }: ProductListProps) {
  const items: Map<string, Content.ProductListSliceDefaultPrimaryItemsItem> =
    new Map();

  for (const item of slice.primary.items) {
    if (!isFilled.contentRelationship(item.product)) {
      continue;
    }
    items.set(item.product.id, item);
  }

  const products = await getByIDs<Content.ProductDocument>([...items.keys()]);

  return (
    <Container
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      size="2xl"
    >
      <Stack gap={{ xs: '5xl', md: '7xl', lg: '9xl' }}>
        {products.results.map((product, index) => {
          return (
            <ProductCard
              key={product.id}
              direction={index % 2 === 0 ? 'start' : 'end'}
              {...product}
            />
          );
        })}
      </Stack>
    </Container>
  );
}
