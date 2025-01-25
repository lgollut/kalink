import { PrismicPreview } from '@prismicio/next';
import { Analytics } from '@vercel/analytics/react';
import { clsx } from 'clsx';

import config from '../slicemachine.config.json';
import { Cart } from '@/components/cart';
import { Toaster } from '@/components/toaster/toaster';
import { TranslationLoader } from '@/i18n/translation-loader';
import { fontClass } from '@/styles/font';
import { themeClass } from '@/styles/theme.css';

import { html, body } from './layout.css';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(html, fontClass)}>
      <body className={clsx(body, themeClass)}>
        <TranslationLoader>
          <Cart>
            <Toaster>
              {children}
              <Analytics />
              <PrismicPreview repositoryName={config.repositoryName} />
            </Toaster>
          </Cart>
        </TranslationLoader>
      </body>
    </html>
  );
}
