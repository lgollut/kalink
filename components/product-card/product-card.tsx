import { type Content } from '@prismicio/client';
import Link from 'next/link';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '../box';
import { BoxProps } from '../box/box.types';
import { Cluster } from '../cluster';
import { Heading } from '../heading';
import { Image } from '../image';
import { Stack } from '../stack';
import { Tag } from '../tag';
import { Text } from '../text';
import { ProductWithExpandedPrice } from '@/app/(pages)/shop/services/list-products';
import { getByPrismicId } from '@/app/api/prismic/_services/stripe-product';
import { getServerTranslation } from '@/i18n';

import {
  productCard,
  productCardContent,
  productCardContentInner,
  productCardCurrency,
  productCardImage,
  productCardPrice,
} from './product-card.css';

type ProductCardProps<TUse extends ElementType> = BoxProps<TUse> &
  Content.ProductDocument & {
    direction?: 'start' | 'end';
  };

async function ProductCard<TUse extends ElementType = 'div'>(
  {
    id,
    uid,
    data,
    direction,
    backgroundColor = 'primary',
  }: ProductCardProps<TUse>,
  ref: ForwardedRef<any>,
) {
  const { t } = await getServerTranslation('fr', 'product');

  const stripeProduct = await getByPrismicId({
    id,
    options: {
      expand: ['data.default_price'],
    },
  });

  const product = stripeProduct.data[0] as ProductWithExpandedPrice;

  return (
    <Link
      ref={ref}
      href={`/shop/${uid}`}
      className={productCard({ direction })}
    >
      <Image
        field={data.images[0]?.image}
        className={productCardImage}
        fill={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 392px, 464px"
      />
      <Box backgroundColor={backgroundColor} className={productCardContent}>
        <Stack gap="xl">
          <Cluster gap="md" justifyContent="space-between">
            {data.type && (
              <Tag alignSelf="flex-start">{t(`type.${data.type}`)}</Tag>
            )}
            {product && (
              <Cluster
                className={productCardPrice}
                gap="sm"
                alignItems="baseline"
              >
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
            )}
          </Cluster>
          <Stack color="onPrimary" gap="xs" className={productCardContentInner}>
            <Heading use="h3" color="onPrimary">
              {data.name}
            </Heading>
            <Text>{data.description}</Text>
          </Stack>
        </Stack>
      </Box>
    </Link>
  );
}

const WrappedProductCard = forwardRef(ProductCard);

export { WrappedProductCard as ProductCard };
