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
    metadataBase: new URL('https://kalink.ch'),
    title: homepage.data.metaTitle,
    description: homepage.data.metaDescription,
    openGraph: {
      title: homepage.data.metaTitle ?? undefined,
      description: homepage.data.metaDescription ?? undefined,
      url: 'https://kalink.ch',
      siteName: 'KalinK Studio',
      type: 'website',
      images: [
        {
          url: homepage.data.metaImage.url ?? '',
          width: homepage.data.metaImage.dimensions?.width,
          height: homepage.data.metaImage.dimensions?.height,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: homepage.data.metaTitle ?? undefined,
      description: homepage.data.metaDescription || undefined,
      images: homepage.data.metaImage.url ?? undefined,
      creator: '@LouisGollut',
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
      !item.primary.scrollSpy
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
