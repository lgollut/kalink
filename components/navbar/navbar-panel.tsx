import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Box } from '../box';
import { Button, ButtonLink } from '../button';
import { Image } from '../image';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '../sheet';
import { Stack } from '../stack';
import kalink from '@/public/kalink.svg';

import { navbarLogo } from './navbar.css';
import { NavbarItem } from './navbar.types';

type NavbarPanelProps = {
  navItems: NavbarItem[];
  currentPage: (uid: string) => boolean;
};

export function NavbarPanel({ navItems, currentPage }: NavbarPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          display={{ xs: 'block', md: 'none' }}
          position="absolute"
          insetInlineStart="base"
          variant="ghost"
          icon={Menu}
          tintScheme="none"
          iconOnly
        >
          {'Ouvrir le Menu'}
        </Button>
      </SheetTrigger>

      <SheetContent
        color="surface"
        paddingInline="base"
        paddingBlock="md"
        size="lg"
        side="left"
      >
        <VisuallyHidden>
          <SheetTitle>{'Navigation'}</SheetTitle>
          <SheetDescription>{'Menu de navigation'}</SheetDescription>
        </VisuallyHidden>
        <Stack gap="3xl">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingBlock="sm"
          >
            <SheetClose asChild>
              <Button
                position="absolute"
                insetInlineStart={'none'}
                icon={X}
                variant="ghost"
                flexShrink={0}
                iconOnly
              >
                Close
              </Button>
            </SheetClose>
            <Link href="/">
              <Image src={kalink} alt="Kalink" className={navbarLogo} />
            </Link>
          </Box>

          <Stack use="ul" gap="base" paddingInlineStart="none">
            {navItems.map(({ uid, label, tint }) => {
              const tintScheme = {
                primary: 'primary',
                secondary: 'secondaryContainer',
              } as const;

              return (
                <li key={uid}>
                  <ButtonLink
                    href={`/${uid}`}
                    {...(currentPage(uid)
                      ? {
                          tintScheme: tintScheme[tint],
                        }
                      : {
                          tintScheme: 'surface',
                        })}
                    typography={'headlineSmall'}
                    textTransform="unset"
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </ButtonLink>
                </li>
              );
            })}
          </Stack>
        </Stack>
      </SheetContent>
    </Sheet>
  );
}
