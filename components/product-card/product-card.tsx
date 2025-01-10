import { type Content, isFilled } from '@prismicio/client';
import Link from 'next/link';
import { ElementType, ForwardedRef, forwardRef } from 'react';
import Stripe from 'stripe';

import { Box } from '../box';
import { BoxProps } from '../box/box.types';
import { Cluster } from '../cluster';
import { Heading } from '../heading';
import { Image } from '../image';
import { RichText } from '../rich-text';
import { Stack } from '../stack';
import { Tag } from '../tag';
import { Text } from '../text';
import { getProductById } from '@/app/(pages)/shop/services/get-product';

import {
  productCard,
  productCardContent,
  productCardContentInner,
  productCardCurrency,
  productCardImage,
} from './product-card.css';

type ProductCardProps<TUse extends ElementType> = BoxProps<TUse> &
  Content.ProductDocument & {
    direction?: 'start' | 'end';
  };

async function ProductCard<TUse extends ElementType = 'div'>(
  { uid, data, direction, backgroundColor = 'primary' }: ProductCardProps<TUse>,
  ref: ForwardedRef<any>,
) {
  if (!isFilled.integrationField(data.product)) {
    return null;
  }

  const product = await getProductById(
    (data.product as unknown as Stripe.Product).id,
  );

  if (!product) {
    return null;
  }

  const imageProps = {
    ...(isFilled.group(data.images) && data.images[0]
      ? { field: data.images[0].image }
      : { src: product.images[0] }),
    className: productCardImage,
    alt: data.name as '',
    fill: true,
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 392px, 464px',
  };

  return (
    <Link
      ref={ref}
      href={`/shop/${uid}`}
      className={productCard({ direction })}
    >
      <Image {...imageProps} />
      <Box backgroundColor={backgroundColor} className={productCardContent}>
        <Stack gap="xl">
          <Cluster gap="md" justifyContent="space-between">
            <Tag alignSelf="flex-start">{product.metadata.type}</Tag>
            <Cluster gap="sm" alignItems="baseline">
              <Text typography="titleSmall" color="onPrimary">
                {(product.default_price.unit_amount || 0) / 100}
              </Text>
              <Text
                typography="titleSmall"
                color="onPrimary"
                className={productCardCurrency}
              >
                {product.default_price.currency}
              </Text>
            </Cluster>
          </Cluster>
          <Stack color="onPrimary" gap="xs" className={productCardContentInner}>
            <Heading use="h3" color="onPrimary">
              {data.name}
            </Heading>
            <RichText field={data.description} />
          </Stack>
        </Stack>
      </Box>
    </Link>
  );
}

const WrappedProductCard = forwardRef(ProductCard);

export { WrappedProductCard as ProductCard };
