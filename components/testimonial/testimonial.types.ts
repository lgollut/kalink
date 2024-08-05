import { ElementType } from 'react';

import { BoxProps } from '../box/box.types';
import { TestimonialDocument } from '@/prismicio-types';

type OmittedBoxProps =
  | 'display'
  | 'flexDirection'
  | 'gap'
  | 'alignItems'
  | 'padding'
  | 'borderRadius';

export type TestimonialProps<TUse extends ElementType> = BoxProps<
  TUse,
  OmittedBoxProps
> &
  TestimonialDocument['data'];
