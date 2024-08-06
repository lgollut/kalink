import { X } from 'lucide-react';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '../box';
import { Button } from '../button';
import { StackProps } from '../stack/stack.types';
import { Stack } from '@/components/stack';

import { SheetClose } from './sheet';

const SheetHeader = <TUse extends ElementType>(
  { gap = 'base', children, ...props }: StackProps<TUse>,
  ref: ForwardedRef<any>,
) => (
  <Box
    ref={ref}
    display="flex"
    alignItems="flex-start"
    justifyContent="space-between"
  >
    <Stack gap={gap} {...props}>
      {children}
    </Stack>
    <SheetClose asChild>
      <Button icon={X} variant="ghost" flexShrink={0} iconOnly>
        Close
      </Button>
    </SheetClose>
  </Box>
);

const WrappedSheetHeader = forwardRef(SheetHeader);
export { WrappedSheetHeader as SheetHeader };
