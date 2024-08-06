import { ForwardedRef, forwardRef } from 'react';

import { Box } from '../box';
import { FixedForwardRef } from '@/types/utils.types';

import { ButtonInternal, iconProps } from './button-internal';
import { ButtonProps } from './button.types';

const fixedForwardRef = forwardRef as FixedForwardRef;

const Button = (
  { icon: IconComp, iconOnly, size, children, ...props }: ButtonProps<'button'>,
  ref: ForwardedRef<any>,
) => {
  return (
    <ButtonInternal
      ref={ref}
      iconOnly={iconOnly}
      size={size}
      aria-label={iconOnly ? String(children) : undefined}
      {...props}
    >
      <>
        {IconComp && (
          <Box flexShrink={0}>
            <IconComp {...iconProps(size)} />
          </Box>
        )}
        {!iconOnly && children}
      </>
    </ButtonInternal>
  );
};

const WrappedButton = fixedForwardRef(Button);

export { WrappedButton as Button };
