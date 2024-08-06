'use client';

import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Box } from '../box';
import { Button } from '../button';
import { Container } from '../container';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../sheet';
import { Stack } from '../stack';
import { Text } from '../text';
import kalink from '@/public/kalink.svg';
import { slugify } from '@/utils/slugify';

import { navbar, navbarLink, navbarLogo, navbarMenuMobile } from './navbar.css';
import { NavbarProps } from './navbar.types';

const Navbar = (
  { scrollThreshold = 100, fixedThreshold = 150, navItems }: NavbarProps,
  ref: ForwardedRef<any>,
) => {
  const previousScrollY = useRef(0);
  const [state, setState] = useState<'idle' | 'visible' | 'hidden'>('idle');
  const [activeLinkId, setActiveLinkId] = useState<string | null>(null);
  const scrollDown = useRef(true);
  const [isOpen, setIsOpen] = useState(false);

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
        threshold: 0.5,
      },
    );

    for (const item of navItems) {
      const id = slugify(item);
      const el = document.getElementById(id);

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
  }, [navItems, activeLinkId]);

  return (
    <motion.div
      ref={ref}
      className={navbar({ state })}
      animate={
        state === 'idle' || state === 'visible'
          ? { translateY: 0 }
          : { translateY: '-100%' }
      }
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
    >
      <Container
        size="2xl"
        display="flex"
        flexDirection={{ xs: 'column', lg: 'row' }}
        alignItems="center"
        justifyContent={{ xs: 'center', lg: 'space-between' }}
        gap="lg"
      >
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              className={navbarMenuMobile}
              iconOnly
              tintScheme="primaryContainer"
              icon={Menu}
              size="md"
            >
              Open menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left" padding="lg">
            <SheetHeader>
              <SheetTitle>
                <Image src={kalink} alt="Kalink" className={navbarLogo} />
              </SheetTitle>
            </SheetHeader>
            <Stack gap="base">
              {navItems.map((item) => {
                const id = slugify(item);

                return (
                  <Link
                    key={id}
                    href={`#${id}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Text
                      typography="headlineSmall"
                      color="onPrimaryContainer"
                      className={navbarLink({ active: activeLinkId === id })}
                    >
                      {item}
                    </Text>
                  </Link>
                );
              })}
            </Stack>
          </SheetContent>
        </Sheet>
        <Image src={kalink} alt="Kalink" className={navbarLogo} />
        <Box use="nav" display={{ xs: 'none', md: 'flex' }} gap="5xl">
          {navItems.map((item) => {
            const id = slugify(item);

            return (
              <Link key={id} href={`#${id}`}>
                <Text
                  typography="headlineSmall"
                  color="onPrimaryContainer"
                  className={navbarLink({ active: activeLinkId === id })}
                >
                  {item}
                </Text>
              </Link>
            );
          })}
        </Box>
      </Container>
    </motion.div>
  );
};

const WrappedNavbar = forwardRef(Navbar);

export { WrappedNavbar as Navbar };
