import { type Content } from '@prismicio/client';
import { isFilled } from '@prismicio/client';
import { ReactNode } from 'react';

import { CartPanel } from '@/components/cart/cart-panel';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { NavbarItem } from '@/components/navbar/navbar.types';
import { Stack } from '@/components/stack';
import { createClient } from '@/prismicio';
import { SlugItem } from '@/utils/get-slice-slug';
import { slugify } from '@/utils/slugify';

import { pageBackground } from './layout.css';

type PagesLayoutProps = Readonly<{
  children: ReactNode;
}>;

type ConditionalSlugItem = SlugItem & {
  subNavigation?: boolean;
  [key: string]: unknown;
};

type MayBeSlugItem = {
  primary: ConditionalSlugItem & { items?: ConditionalSlugItem[] };
};

function walkNavigationItems(
  items: MayBeSlugItem[] | ConditionalSlugItem[],
  subItems: [string, string][],
) {
  for (const item of items) {
    if (Array.isArray(item)) {
      walkNavigationItems(item, subItems);
      continue;
    }

    let slugItem: MayBeSlugItem['primary'];

    if ('primary' in item) {
      slugItem = item.primary as MayBeSlugItem['primary'];
    } else {
      slugItem = item;
    }

    if ('subNavigation' in slugItem && slugItem.subNavigation) {
      const label = slugItem.subNavigationLabel ?? slugItem.title;

      if (label) {
        subItems.push([label, slugItem.slug || slugify(label)]);
      }
    }

    if (slugItem.items) {
      walkNavigationItems(slugItem.items, subItems);
    }
  }
}

export default async function PagesLayout({ children }: PagesLayoutProps) {
  const client = createClient();

  const mainNavigation = await client.getSingle('mainNavigation');

  const navItemIds: Set<string> = new Set();

  for (const { item } of mainNavigation.data.items) {
    if (!isFilled.contentRelationship(item)) {
      continue;
    }

    navItemIds.add(item.id);
  }

  const allPages = await client.getByIDs<Content.PageDocument>([
    ...navItemIds.values(),
  ]);

  const navItems: NavbarItem[] = [];

  for (const page of allPages.results) {
    if (!page.data.navigationLabel) {
      continue;
    }

    const subItems: [string, string][] = [];

    walkNavigationItems(page.data.slices, subItems);

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
      paddingBlockStart="9xl"
      className={pageBackground({ tint: 'primary' })}
    >
      <Navbar
        navItems={navItems}
        className={pageBackground({ tint: 'primary' })}
      />
      {children}
      <Footer tintScheme={'primary'} />
      <CartPanel />
    </Stack>
  );
}
