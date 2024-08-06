import Link from 'next/link';
import { ForwardedRef, forwardRef } from 'react';

import { FixedForwardRef } from '@/types/utils.types';

import { ButtonInternal, iconProps } from './button-internal';
import { ButtonLinkProps } from './button.types';

const fixedForwardRef = forwardRef as FixedForwardRef;

const ButtonLink = (
  {
    icon: IconComp,
    iconOnly,
    size,
    children,
    ...props
  }: ButtonLinkProps<typeof Link>,
  ref: ForwardedRef<any>,
) => {
  return (
    <ButtonInternal
      ref={ref}
      use={Link}
      iconOnly={iconOnly}
      size={size}
      aria-label={iconOnly ? String(children) : undefined}
      {...props}
    >
      <>
        {IconComp && <IconComp {...iconProps(size)} />}
        {!iconOnly && children}
      </>
    </ButtonInternal>
  );
};

const WrappedButtonLink = fixedForwardRef(ButtonLink);

export { WrappedButtonLink as ButtonLink };
