import { ReactNode, Suspense } from 'react';

import { initServerTranslations } from './init-server-translations';
import { i18nConfig } from './settings';
import { TranslationProvider } from './translation-provider';

type TranslationLoader = {
  children: ReactNode;
};

export async function TranslationLoader({ children }: TranslationLoader) {
  'use cache';

  const { resources } = await initServerTranslations({
    locale: i18nConfig.defaultLocale,
    namespaces: i18nConfig.namespaces,
  });

  return (
    <Suspense fallback={'Loading translations...'}>
      <TranslationProvider
        locale={i18nConfig.defaultLocale}
        resources={resources}
        namespaces={i18nConfig.namespaces}
      >
        {children}
      </TranslationProvider>
    </Suspense>
  );
}
