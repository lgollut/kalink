import { Indicator } from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

import {
  navigationMenuIndicator,
  navigationMenuIndicatorArrow,
} from './navigation-menu-indicator.css';

type NavigationMenuIndicatorProps = ComponentPropsWithoutRef<typeof Indicator>;

const NavigationMenuIndicator = (
  { className, ...props }: NavigationMenuIndicatorProps,
  ref: ForwardedRef<any>,
) => {
  return (
    <Indicator
      ref={ref}
      className={clsx(navigationMenuIndicator, className)}
      {...props}
    >
      <div className={navigationMenuIndicatorArrow} />
    </Indicator>
  );
};

const WrappedNavigationMenuIndicator = forwardRef(NavigationMenuIndicator);

export { WrappedNavigationMenuIndicator as NavigationMenuIndicator };
