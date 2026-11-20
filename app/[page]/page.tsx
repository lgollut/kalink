import * as prismic from '@prismicio/client';
import { SliceZone } from '@prismicio/react';
import { Metadata } from 'next';

import { Stack } from '@/components/stack';
import { createClient } from '@/prismicio';
import { components } from '@/slices';

export async function generateStaticParams() {
  const pages = await createClient().getAllByType('page', {
    filters: [prismic.filter.not('my.page.uid', 'homepage')],
  });

  return pages.map((page) => ({
    page: page.uid,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[page]'>): Promise<Metadata> {
  const { page: uid } = await params;
  const page = await createClient().getByUID('page', uid);

  return {
    title: page.data.metaTitle,
    description: page.data.metaDescription,
    openGraph: {
      title: page.data.metaTitle ?? undefined,
      description: page.data.metaDescription ?? undefined,
      url: `https://www.kalink.ch/${uid}`,
      siteName: 'KalinK Studio',
      type: 'website',
      ...(page.data.metaImage.url && {
        images: [
          {
            url: page.data.metaImage.url,
            width: page.data.metaImage.dimensions.width,
            height: page.data.metaImage.dimensions.height,
          },
        ],
      }),
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

export default async function Page({ params }: PageProps<'/[page]'>) {
  const { page: uid } = await params;
  const page = await createClient().getByUID('page', uid);

  return (
    <Stack gap={{ xs: '5xl', md: '7xl', lg: '9xl' }}>
      <SliceZone slices={page.data.slices} components={components} />
    </Stack>
  );
}
