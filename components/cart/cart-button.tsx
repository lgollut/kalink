'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../button';
import { ButtonProps } from '../button/button.types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../sheet';

import { useCartContext } from './cart-context';

export function CartButton({
  variant = 'filled',
  tintScheme = 'primary',
  icon = ShoppingBag,
  iconOnly = true,
  ...props
}: ButtonProps<'button'>) {
  const { cart } = useCartContext();

  const [isOpen, setIsOpen] = useState(false);

  return (
    cart.length > 0 && (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant={variant}
            tintScheme={tintScheme}
            icon={icon}
            iconOnly={iconOnly}
            {...props}
          >
            {'Shopping Bag'}
          </Button>
        </SheetTrigger>
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
          {cart.map(({ id, quantity }) => (
            <div key={id}>
              <h3>{id}</h3>
              <p>{quantity}</p>
            </div>
          ))}
        </SheetContent>
      </Sheet>
    )
  );
}
