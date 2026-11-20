import { CommonLayout } from '../common-layout';
import { createClient } from '@/prismicio';

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[page]'>) {
  const client = createClient();

  const { page: uid } = await params;
  const currentPage = await client.getByUID('page', uid);

  return <CommonLayout currentPage={currentPage}>{children}</CommonLayout>;
}
