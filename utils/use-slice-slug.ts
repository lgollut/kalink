import { PageDocument } from '@/prismicio-types';

import { slugify } from './slugify';

export const useSliceSlug = <
  TSlice extends PageDocument['data']['slices'][number],
>(
  slice: TSlice,
) => {
  if (slice.primary.slug) {
    return slice.primary.slug;
  }

  if (slice.primary.subNavigationLabel) {
    return slugify(slice.primary.subNavigationLabel);
  }

  if (slice.primary.title) {
    return slugify(slice.primary.title);
  }

  return null;
};
