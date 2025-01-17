import { filter, isFilled, Query, type Content } from '@prismicio/client';
import Link from 'next/link';

import { Box } from '@/components/box';
import { Cluster } from '@/components/cluster';
import { Divider } from '@/components/divider';
import { Heading } from '@/components/heading';
import { Image } from '@/components/image';
import { Stack } from '@/components/stack';
import { getServerTranslation } from '@/i18n';
import { createClient } from '@/prismicio';

type ProductVariantsProps = { product: Content.ProductDocument };
type Metadata = Content.ProductDocument['data']['metadata'];

/**
 * Converts a Metadata array to a Map for easier access.
 * @param metadata - The metadata array.
 * @returns A Map with keys and values from the metadata.
 */
function metadataArrayToMap(metadata: Metadata): Map<string, string> {
  const map = new Map<string, string>();

  for (const item of metadata) {
    if (!item.key || !item.value) {
      continue;
    }

    map.set(item.key, item.value);
  }

  return map;
}

/**
 * Groups variants based on which metadata keys they differ from the primary product.
 * @param primaryProduct - The primary product with metadata.
 * @param variants - An array of variant products with metadata.
 * @returns A Map where each key is a metadata key and the value is an array of variants that differ in that key.
 */
function groupVariantsByMetadataKeyDifference(
  primaryProduct: Content.ProductDocument,
  variants: Content.ProductDocument[],
): Map<string, Content.ProductDocument[]> {
  const groups: Map<string, Content.ProductDocument[]> = new Map();

  // Convert primary metadata to Map once
  const primaryMap = metadataArrayToMap(primaryProduct.data.metadata);

  for (const variant of variants) {
    // Convert variant metadata to Map
    const variantMap = metadataArrayToMap(variant.data.metadata);

    // Create a Set of all keys present in either primary or variant
    const allKeys = new Set<string>([
      ...primaryMap.keys(),
      ...variantMap.keys(),
    ]);

    for (const key of allKeys) {
      const primaryValue = primaryMap.get(key);
      const variantValue = variantMap.get(key);

      // Determine if there's a difference
      const isDifferent = primaryValue !== variantValue;

      if (isDifferent) {
        // Initialize the group if it doesn't exist
        if (!groups.has(key)) {
          groups.set(key, []);
        }

        // Add the variant to the appropriate group
        groups.get(key)!.push(variant);
      }
    }
  }

  return groups;
}

export async function ProductVariants({ product }: ProductVariantsProps) {
  const { t } = await getServerTranslation('fr', 'product');

  if (!isFilled.group(product.data.variants)) {
    return null;
  }

  let productIds: string[] = [];

  for (const variant of product.data.variants) {
    if (!isFilled.contentRelationship(variant.product)) {
      continue;
    }

    productIds.push(variant.product.id);
  }

  const variants = (await createClient().getByIDs(productIds, {
    filters: [filter.at('document.type', 'product')],
  })) as Awaited<Query<Content.ProductDocument>>;

  const groupedVariants = groupVariantsByMetadataKeyDifference(
    product,
    variants.results,
  );

  return (
    <>
      <Divider />
      <Stack gap="xl">
        {Array.from(groupedVariants.entries()).map(([key, products]) => (
          <Stack key={key} gap="base">
            <Heading use="h6">{t(`variants.${key}`)}</Heading>
            <Cluster>
              {products.map(({ id, uid, data }) => {
                return (
                  <Box
                    use={Link}
                    href={`/shop/${uid}`}
                    key={id}
                    padding="xs"
                    display="flex"
                    flexDirection="column"
                    gap="sm"
                    border={1}
                  >
                    {isFilled.group(data.images) && data.images[0] && (
                      <Image
                        field={data.images[0].image}
                        width={96}
                        height={96}
                      />
                    )}
                    {
                      data.metadata.find((item) => item.key === 'measure')
                        ?.value
                    }
                  </Box>
                );
              })}
            </Cluster>
          </Stack>
        ))}
      </Stack>
    </>
  );
}
