import { initServerTranslations } from './init-server-translations';
import { UseTranslationOptions, i18nConfig } from './settings';

export async function getServerTranslation(
  locale: string = i18nConfig.defaultLocale,
  namespaces: string | string[] = i18nConfig.namespaces,
  options: UseTranslationOptions = {},
) {
  const { instance } = await initServerTranslations({ locale, namespaces });

  return {
    t: instance.getFixedT(
      locale,
      Array.isArray(namespaces) ? namespaces[0] : namespaces,
      options.keyPrefix,
    ),
  };
}
