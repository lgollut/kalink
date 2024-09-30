import { Content } from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

import { navigationMenuContent } from './navigation-menu-content.css';

type NavigationMenuContentProps = ComponentPropsWithoutRef<typeof Content>;

const NavigationMenuContent = (
  { className, children, ...props }: NavigationMenuContentProps,
  ref: ForwardedRef<any>,
) => {
  return (
    <Content
      ref={ref}
      className={clsx(navigationMenuContent, className)}
      {...props}
    >
      {children}
    </Content>
  );
};

const WrappedNavigationMenuContent = forwardRef(NavigationMenuContent);

export { WrappedNavigationMenuContent as NavigationMenuContent };
