'use server';

import { createInstance, InitOptions, Resource } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { i18nConfig } from './settings';

type ServerTranslationOptions = {
  locale: string;
  resources?: Resource;
  namespaces?: string | string[];
};

export async function initServerTranslations({
  locale,
  namespaces,
  resources,
}: ServerTranslationOptions) {
  const instance = createInstance();

  instance.use(initReactI18next);

  const options: InitOptions = {
    lng: locale,
    supportedLngs: i18nConfig.locales,
    fallbackLng: i18nConfig.defaultLocale,
  };

  if (resources) {
    options.resources = resources;
    options.preload = [];
  } else {
    instance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/i18n/locales/${language}/${namespace}.json`),
      ),
    );
    options.preload = i18nConfig.locales;
  }

  if (namespaces) {
    options.ns = Array.isArray(namespaces) ? namespaces : [namespaces];
  }

  await instance.init(options);

  return {
    instance,
    resources: instance.services.resourceStore.data,
  };
}
