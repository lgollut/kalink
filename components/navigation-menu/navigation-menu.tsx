import { Root } from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

import { Box } from '../box';
import { BoxProps } from '../box/box.types';

import { NavigationMenuViewport } from './navigation-menu-viewport';
import { navigationMenu } from './navigation-menu.css';

type NavigationMenuProps = BoxProps<'nav', 'use'> &
  ComponentPropsWithoutRef<typeof Root>;

const NavigationMenu = (
  { className, children, ...props }: NavigationMenuProps,
  ref: ForwardedRef<any>,
) => {
  return (
    <Root
      ref={ref}
      className={clsx(navigationMenu, className)}
      asChild
      {...props}
    >
      <Box use="nav">
        {children}
        <NavigationMenuViewport />
      </Box>
    </Root>
  );
};

const WrappedNavigationMenu = forwardRef(NavigationMenu);

export { WrappedNavigationMenu as NavigationMenu };
