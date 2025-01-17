import { createInstance, i18n, InitOptions, Resource } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { i18nConfig } from './settings';

export default async function initTranslations(
  locale?: string,
  namespaces?: string | string[],
  i18nInstance?: i18n,
  resources?: Resource,
) {
  const instance = i18nInstance || createInstance();

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
    i18n: instance,
    resources: instance.services.resourceStore.data,
  };
}
