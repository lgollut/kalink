'use client';

import { isFilled } from '@prismicio/client';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Fragment, useCallback, useMemo } from 'react';
import Stripe from 'stripe';

import { Divider } from '../divider';
import {
  CheckoutData,
  createCheckoutSession,
  ShippingRate,
} from '@/app/(pages)/shop/services/create-checkout-session';
import { Box } from '@/components/box';
import { Button } from '@/components/button';
import { Cluster } from '@/components/cluster';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/sheet';
import { Stack } from '@/components/stack';
import { Text } from '@/components/text';

import { useCartContext } from './cart-context';
import { CartProduct } from './cart-product';

export function CartPanel() {
  const { cart, isCartOpen, setIsCartOpen } = useCartContext();

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (acc, item) =>
          acc +
          ((item.data.product.default_price.unit_amount ?? 0) * item.quantity) /
            100,
        0,
      ),
    [cart],
  );

  const cartCurrency = useMemo(
    () => cart[0]?.data.product.default_price.currency,
    [cart],
  );

  const formAction = useCallback(async () => {
    const cartItems: CheckoutData['items'] = [];
    let shippingRate: ShippingRate = {
      amount: 0,
      currency: 'CHF',
      name: 'Gratuit',
    };

    for (const item of cart) {
      cartItems.push({
        price: item.data.product.default_price.id,
        quantity: item.quantity,
      });

      if (!isFilled.integrationField(item.data.shipping)) {
        continue;
      }

      const shipping = item.data.shipping as unknown as Stripe.ShippingRate;

      if (shippingRate.amount < (shipping.fixed_amount?.amount ?? 0)) {
        shippingRate = {
          amount: shipping.fixed_amount?.amount ?? 0,
          currency: shipping.fixed_amount?.currency ?? 'CHF',
          name: shipping.display_name ?? '',
        };
      }
    }

    await createCheckoutSession({ items: cartItems, shippingRate });
  }, [cart]);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        paddingInline="base"
        paddingBlock="md"
        size="lg"
        side="right"
      >
        <SheetHeader>
          <SheetTitle use="h3">{'Votre panier'}</SheetTitle>
          <VisuallyHidden>
            <SheetDescription>{'Produits dans le panier'}</SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
        {cart.map((cartProduct, index) => (
          <Fragment key={cartProduct.uid}>
            <CartProduct {...cartProduct} />
            {index < cart.length - 1 && <Divider />}
          </Fragment>
        ))}
        {cart.length > 0 ? (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
            borderBlockStart={1}
            paddingBlockStart="md"
          >
            <Text typography="labelLarge" color="onSurface">
              {'Total'}
            </Text>
            <Cluster gap="sm" alignItems="baseline">
              <Text typography="titleMedium" color="onSurface">
                {cartTotal}
              </Text>
              <Text
                typography="labelMedium"
                textTransform="uppercase"
                color="onSurface"
              >
                {cartCurrency}
              </Text>
            </Cluster>
          </Box>
        ) : (
          <Text color="onSurface">{'Votre panier est vide'}</Text>
        )}
        <Stack gap="sm">
          {cart.length > 0 && (
            <form action={formAction}>
              <Button
                variant="filled"
                tintScheme="primary"
                type="submit"
                width="full"
              >
                {'Finaliser la commande'}
              </Button>
            </form>
          )}
          <Button
            variant="outlined"
            tintScheme="surface"
            onClick={() => setIsCartOpen(false)}
          >
            {'Continuer vos achats'}
          </Button>
        </Stack>
      </SheetContent>
    </Sheet>
  );
}
