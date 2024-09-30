import { SliceZone } from '@prismicio/react';
import { Metadata } from 'next';

import { Stack } from '@/components/stack';
import { createClient } from '@/prismicio';
import { components } from '@/slices';

import { CommonLayout } from './common-layout';

export async function generateMetadata(): Promise<Metadata> {
  const page = await createClient().getByUID('page', 'homepage');

  return {
    metadataBase: new URL('https://kalink.ch'),
    title: page.data.metaTitle,
    description: page.data.metaDescription,
    openGraph: {
      title: page.data.metaTitle ?? undefined,
      description: page.data.metaDescription ?? undefined,
      url: 'https://kalink.ch/',
      siteName: 'KalinK Studio',
      type: 'website',
      images: [
        {
          url: page.data.metaImage.url ?? '',
          width: page.data.metaImage.dimensions?.width,
          height: page.data.metaImage.dimensions?.height,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.metaTitle ?? undefined,
      description: page.data.metaDescription || undefined,
      images: page.data.metaImage.url ?? undefined,
      creator: '@LouisGollut',
    },
  };
}

export default async function Page() {
  const page = await createClient().getByUID('page', 'homepage');

  return (
    <CommonLayout currentPage={page}>
      <Stack gap={{ xs: '5xl', md: '7xl', lg: '9xl' }}>
        <SliceZone slices={page.data.slices} components={components} />
      </Stack>
    </CommonLayout>
  );
}
