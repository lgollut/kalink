import { clsx } from 'clsx';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '@/components/box';

import { stack } from './stack.css';
import { StackProps } from './stack.types';

const Stack = <TUse extends ElementType = 'div'>(
  { gap = 'base', className, divided = 'none', ...props }: StackProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      gap={gap}
      divided={divided !== 'none' ? gap : undefined}
      className={clsx(stack({ divided }), className)}
      {...props}
    />
  );
};

/**
 * A custom element for injecting white space (margin) between flow
 * (block) elements along a vertical axis.
 *
 * https://every-layout.dev/layouts/stack
 */
const WrappedStack = forwardRef(Stack);

export { WrappedStack as Stack };
