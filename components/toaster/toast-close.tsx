import { Close } from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

import { Button } from '@/components/button';
import { UnconditionalProperties } from '@/styles/sprinkles.css';

type ToastCloseProps = {
  tintScheme?: UnconditionalProperties['tintScheme'];
} & ComponentPropsWithoutRef<typeof Close>;

const ToastClose = (
  { className, tintScheme, ...props }: ToastCloseProps,
  ref: ForwardedRef<any>,
) => (
  <Close ref={ref} toast-close="" asChild {...props}>
    <Button
      variant="ghost"
      tintScheme={tintScheme}
      icon={X}
      size="sm"
      position="absolute"
      insetBlockStart="none"
      insetInlineEnd="none"
      iconOnly
    >
      {'Close notification'}
    </Button>
  </Close>
);

const WrappedToastClose = forwardRef(ToastClose);
export { WrappedToastClose as ToastClose };
