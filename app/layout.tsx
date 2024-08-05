import { PrismicPreview } from '@prismicio/next';
import { clsx } from 'clsx';

import { Toaster } from '@/components/toaster/toaster';
import { repositoryName } from '@/prismicio';
import { fontClass } from '@/styles/font';
import { themeClass } from '@/styles/theme.css';

import { html, body } from './layout.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(html, fontClass)}>
      <body className={clsx(body, themeClass)}>
        <Toaster>
          {children}
          <PrismicPreview repositoryName={repositoryName} />
        </Toaster>
      </body>
    </html>
  );
}
