import { useIsClient } from '@uidotdev/usehooks';
import Link from 'next/link';
import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useEffect,
  useState,
} from 'react';

type NavbarButtonProps = {
  children: ReactNode;
  uid: string;
};

type InternalNavbarButtonProps = NavbarButtonProps;

const InternalNavbarButton = forwardRef(
  (
    { children, uid, ...props }: InternalNavbarButtonProps,
    ref: ForwardedRef<any>,
  ) => {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
      setIsTouchDevice(matchMedia('(hover: none), (pointer: coarse)').matches);
    }, [setIsTouchDevice]);

    return isTouchDevice ? (
      <button {...props}>{children}</button>
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
