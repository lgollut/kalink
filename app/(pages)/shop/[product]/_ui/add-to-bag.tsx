'use client';

import { Button } from '@/components/button';
import { useCartContext } from '@/components/cart/cart-context';

export function AddToBag({ id }: { id: string }) {
  const { addToCart, setIsCartOpen } = useCartContext();

  return (
    <Button
      onClick={() => {
        addToCart(id);
        setIsCartOpen(true);
      }}
    >
      {'Ajouter au panier'}
    </Button>
  );
}
