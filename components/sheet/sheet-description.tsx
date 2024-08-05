import { Description } from '@radix-ui/react-dialog';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardedRef,
  forwardRef,
} from 'react';

import { Text } from '../text';

const SheetDescription = (
  { children, ...props }: ComponentPropsWithoutRef<typeof Description>,
  ref: ForwardedRef<ElementRef<typeof Description>>,
) => (
  <Description ref={ref} asChild {...props}>
    <Text typography="bodyMedium" color="onSurface">
      {children}
    </Text>
  </Description>
);

const WrappedSheetDescription = forwardRef(SheetDescription);
export { WrappedSheetDescription as SheetDescription };
