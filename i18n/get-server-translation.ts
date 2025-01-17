import initTranslations from './init-translations';
import { UseTranslationOptions, i18nConfig } from './settings';

export async function getServerTranslation(
  locale: string = i18nConfig.defaultLocale,
  namespaces: string | string[] = i18nConfig.namespaces,
  options: UseTranslationOptions = {},
) {
  const { i18n } = await initTranslations(locale, namespaces);

  return {
    t: i18n.getFixedT(
      locale,
      Array.isArray(namespaces) ? namespaces[0] : namespaces,
      options.keyPrefix,
    ),
  };
}
