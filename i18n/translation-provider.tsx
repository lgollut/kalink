'use client';

import { Resource, createInstance } from 'i18next';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import initTranslations from './init-translations';

type TranslationProvider = {
  children: ReactNode;
  locale: string;
  namespaces: string | string[];
  resources?: Resource;
};

export function TranslationProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationProvider) {
  const i18n = createInstance();
  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
