import { Link as NavigationMenuLinkPrimitive } from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

type NavigationMenuLinkProps = ComponentPropsWithoutRef<typeof Link>;

const NavigationMenuLink = (
  props: NavigationMenuLinkProps,
  ref: ForwardedRef<any>,
) => {
  return (
    <NavigationMenuLinkPrimitive asChild>
      <Link {...props} ref={ref} />
    </NavigationMenuLinkPrimitive>
  );
};

const WrappedNavigationMenuLink = forwardRef(NavigationMenuLink);

export { WrappedNavigationMenuLink as NavigationMenuLink };
