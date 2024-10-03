'use client';

import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Box } from '../box';
import { Container } from '../container';
import { Stack } from '../stack';
import { Text } from '../text';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/navigation-menu';
import kalink from '@/public/kalink.svg';

import { NavbarButton } from './navbar-button';
import {
  navbar,
  navbarLink,
  navbarLogo,
  navbarMenuLabel,
  navbarMenuLabelText,
  subMenuLink,
} from './navbar.css';
import { NavbarProps } from './navbar.types';

const Navbar = (
  {
    scrollThreshold = 100,
    fixedThreshold = 150,
    navItems,
    className,
    ...props
  }: NavbarProps,
  ref: ForwardedRef<any>,
) => {
  const params = useParams<{ page: string }>();
  const pathName = usePathname();
  const previousScrollY = useRef(0);
  const [state, setState] = useState<'idle' | 'visible' | 'hidden'>('idle');
  const scrollDown = useRef(true);
  const [activeLinkId, setActiveLinkId] = useState<string | null>(null);

  const currentPage = useCallback(
    (uid: string) => (pathName === '/' ? uid === '' : uid === params.page),
    [pathName, params],
  );

  const onScroll = useCallback(() => {
    scrollDown.current = previousScrollY.current < window.scrollY;

    if (Math.abs(previousScrollY.current - window.scrollY) > scrollThreshold) {
      if (window.scrollY < fixedThreshold) {
        setState('idle');
      } else if (scrollDown.current) {
        setState('hidden');
      } else {
        setState('visible');
      }

      previousScrollY.current = window.scrollY;
    }
  }, [scrollThreshold, fixedThreshold]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    const currentNavItem = navItems.find((item) => currentPage(item.uid));

    if (!currentNavItem || !currentNavItem.subItems) {
      return;
    }

    const observedElements: HTMLElement[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLinkId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -80% 0px',
        threshold: 0,
      },
    );

    for (const item of currentNavItem.subItems) {
      const el = document.getElementById(item[1]);

      if (el) {
        observedElements.push(el);
        observer.observe(el);
      }
    }

    return () => {
      observedElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [navItems, params, pathName, setActiveLinkId, currentPage]);

  return (
    <Box
      use={motion.div}
      ref={ref}
      className={clsx(navbar({ state }), className)}
      animate={
        state === 'idle' || state === 'visible'
          ? { translateY: 0 }
          : { translateY: '-100%' }
      }
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      {...props}
    >
      <Container
        size="2xl"
        display="flex"
        flexDirection={{ xs: 'column', lg: 'row' }}
        alignItems="center"
        justifyContent={{ xs: 'center', lg: 'space-between' }}
        gap={{ xs: 'base', md: 'md', lg: 'lg' }}
      >
        <Link href="/">
          <Image src={kalink} alt="Kalink" className={navbarLogo} />
        </Link>

        <NavigationMenu>
          <NavigationMenuList display="flex" gap="none">
            {navItems.map(({ uid, label, tint, subItems }) => {
              const tintScheme = {
                primary: 'primary',
                secondary: 'secondaryContainer',
              } as const;

              return (
                <NavigationMenuItem key={uid}>
                  <NavigationMenuTrigger>
                    <NavbarButton uid={uid}>
                      <Text
                        typography="headlineSmall"
                        color="onPrimaryContainer"
                        className={navbarLink({
                          active: currentPage(uid),
                          color: tint,
                        })}
                      >
                        {label}
                      </Text>
                    </NavbarButton>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Link href={`/${uid}`}>
                      <Box
                        tintScheme={tintScheme[tint]}
                        borderRadius="small"
                        className={navbarMenuLabel}
                      >
                        <Text
                          typography="headlineMedium"
                          className={navbarMenuLabelText}
                        >
                          {label}
                        </Text>
                      </Box>
                    </Link>
                    <Stack gap="base">
                      {(subItems || []).map(([label, slug]) => {
                        return (
                          <NavigationMenuLink
                            key={slug}
                            href={`/${uid}#${slug}`}
                            className={subMenuLink({
                              active: activeLinkId === slug,
                              color: tint,
                            })}
                          >
                            <Text
                              typography={
                                activeLinkId === slug
                                  ? 'labelLarge'
                                  : 'bodyMedium'
                              }
                              color="onPrimaryContainer"
                              textOverflow="ellipsis"
                            >
                              {label}
                            </Text>
                          </NavigationMenuLink>
                        );
                      })}
                    </Stack>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </Container>
    </Box>
  );
};

const WrappedNavbar = forwardRef(Navbar);

export { WrappedNavbar as Navbar };
