'use client';

import { Resource, createInstance } from 'i18next';
import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import { initClientTranslations } from './init-client-translations';

type TranslationProvider = {
  children: ReactNode;
  locale: string;
  namespaces: string | string[];
  resources: Resource;
};

export function TranslationProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationProvider) {
  const instance = createInstance();

  useEffect(() => {
    async function init() {
      await initClientTranslations({ locale, resources, namespaces, instance });
    }

    init();
  }, [instance, locale, namespaces, resources]);

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
