import { SliceLike } from '@prismicio/react';

import { HeadingProps, HeadingTypes } from '../heading/heading.types';

export type SectionHeadingProps<
  TUse extends HeadingTypes,
  TSlice extends SliceLike,
> = HeadingProps<TUse> & {
  slice: TSlice;
};
