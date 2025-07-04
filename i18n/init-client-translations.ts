import { i18n, InitOptions, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { i18nConfig } from './settings';

type ClientTranslationOptions = {
  locale: string;
  resources: Resource;
  namespaces?: string | string[];
  instance: i18n;
};

export async function initClientTranslations({
  locale,
  namespaces,
  instance,
  resources,
}: ClientTranslationOptions) {
  instance.use(initReactI18next);

  const options: InitOptions = {
    lng: locale,
    supportedLngs: i18nConfig.locales,
    fallbackLng: i18nConfig.defaultLocale,
    resources: resources,
    preload: [],
  };

  if (namespaces) {
    options.ns = Array.isArray(namespaces) ? namespaces : [namespaces];
  }

  await instance.init(options);
}
