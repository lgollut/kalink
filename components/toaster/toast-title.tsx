import { Title } from '@radix-ui/react-toast';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

import { Text } from '@/components/text';

const ToastTitle = (
  { className, children, ...props }: ComponentPropsWithoutRef<typeof Title>,
  ref: ForwardedRef<any>,
) => (
  <Title ref={ref} className={className} {...props} asChild>
    <Text color="currentColor" typography="labelLarge">
      {children}
    </Text>
  </Title>
);

const WrappedToastTitle = forwardRef(ToastTitle);
export { WrappedToastTitle as ToastTitle };
