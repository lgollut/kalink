import { Trigger } from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

import { navigationMenuTrigger } from './navigation-menu-trigger.css';

type NavigationMenuTriggerProps = ComponentPropsWithoutRef<typeof Trigger>;

const NavigationMenuTrigger = (
  { className, children, ...props }: NavigationMenuTriggerProps,
  ref: ForwardedRef<any>,
) => {
  return (
    <Trigger
      ref={ref}
      className={clsx(navigationMenuTrigger, className)}
      asChild
      {...props}
    >
      {children}
    </Trigger>
  );
};

const WrappedNavigationMenuTrigger = forwardRef(NavigationMenuTrigger);

export { WrappedNavigationMenuTrigger as NavigationMenuTrigger };
