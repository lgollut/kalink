'use client';

import { ShoppingBag } from 'lucide-react';

import { Button } from '@/components/button';
import { ButtonProps } from '@/components/button/button.types';

import { useCartContext } from './cart-context';

export function CartButton({
  variant = 'filled',
  tintScheme = 'primary',
  icon = ShoppingBag,
  iconOnly = true,
  ...props
}: ButtonProps<'button'>) {
  const { cart, setIsCartOpen } = useCartContext();

  return (
    cart.length > 0 && (
      <Button
        variant={variant}
        tintScheme={tintScheme}
        icon={icon}
        iconOnly={iconOnly}
        onClick={() => setIsCartOpen(true)}
        {...props}
      >
        {'Shopping Bag'}
      </Button>
    )
  );
}
