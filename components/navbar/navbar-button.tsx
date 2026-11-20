import { useIsClient, useMediaQuery } from '@uidotdev/usehooks';
import Link from 'next/link';
import { ForwardedRef, forwardRef, ReactNode } from 'react';

type NavbarButtonProps = {
  children: ReactNode;
  uid: string;
  hasSubmenu?: boolean;
};

type InternalNavbarButtonProps = NavbarButtonProps;

const InternalNavbarButton = forwardRef(
  (
    { children, uid, hasSubmenu, ...props }: InternalNavbarButtonProps,
    ref: ForwardedRef<any>,
  ) => {
    const isTouchDevice = useMediaQuery('(hover: none), (pointer: coarse)');

    return isTouchDevice && hasSubmenu ? (
      <button ref={ref} {...props}>
        {children}
      </button>
    ) : (
      <Link ref={ref} href={`/${uid !== 'homepage' ? uid : ''}`} {...props}>
        {children}
      </Link>
    );
  },
);

const NavbarButton = (props: NavbarButtonProps, ref: ForwardedRef<any>) => {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return <InternalNavbarButton {...props} ref={ref} />;
};

const WrappedNavbarButton = forwardRef(NavbarButton);

export { WrappedNavbarButton as NavbarButton };
