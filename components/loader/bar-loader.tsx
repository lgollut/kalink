import { clsx } from 'clsx';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '@/components/box';

import { barOne, barTwo, bars, loaderWrapper } from './bar-loader.css';
import { loader } from './loader.css';
import { LoaderProps } from './loader.types';

/**
 * Heavily inspired by https://github.com/davidhu2000/react-spinners/blob/main/src/BarLoader.tsx
 */
const BarLoader = <TUse extends ElementType>(
  { active, forceMount = false, className, ...props }: LoaderProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  if (!active && !forceMount) {
    return null;
  }

  return (
    <Box
      ref={ref}
      className={clsx(loaderWrapper, loader({ active }), className)}
      {...props}
    >
      <span className={clsx(bars({ active }), barOne)} />
      <span className={clsx(bars({ active }), barTwo)} />
    </Box>
  );
};

const WrappedBarLoader = forwardRef(BarLoader);

export { WrappedBarLoader as BarLoader };
