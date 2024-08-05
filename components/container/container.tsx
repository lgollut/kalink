import { clsx } from 'clsx';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '../box';

import { container } from './container.css';
import { ContainerProps } from './container.types';

const Container = <TUse extends ElementType = 'div'>(
  {
    children,
    className,
    size,
    paddingInline = { xs: 'base', md: 'md', lg: 'lg', xl: '5xl' },
    ...rest
  }: ContainerProps<TUse>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  return (
    <Box
      ref={ref}
      className={clsx(container({ size }), className)}
      paddingInline={paddingInline}
      width="full"
      marginInline="auto"
      {...rest}
    >
      {children}
    </Box>
  );
};

const WrappedContainer = forwardRef(Container);

export { WrappedContainer as Container };
