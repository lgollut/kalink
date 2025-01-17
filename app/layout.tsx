import { PrismicPreview } from '@prismicio/next';
import { Analytics } from '@vercel/analytics/react';
import { clsx } from 'clsx';

import { Cart } from '@/components/cart';
import { Toaster } from '@/components/toaster/toaster';
import initTranslations from '@/i18n/init-translations';
import { i18nConfig } from '@/i18n/settings';
import { TranslationProvider } from '@/i18n/translation-provider';
import { repositoryName } from '@/prismicio';
import { fontClass } from '@/styles/font';
import { themeClass } from '@/styles/theme.css';

import { html, body } from './layout.css';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { resources } = await initTranslations(
    i18nConfig.defaultLocale,
    i18nConfig.namespaces,
  );

  return (
    <html lang="en" className={clsx(html, fontClass)}>
      <body className={clsx(body, themeClass)}>
        <TranslationProvider
          locale={i18nConfig.defaultLocale}
          resources={resources}
          namespaces={i18nConfig.namespaces}
        >
          <Cart>
            <Toaster>
              {children}
              <Analytics />
              <PrismicPreview repositoryName={repositoryName} />
            </Toaster>
          </Cart>
        </TranslationProvider>
      </body>
    </html>
  );
}
