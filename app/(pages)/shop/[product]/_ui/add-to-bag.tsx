'use client';

import { Button } from '@/components/button';
import { useCartContext } from '@/components/cart/cart-context';

export function AddToBag({ id }: { id: string }) {
  const { addToCart } = useCartContext();

  return (
    <Button
      onClick={() => {
        addToCart(id);
      }}
    >
      {'Ajouter au panier'}
    </Button>
  );
}
