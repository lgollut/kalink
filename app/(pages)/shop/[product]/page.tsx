import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllByType, getByUID } from '@/app/_services/prismic';
import {
  getByPrismicId,
  getDefaultPriceById,
} from '@/app/api/prismic/_services/stripe-product';
import { Box } from '@/components/box';
import { Container } from '@/components/container';
import { Heading } from '@/components/heading';
import { Image } from '@/components/image';
import { Stack } from '@/components/stack';
import { Tag } from '@/components/tag';
import { Text } from '@/components/text';
import { getServerTranslation } from '@/i18n';
import { ProductDocument } from '@/prismicio-types';

import { AddToBag } from './_ui/add-to-bag';
import { ProductVariants } from './_ui/product-variants';
import {
  productPageHeader,
  productPageImage,
  productPagePrice,
  productSpecs,
  productSpecsItem,
} from './page.css';

type PageProps = Readonly<{ params: Promise<{ product: string }> }>;

export async function generateStaticParams() {
  const products = await getAllByType<ProductDocument>('product');

  return products.map((product) => ({
    product: product.uid,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  let page: ProductDocument;

  try {
    page = await getByUID('product', params.product);
  } catch (error) {
    console.log(error);
    notFound();
  }

  return {
    metadataBase: new URL('https://www.kalink.ch'),
    title: page.data.metaTitle,
    description: page.data.metaDescription,
    openGraph: {
      title: page.data.metaTitle ?? undefined,
      description: page.data.metaDescription ?? undefined,
      url: `https://www.kalink.ch/${params.product}`,
      siteName: 'KalinK Studio',
      type: 'website',
      ...(page.data.metaImage.url && {
        images: [
          {
            url: page.data.metaImage.url,
            width: page.data.metaImage.dimensions.width,
            height: page.data.metaImage.dimensions.height,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.metaTitle ?? undefined,
      description: page.data.metaDescription || undefined,
      images: page.data.metaImage.url ?? undefined,
      creator: '@LouisGollut',
    },
  };
}

export default async function Page(props: PageProps) {
  const { t } = await getServerTranslation('fr', 'product');
  const params = await props.params;
  let productPage: ProductDocument;

  try {
    productPage = await getByUID('product', params.product);
  } catch (error) {
    console.log(error);
    notFound();
  }

  const productByPrismicId = await getByPrismicId({ id: productPage.id });

  if (productByPrismicId.data.length === 0) {
    notFound();
  }

  const product = productByPrismicId.data[0];

  const price = await getDefaultPriceById({ mayBeId: product.default_price });

  if (!price) {
    notFound();
  }

  const allowedKeys = ['measure', 'medium'] as const;
  type MetadataKey = (typeof allowedKeys)[number];

  const displayedMetadata = productPage.data.metadata.filter((metadata) => {
    if (!metadata.key) {
      return false;
    }

    return allowedKeys.includes(metadata.key as MetadataKey);
  });

  return (
    <Container size="2xl">
      <Stack gap="xl">
        <div className={productPageHeader}>
          {productPage.data.type && (
            <Tag
              position="absolute"
              insetInlineStart="md"
              insetBlockStart="md"
              display={{ xs: 'block', md: 'none' }}
              tintScheme="primary"
              alignSelf="flex-start"
            >
              {t(`type.${productPage.data.type}`)}
            </Tag>
          )}
          <Image
            className={productPageImage}
            field={productPage.data.images[0]?.image}
          />
          <Box flexGrow={1}>
            <Stack gap="3xl">
              <Tag
                display={{ xs: 'none', md: 'block' }}
                tintScheme="primary"
                alignSelf="flex-start"
              >
                {t(`type.${productPage.data.type}`)}
              </Tag>
              <Stack gap="xs">
                <Heading>{productPage.data.name}</Heading>
                <Text>{productPage.data.description}</Text>
              </Stack>
              <Heading use="h3" className={productPagePrice}>
                {`${(price.unit_amount || 0) / 100} ${price.currency}`}
              </Heading>
              {displayedMetadata.length > 0 && (
                <dl className={productSpecs}>
                  {displayedMetadata.map(({ key, value }) => (
                    <div key={key} className={productSpecsItem}>
                      <dt>
                        <Text typography="labelMedium">
                          {t(`metadata.${key}`)}
                        </Text>
                      </dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <AddToBag id={productPage.uid} />
            </Stack>
          </Box>
        </div>
        <ProductVariants product={productPage} />
      </Stack>
    </Container>
  );
}
