import { X } from 'lucide-react';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '../box';
import { Button } from '../button';
import { StackProps } from '../stack/stack.types';
import { Stack } from '@/components/stack';
import { FlexDirectionValues } from '@/styles/sprinkles.css';

import { SheetClose } from './sheet';

type SheetHeaderProps<TUse extends ElementType> = StackProps<TUse> & {
  direction?: FlexDirectionValues;
};

const SheetHeader = <TUse extends ElementType>(
  {
    gap = 'base',
    children,
    direction = 'row',
    ...props
  }: SheetHeaderProps<TUse>,
  ref: ForwardedRef<any>,
) => (
  <Box
    ref={ref}
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    flexDirection={direction}
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
