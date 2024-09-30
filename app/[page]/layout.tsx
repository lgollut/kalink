import { CommonLayout } from '../common-layout';
import { createClient } from '@/prismicio';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { page: string };
}>) {
  const client = createClient();

  const currentPage = await client.getByUID('page', params.page);

  return <CommonLayout currentPage={currentPage}>{children}</CommonLayout>;
}
