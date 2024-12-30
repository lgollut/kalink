import { Trigger } from '@radix-ui/react-navigation-menu';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

import { navigationMenuTrigger } from './navigation-menu-trigger.css';

type NavigationMenuTriggerProps = {
  hasSubmenu?: boolean;
} & ComponentPropsWithoutRef<typeof Trigger>;

const NavigationMenuTrigger = (
  { className, children, hasSubmenu, ...props }: NavigationMenuTriggerProps,
  ref: ForwardedRef<any>,
) => {
  return hasSubmenu ? (
    <Trigger
      ref={ref}
      className={clsx(navigationMenuTrigger, className)}
      asChild
      {...props}
    >
      {children}
    </Trigger>
  ) : (
    <Slot
      ref={ref}
      className={clsx(navigationMenuTrigger, className)}
      {...props}
    >
      {children}
    </Slot>
  );
};

const WrappedNavigationMenuTrigger = forwardRef(NavigationMenuTrigger);

export { WrappedNavigationMenuTrigger as NavigationMenuTrigger };
