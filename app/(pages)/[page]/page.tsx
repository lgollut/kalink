import * as prismic from '@prismicio/client';
import { SliceZone } from '@prismicio/react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllByType, getByUID } from '@/app/_services/prismic';
import { Stack } from '@/components/stack';
import { PageDocument } from '@/prismicio-types';
import { components } from '@/slices';

type PageProps = Readonly<{ params: Promise<{ page: string }> }>;

export async function generateStaticParams() {
  const pages = await getAllByType<PageDocument>('page', {
    filters: [prismic.filter.not('my.page.uid', 'shop')],
  });

  return pages.map((page) => ({
    page: page.uid,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  let page: PageDocument;

  try {
    page = await getByUID('page', params.page);
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
      url: `https://www.kalink.ch/${params.page}`,
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

export default async function Page(props: PageProps) {
  const params = await props.params;
  let page: PageDocument;

  try {
    page = await getByUID('page', params.page);
  } catch (error) {
    notFound();
  }

  return (
    <Stack gap={{ xs: '5xl', md: '7xl', lg: '9xl' }}>
      <SliceZone slices={page.data.slices} components={components} />
    </Stack>
  );
}
