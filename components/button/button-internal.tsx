import { clsx } from 'clsx';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '@/components/box';
import { FixedForwardRef } from '@/types/utils.types';

import { button } from './button.css';
import { ButtonInternalProps, ButtonProps } from './button.types';

const fixedForwardRef = forwardRef as FixedForwardRef;

export const iconProps = (size: ButtonProps<'button'>['size']) => {
  const iconSize = size === 'md' ? 32 : 'sm' ? 18 : 20;
  const strokeWidth = size === 'md' ? 1 : 2;

  return { size: iconSize, strokeWidth };
};

const ButtonInternal = <TUse extends ElementType>(
  props: ButtonInternalProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  const {
    variant = 'filled',
    icon: IconComp,
    iconOnly = false,
    size = 'base',
    className,
    flow,
    position = 'relative',
    tintScheme = 'primary',
    borderRadius = 'small',
    use = 'button',
    ...rest
  } = props;

  return (
    <Box
      ref={ref}
      use={use as ButtonInternalProps<TUse>['use']}
      position={position}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      gap={size}
      paddingInline={variant === 'bare' ? 'none' : size}
      tintScheme={tintScheme}
      borderRadius={borderRadius}
      typography={size === 'sm' ? 'labelSmall' : 'labelMedium'}
      className={clsx(button({ variant, size, flow, iconOnly }), className)}
      {...rest}
    />
  );
};

const WrappedButtonInternal = fixedForwardRef(ButtonInternal);

export { WrappedButtonInternal as ButtonInternal };
