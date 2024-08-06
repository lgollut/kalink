import { clsx } from 'clsx';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '@/components/box';

import { loader } from './loader.css';
import { LoaderProps, MoonLoaderVariants } from './loader.types';
import { ellipse, moon, loaderWrapper } from './moon-loader.css';

/**
 * Heavily inspired by https://github.com/davidhu2000/react-spinners/blob/main/src/MoonLoader.tsx
 */
const MoonLoader = <TUse extends ElementType>(
  {
    active,
    size = 'lg',
    forceMount = false,
    className,
    ...props
  }: LoaderProps<TUse> & MoonLoaderVariants,
  ref: ForwardedRef<any>,
) => {
  if (!active && !forceMount) {
    return null;
  }

  return (
    <Box
      ref={ref}
      position="relative"
      className={clsx(loaderWrapper({ size }), loader({ active }), className)}
      {...props}
    >
      <span className={ellipse} />
      <span className={moon} />
    </Box>
  );
};

const WrappedMoonLoader = forwardRef(MoonLoader);

export { WrappedMoonLoader as MoonLoader };
