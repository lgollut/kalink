import { SliceZone } from '@prismicio/react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getByUID } from '@/app/_services/prismic';
import { Stack } from '@/components/stack';
import { PageDocument } from '@/prismicio-types';
import { components } from '@/slices';

const pageName = 'shop';

export async function generateMetadata(): Promise<Metadata> {
  let page: PageDocument;

  try {
    page = await getByUID('page', 'shop');
  } catch (error) {
    notFound();
  }

  return {
    metadataBase: new URL('https://www.kalink.ch'),
    title: page.data.metaTitle,
    description: page.data.metaDescription,
    openGraph: {
      title: page.data.metaTitle ?? undefined,
      description: page.data.metaDescription ?? undefined,
      url: `https://www.kalink.ch/${pageName}`,
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

export default async function Page() {
  let page: PageDocument;

  try {
    page = await getByUID('page', pageName);
  } catch (error) {
    notFound();
  }

  return (
    <Stack gap={{ xs: '5xl', md: '7xl', lg: '9xl' }}>
      <SliceZone slices={page.data.slices} components={components} />
    </Stack>
  );
}
