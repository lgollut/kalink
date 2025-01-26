'use client';

import { isFilled } from '@prismicio/client';
import { Minus, Plus, Trash } from 'lucide-react';

import { Divider } from '../divider';
import { Box } from '@/components/box';
import { Button } from '@/components/button';
import { Cluster } from '@/components/cluster';
import { Heading } from '@/components/heading';
import { Image } from '@/components/image';
import { Stack } from '@/components/stack';
import { Text } from '@/components/text';

import { CartItem } from './cart';
import { useCartContext } from './cart-context';

export function CartProduct({
  uid,
  data,
  quantity,
}: CartItem & { quantity: number }) {
  const { removeFromCart, updateCart } = useCartContext();

  return (
    <Stack gap="base">
      <Box display="flex" gap="md" alignItems="flex-start">
        {isFilled.group(data.images) && data.images[0] && (
          <Image field={data.images[0].image} width={96} height={96} />
        )}
        <Stack gap="sm" flexGrow={1}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
            flexGrow={1}
          >
            <Stack gap="xs">
              <Heading use="h4">{data.name}</Heading>
              <Text>{data.description}</Text>
            </Stack>
            <Button
              icon={Trash}
              variant="ghost"
              tintScheme="surfaceContainer"
              flexShrink={0}
              iconOnly
              onClick={() => removeFromCart(uid)}
            >
              {'Retirer du panier'}
            </Button>
          </Box>
        </Stack>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Stack gap="lg">
          <Divider />
          <Cluster gap="md" alignItems="center">
            <Cluster gap="sm" alignItems="center">
              <Button
                icon={Minus}
                variant="ghost"
                tintScheme="surface"
                iconOnly
                size="sm"
                onClick={() => updateCart(uid, quantity - 1)}
              >
                {'Retirer 1 article'}
              </Button>
              <Text typography="bodyMedium">{`${quantity} x`}</Text>
              <Button
                icon={Plus}
                variant="ghost"
                tintScheme="surface"
                iconOnly
                size="sm"
                onClick={() => updateCart(uid, quantity + 1)}
              >
                {'Ajouter 1 article'}
              </Button>
            </Cluster>

            <Cluster gap="sm" alignItems="baseline">
              <Text typography="labelLarge">
                {(data.unitAmount ? data.unitAmount / 100 : 0) * quantity}
              </Text>
              <Text typography="labelMedium" color="onPrimary">
                {data.currency}
              </Text>
            </Cluster>
          </Cluster>
        </Stack>
      </Box>
    </Stack>
  );
}
