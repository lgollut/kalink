import { PrismicPreview } from '@prismicio/next';
import { Analytics } from '@vercel/analytics/react';
import { clsx } from 'clsx';
import { type Metadata } from 'next';

import { Toaster } from '@/components/toaster/toaster';
import { repositoryName } from '@/prismicio';
import { fontClass } from '@/styles/font';
import { themeClass } from '@/styles/theme.css';

import { html, body } from './layout.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kalink.ch'),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={clsx(html, fontClass)}
    >
      <body className={clsx(body, themeClass)}>
        <Toaster>
          {children}
          <Analytics />
          <PrismicPreview repositoryName={repositoryName} />
        </Toaster>
      </body>
    </html>
  );
}
