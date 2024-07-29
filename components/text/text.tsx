import { clsx } from 'clsx';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '@/components/box';

import { text } from './text.css';
import { TextProps } from './text.types';

const Text = <TUse extends ElementType>(
  props: TextProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  const {
    use = 'span',
    typography = 'bodyLarge',
    className,
    ellipsis,
    ...rest
  } = props;

  return (
    <Box
      ref={ref}
      // See `frontend/components/box/box.types.ts` for why the cast is required
      use={use as TextProps<TUse>['use']}
      typography={typography}
      className={clsx(text({ ellipsis }), className)}
      {...rest}
    />
  );
};

export const WrappedText = forwardRef(Text);

export { WrappedText as Text };
