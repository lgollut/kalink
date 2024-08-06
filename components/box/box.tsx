import { clsx } from 'clsx';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { sprinkles } from '@/styles/sprinkles.css';
import { FixedForwardRef } from '@/types/utils.types';
import { extractSprinklesProps } from '@/utils/extract-sprinkles-props';

import { BoxProps } from './box.types';

const fixedForwardRef = forwardRef as FixedForwardRef;

const Box = <TUse extends ElementType = 'div'>(
  props: BoxProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  const [
    {
      display = 'block',
      position = 'relative',
      tintScheme = 'none',
      backgroundColor = 'tint',
      color = 'tint',
      ...sprinklesProps
    },
    { use: Comp = 'div', className, ...rest },
  ] = extractSprinklesProps(props);

  return (
    <Comp
      ref={ref}
      className={clsx(
        sprinkles({
          display,
          position,
          tintScheme,
          backgroundColor,
          color,
          ...sprinklesProps,
        }),
        className,
      )}
      {...rest}
    />
  );
};

/**
 * A custom element for generic boxes/containers
 *
 * https://every-layout.dev/layouts/box
 */
const WrappedBox = fixedForwardRef(Box);

export { WrappedBox as Box };
