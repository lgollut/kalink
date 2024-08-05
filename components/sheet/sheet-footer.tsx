import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '@/components/box';
import { BoxProps } from '@/components/box/box.types';

const SheetFooter = <TUse extends ElementType>(
  props: BoxProps<TUse>,
  ref: ForwardedRef<any>,
) => (
  <Box
    ref={ref}
    display="flex"
    flexDirection={{ sm: 'column-reverse', md: 'row' }}
    justifyContent={{ sm: 'flex-start', md: 'flex-end' }}
    gap="sm"
    {...props}
  />
);

const WrappedSheetFooter = forwardRef(SheetFooter);
export { WrappedSheetFooter as SheetFooter };
