import { Description } from '@radix-ui/react-toast';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

import { Text } from '@/components/text';

const ToastDescription = (
  {
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<typeof Description>,
  ref: ForwardedRef<any>,
) => (
  <Description ref={ref} className={className} {...props} asChild>
    <Text color="currentColor" typography="bodySmall">
      {children}
    </Text>
  </Description>
);

const WrappedToastDescription = forwardRef(ToastDescription);
export { WrappedToastDescription as ToastDescription };
