import { List } from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  forwardRef,
} from 'react';

import { Box } from '../box';
import { BoxProps } from '../box/box.types';

import { navigationMenuList } from './navigation-menu-list.css';

type NavigationMenuListProps<TUse extends ElementType> = BoxProps<TUse> &
  ComponentPropsWithoutRef<typeof List>;

const NavigationMenuList = <TUse extends ElementType = 'div'>(
  props: NavigationMenuListProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  const { use = 'ul', className, children, ...rest } = props;

  return (
    <List
      ref={ref}
      className={clsx(navigationMenuList, className)}
      asChild
      {...rest}
    >
      <Box use={use as NavigationMenuListProps<TUse>['use']}>{children}</Box>
    </List>
  );
};

const WrappedNavigationMenuList = forwardRef(NavigationMenuList);

export { WrappedNavigationMenuList as NavigationMenuList };
