import { SliceZone } from '@prismicio/react';
import { Metadata } from 'next';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Stack } from '@/components/stack';
import { createClient } from '@/prismicio';
import { components } from '@/slices';

import { pageContent } from './page.css';

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const homepage = await client.getSingle('homepage');

  return {
    title: homepage.data.meta_title,
    description: homepage.data.meta_description,
    openGraph: {
      title: homepage.data.meta_title || '',
      images: [
        {
          url: homepage.data.meta_image.url || '',
        },
      ],
    },
  };
}

export default async function Home() {
  const client = createClient();

  const page = await client.getSingle('homepage');

  const navItems: string[] = [];

  for (const item of page.data.slices) {
    if (
      !('scrollSpy' in item.primary) ||
      !('title' in item.primary) ||
      !item.primary.title ||
      item.primary.scrollSpy === 'false'
    ) {
      continue;
    }

    navItems.push(item.primary.title);
  }

  return (
    <Stack gap={{ xs: '5xl', md: '7xl', lg: '9xl' }}>
      <Navbar navItems={navItems} />
      <Stack gap={{ xs: '5xl', md: '7xl', lg: '9xl' }} className={pageContent}>
        <SliceZone slices={page.data.slices} components={components} />
      </Stack>
      <Footer />
    </Stack>
  );
}
