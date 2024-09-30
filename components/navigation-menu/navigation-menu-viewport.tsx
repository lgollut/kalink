import { Viewport } from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

import {
  navigationMenuViewport,
  navigationMenuViewportContainer,
} from './navigation-menu-viewport.css';

type NavigationMenuViewportProps = ComponentPropsWithoutRef<typeof Viewport>;

const NavigationMenuViewport = (
  { className, ...props }: NavigationMenuViewportProps,
  ref: ForwardedRef<any>,
) => {
  return (
    <div className={navigationMenuViewportContainer}>
      <Viewport
        className={clsx(navigationMenuViewport, className)}
        ref={ref}
        {...props}
      />
    </div>
  );
};

const WrappedNavigationMenuViewport = forwardRef(NavigationMenuViewport);

export { WrappedNavigationMenuViewport as NavigationMenuViewport };
