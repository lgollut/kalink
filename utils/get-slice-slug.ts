import { KeyTextField } from '@prismicio/client';

import { slugify } from './slugify';

export type SlugItem = {
  slug?: KeyTextField;
  subNavigationLabel?: KeyTextField;
  title?: KeyTextField;
  subNavigation?: boolean;
};

export const getSliceSlug = (item: SlugItem) => {
  if (!item.subNavigation) {
    return null;
  }

  if (item.slug) {
    return item.slug;
  }

  if (item.subNavigationLabel) {
    return slugify(item.subNavigationLabel);
  }

  if (item.title) {
    return slugify(item.title);
  }

  return null;
};
