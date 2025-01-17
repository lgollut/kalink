'use client';

import { useSearchParams } from 'next/navigation';

import { Box } from '@/components/box';

export default function Page() {
  const searchParams = useSearchParams();

  console.log(searchParams);

  return <Box>Checkout Page</Box>;
}
