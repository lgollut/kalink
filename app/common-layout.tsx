import { type Content } from '@prismicio/client';
import { isFilled } from '@prismicio/client';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ReactNode } from 'react';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { NavbarItem } from '@/components/navbar/navbar.types';
import { Stack } from '@/components/stack';
import { createClient } from '@/prismicio';
import { vars } from '@/styles/contract.css';
import { slugify } from '@/utils/slugify';

import { backgroundColor, pageBackground } from './common-layout.css';

type CommonLayoutProps = {
  children: ReactNode;
  currentPage: Content.PageDocument;
};

export const CommonLayout = async ({
  children,
  currentPage,
}: CommonLayoutProps) => {
  const client = createClient();

  const mainNavigation = await client.getSingle('mainNavigation');
  const navItemIds: Set<string> = new Set();

  const pageBackgroundColor = {
    primary: vars.ref.color.primary99,
    secondary: vars.ref.color.secondary99,
  } as const;

  for (const { item } of mainNavigation.data.items) {
    if (!isFilled.contentRelationship(item)) {
      continue;
    }

    navItemIds.add(item.id);
  }

  const pages = await client.getByIDs<Content.PageDocument>([
    ...navItemIds.values(),
  ]);

  const navItems: NavbarItem[] = [];

  for (const page of pages.results) {
    if (!page.data.navigationLabel) {
      continue;
    }

    const subItems: [string, string][] = [];

    for (const item of page.data.slices) {
      const label = item.primary.subNavigationLabel ?? item.primary.title;

      if (!item.primary.subNavigation || !label) {
        continue;
      }

      const slug = item.primary.slug || slugify(label);

      subItems.push([label, slug]);
    }

    navItems.push({
      uid: page.uid === 'homepage' ? '' : page.uid,
      label: page.data.navigationLabel,
      tint: page.data.tint,
      subItems,
    });
  }

  return (
    <Stack
      gap={{ xs: '5xl', md: '7xl', lg: '9xl' }}
      marginBlockStart={{ xs: '5xl', md: '7xl', lg: '9xl' }}
      className={pageBackground}
      style={assignInlineVars({
        [backgroundColor]: pageBackgroundColor[currentPage.data.tint],
      })}
    >
      <Navbar
        navItems={navItems}
        style={assignInlineVars({
          [backgroundColor]: pageBackgroundColor[currentPage.data.tint],
        })}
      />
      {children}
      <Footer tintScheme={currentPage.data.tint} />
    </Stack>
  );
};
