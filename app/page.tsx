import { Metadata } from 'next';
import Image from 'next/image';

import { Box } from '@/components/box';
import { Text } from '@/components/text';
import { createClient } from '@/prismicio';
import kalink from '@/public/kalink.svg';

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

export default function Home() {
  return (
    <Box
      use="main"
      height="full"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="base"
      flexGrow={1}
    >
      <Image src={kalink} alt="Kalink" width={500} />
      <Text typography="titleMedium">Coming soon</Text>
    </Box>
  );
}
